<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
                'id' => $this->id,
                'statut' => $this->status,
                'total' => $this->total_amount,
                'frais_livraison' => $this->delivery_fee,
                'adresse_livraison' => $this->delivery_address,
                'date' => $this->created_at->format('d/m/Y H:i'), // Date lisible pour React !

                // On récupère juste le nom de la pharmacie
                'pharmacie' => $this->pharmacy->name,

                // On liste les articles achetés proprement
                'articles' => $this->items->map(function($item) {
                    return [
                        'medicament' => $item->medicament->name,
                        'quantite' => $item->quantity,
                        'prix_unitaire' => $item->unit_price,
                        'sous_total' => $item->quantity * $item->unit_price
                    ];
                }),

                'client' => [
                    'nom' => $this->user->name,
                    'telephone' => $this->user->phone,
                ],

                // Infos de paiement simplifiées
                'paiement' => [
                    'methode' => $this->payment->method ?? 'N/A',
                    'statut' => $this->payment->status ?? 'pending'
                ]


            ];
    }
}
