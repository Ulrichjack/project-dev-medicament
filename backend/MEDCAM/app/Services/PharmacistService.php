<?php

namespace App\Services;

use App\Models\Order;

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
}
