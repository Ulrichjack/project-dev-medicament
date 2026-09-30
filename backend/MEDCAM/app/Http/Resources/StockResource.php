<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'medicament_name' => $this->medicament->name,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'min_stock_alert' => $this->min_stock_alert,
            'is_available' => (bool) $this->is_available,
        ];
    }
}
