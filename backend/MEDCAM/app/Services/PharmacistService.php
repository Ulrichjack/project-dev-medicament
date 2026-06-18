<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\Order;
use App\Models\Pharmacy;
use App\Models\PharmacyStock;
use App\Models\User;
use Exception;

class PharmacistService
{
    /**
     * Récupère les commandes pour UNE pharmacie spécifique
     */
    public function getPharmacyOrders(int $pharmacyId)
    {
        return Order::where('pharmacy_id', $pharmacyId)
                    ->with('user:id,name,phone') // On charge juste les infos utiles du client
                    ->whereIn('status', ['confirmed', 'preparing', 'ready']) // On cache les commandes non payées
                    ->orderBy('created_at', 'desc')
                    ->paginate(15);
    }


    public function addMedicamentToStock(array $data, User $pharmacist)
    {
        $pharmacy = $pharmacist->pharmacy; // Récupère la pharmacie associée au pharmacien

         if (!$pharmacy) {
            throw new Exception("Cet utilisateur n'est pas lié à une pharmacie.");
        }
        $data = PharmacyStock::create([
            'pharmacy_id' => $pharmacy->id,
            'medicament_id' => $data['medicament_id'],
            'quantity' => $data['quantity'],
            'price' => $data['price'],
        ]);

        return $data;

    }

    public function updateStockItem(int $stockId, array $data, User $pharmacist){
        $pharmacy = $pharmacist->pharmacy; // Récupère la pharmacie associée au pharmacien

        if (!$pharmacy) {
            throw new Exception("Cet utilisateur n'est pas lié à une pharmacie.");
        }

        $stockItem = PharmacyStock::where('id', $stockId)
                                    ->where('pharmacy_id', $pharmacy->id)
                                    ->firstOrFail();

        $stockItem->update($data);
        return $stockItem;
    }

    public function updateOrderStatus(int $orderId, string $newStatus, User $pharmacist)
    {
        $pharmacy = $pharmacist->pharmacy;
        if (!$pharmacy) {
            throw new Exception("Cet utilisateur n'est pas lié à une pharmacie.");
        }
        $order = Order::where('id',$orderId)
                        ->where('pharmacy_id', $pharmacy->id)
                        ->firstOrFail();
        $order->update(['status' => $newStatus]);

        Notification::create([
            'user_id'=>$order->user_id,
            'type'=>'order_status',
            'message'=>"Votre commande n°{$order->id} est maintenant {$newStatus}.",
        ]);

        return $order;
    }


}
