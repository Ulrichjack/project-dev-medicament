<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Exception;

class PaymentService
{
    public function simulatePayment(int $orderId, $user)
    {
        $order = Order::with('payment')->where('user_id', $user->id)->findOrFail($orderId);

        if ($order->status !== 'pending') {
            throw new Exception("Cette commande ne peut plus être payée.");
        }

        return DB::transaction(function () use ($order) {
            // 1. On met le paiement à "paid" avec un faux numéro de transaction
            $order->payment->update([
                'status' => 'paid',
                'transaction_id' => 'SIMULATION_' . uniqid()
            ]);

            // 2. On confirme la commande
            $order->update(['status' => 'confirmed']);

            return $order->load('payment');
        });
    }
}
