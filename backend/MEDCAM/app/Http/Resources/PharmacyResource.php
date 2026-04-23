<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PharmacyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->name,
            'adresse'=> $this->address,
            'email' => $this->email,
            'telephone' => $this->phone,
            'gps' => [
                'lng' => $this->longitude,
                'lat' => $this->latitude,
            ],
            'est_ouverte' => (bool) $this->is_open,
            'note' => $this->rating,

            // On crée un tableau de produits proprement
            'produits' => $this->whenLoaded('stocks', function() {
                return $this->stocks->map(function($stock) {
                    return [
                        'stock_id' => $stock->id,
                        'nom' => $stock->medicament->name,
                        'prix' => $stock->price,
                        'quantite' => $stock->quantity,
                        'disponible' => $stock->is_available
                    ];
                });
            }),
        ];
    }
}
