<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicamentResource extends JsonResource
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
            'nom' => $this->name,
            'substance' => $this->active_substance,
            'description' => $this->description,
            // On renvoie le nom de la catégorie, ou "Générique" si c'est vide
            'categorie' => $this->category->name ?? 'Générique',
            'prix_moyen' => $this->stocks->avg('price'),
            'ordonnance' => $this->prescription_required,
            'image' => $this->photo_url,
        ];
    }
}
