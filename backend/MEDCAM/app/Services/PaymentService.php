<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Exception;

class PaymentService
{
       // Ajoute $method dans les paramètres
    public function simulatePayment(int $orderId, $user, $method = null)
    {
        $order = Order::with('payment')->where('user_id', $user->id)->findOrFail($orderId);

        if ($order->status !== 'pending') {
            throw new Exception("Cette commande ne peut plus être payée.");
        }

        return DB::transaction(function () use ($order, $method) {
            // On met à jour le statut ET la méthode !
            $order->payment->update([
                'status' => 'paid',
                'method' => $method ?? $order->payment->method, // <-- C'EST ÇA QUI MANQUAIT !
                'transaction_id' => 'SIMULATION_' . uniqid()
            ]);

            $order->update(['status' => 'confirmed']);

            return $order->load('payment');
        });
    }
}
