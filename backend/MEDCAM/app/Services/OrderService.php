<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Delivery;
use App\Models\PharmacyStock;
use Illuminate\Support\Facades\DB;
use Exception;

class OrderService
{
    /**
     * Crée une nouvelle commande avec ses items, son paiement et sa livraison.
     */
    public function createOrder(array $data, $user)
    {
        // DB::transaction est OBLIGATOIRE en e-commerce.
        // Si une seule étape échoue (ex: pas de stock), Laravel annule TOUT.
        return DB::transaction(function () use ($data, $user) {

            $totalAmount = 0;
            $deliveryFee = 1000; // On fixe la livraison à 1000 FCFA pour l'instant

            // 1. VÉRIFICATION DES STOCKS ET CALCUL DU PRIX
            foreach ($data['items'] as $item) {
                $stock = PharmacyStock::where('pharmacy_id', $data['pharmacy_id'])
                                      ->where('medicament_id', $item['medicament_id'])
                                      ->first();

                if (!$stock || $stock->quantity < $item['quantity']) {
                    throw new Exception("Stock insuffisant pour le médicament ID: " . $item['medicament_id']);
                }

                // On calcule le total : (prix * quantité)
                $totalAmount += ($stock->price * $item['quantity']);
            }

            // 2. CRÉATION DE LA COMMANDE GLOBALE
            $order = Order::create([
                'user_id' => $user->id,
                'pharmacy_id' => $data['pharmacy_id'],
                'total_amount' => $totalAmount + $deliveryFee,
                'delivery_fee' => $deliveryFee,
                'status' => 'pending',
                'delivery_address' => $data['delivery_address'],
                'delivery_latitude' => $data['delivery_latitude'] ?? null,
                'delivery_longitude' => $data['delivery_longitude'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);

            // 3. CRÉATION DES ITEMS ET DÉDUCTION DU STOCK
            foreach ($data['items'] as $item) {
                $stock = PharmacyStock::where('pharmacy_id', $data['pharmacy_id'])
                                      ->where('medicament_id', $item['medicament_id'])
                                      ->first();

                // Créer la ligne de commande
                OrderItem::create([
                    'order_id' => $order->id,
                    'medicament_id' => $item['medicament_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $stock->price,
                ]);

                // Déduire le stock de la pharmacie
                $stock->decrement('quantity', $item['quantity']);
            }

            // 4. CRÉATION DU PAIEMENT (En attente)
            Payment::create([
                'order_id' => $order->id,
                'amount' => $order->total_amount,
                'method' => $data['payment_method'] ?? 'mtn_mobile_money',
                'status' => 'pending',
            ]);

            // 5. CRÉATION DE LA LIVRAISON (En attente)
            Delivery::create([
                'order_id' => $order->id,
                'status' => 'pending',
            ]);

            // On retourne la commande avec toutes ses relations chargées pour le frontend
            return $order->load('items.medicament', 'payment', 'delivery', 'pharmacy');
        });
    }


    /**
     * Récupère toutes les commandes d'un utilisateur
     */
    public function getUserOrders($user)
    {
        return Order::where('user_id', $user->id)
                    ->with('pharmacy') // On charge juste le nom de la pharmacie pour la liste
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);
    }

    /**
     * Récupère les détails d'une commande spécifique
     */
    public function getOrderById(int $id, $user)
    {
        $order = Order::with('items.medicament', 'payment', 'delivery', 'pharmacy')
                      ->where('user_id', $user->id)
                      ->findOrFail($id);
        return $order;
    }

    /**
     * Annule une commande (si elle est encore en attente)
     */
    public function cancelOrder(int $id, $user)
    {
        $order = $this->getOrderById($id, $user);

        if ($order->status !== 'pending') {
            throw new Exception("Impossible d'annuler une commande déjà en cours de traitement.");
        }

        return DB::transaction(function () use ($order) {
            // 1. Remettre les stocks dans la pharmacie
            foreach ($order->items as $item) {
                PharmacyStock::where('pharmacy_id', $order->pharmacy_id)
                             ->where('medicament_id', $item->medicament_id)
                             ->increment('quantity', $item->quantity);
            }

            // 2. Changer le statut de la commande
            $order->update(['status' => 'cancelled']);

            // 3. Annuler le paiement et la livraison
            if ($order->payment) $order->payment->update(['status' => 'cancelled']);
            if ($order->delivery) $order->delivery->update(['status' => 'cancelled']);

            return $order;
        });
    }





}
