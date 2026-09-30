<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Delivery;
use App\Models\User;
use App\Models\PharmacyStock;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // 1. On récupère un client et une pharmacie qui a du stock
        $client = User::where('role', 'client')->first();
        $stock = PharmacyStock::with('pharmacy')->first();

        if (!$client || !$stock) return;

        // 2. On crée la commande
        $order = Order::create([
            'user_id' => $client->id,
            'pharmacy_id' => $stock->pharmacy_id,
            'total_amount' => $stock->price + 1000, // Prix + 1000 livraison
            'delivery_fee' => 1000,
            'status' => 'confirmed', // Déjà payée
            'delivery_address' => 'Bastos, Yaoundé',
            'notes' => 'Appelez à l\'arrivée'
        ]);

        // 3. On crée l'item (le médicament acheté)
        OrderItem::create([
            'order_id' => $order->id,
            'medicament_id' => $stock->medicament_id,
            'quantity' => 1,
            'unit_price' => $stock->price
        ]);

        // 4. On crée le paiement
        Payment::create([
            'order_id' => $order->id,
            'amount' => $order->total_amount,
            'method' => 'mtn_mobile_money',
            'status' => 'paid',
            'transaction_id' => 'SEED_TX_' . rand(1000, 9999)
        ]);

        // 5. On crée la livraison
        Delivery::create([
            'order_id' => $order->id,
            'status' => 'pending'
        ]);
    }
}
