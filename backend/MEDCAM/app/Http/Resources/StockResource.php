<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'medicament' => $this->medicament->name,
            'quantite' => $this->quantity,
            'prix' => $this->price,
            'alerte_stock' => $this->min_stock_alert,
            'disponible' => $this->is_available,
        ];
    }
}
