<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'total_amount' => $this->total_amount,
            'delivery_fee' => $this->delivery_fee,
            'delivery_address' => $this->delivery_address,
            'created_at' => $this->created_at->format('d/m/Y H:i'),
            'pharmacy_name' => $this->pharmacy->name ?? 'N/A',
            'items' => $this->items->map(function($item) {
                return [
                    'medicament_name' => $item->medicament->name,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'sub_total' => $item->quantity * $item->unit_price
                ];
            }),
            'client' => [
                'name' => $this->user->name,
                'phone' => $this->user->phone,
            ],
            'payment' => [
                'method' => $this->payment->method ?? 'N/A',
                'status' => $this->payment->status ?? 'pending'
            ]
        ];
    }
}
