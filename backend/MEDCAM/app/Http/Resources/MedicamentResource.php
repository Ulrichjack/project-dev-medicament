<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicamentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'active_substance' => $this->active_substance,
            'description' => $this->description,
            'category_name' => $this->category->name ?? 'Generic',
            'price_min' => $this->stocks->min('price') ?? 0,
            'prescription_required' => (bool) $this->prescription_required,
            'photo_url' => $this->photo_url,
        ];
    }
}
