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
            'name' => $this->name,
            'address'=> $this->address,
            'email' => $this->email,
            'phone' => $this->phone,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'is_open' => (bool) $this->is_open,
            'rating' => $this->rating,
            // Liste des produits si la relation est chargée
            'products' => $this->whenLoaded('stocks', function() {
                return $this->stocks->map(function($stock) {
                    return [
                        'stock_id' => $stock->id,
                        'name' => $stock->medicament->name,
                        'price' => $stock->price,
                        'quantity' => $stock->quantity,
                        'is_available' => $stock->is_available
                    ];
                });
            }),
        ];
    }
}
