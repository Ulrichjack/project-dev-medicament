<?php

namespace App\Services;

use App\Models\Medicament;
use Illuminate\Support\Facades\DB;

class MedicamentService
{
    public function search(string $query, array $filters =[]){

        $requete = Medicament::query()
            ->with('category')
            ->where(function($q) use ($query) {
                $q->where('name', 'ILIKE', '%' . $query . '%')
                    ->orWhere('active_substance', 'ILIKE', '%' . $query . '%');
        });
        if (isset($filters['category_id'])){
            $requete->where('category_id', $filters['category_id']);
        }

        return $requete->paginate(20);
    }

    public function getPharmaciesWithStock(int $medicamentId, float $userLat, float $userLng)
    {
        $haversine = "(6371 * acos(cos(radians(?)) *
                    cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude))))";

        $requete= DB::table('pharmacies')
            ->join('pharmacy_stocks', 'pharmacies.id', '=', 'pharmacy_stocks.pharmacy_id')

             ->select(
                'pharmacies.id',
                'pharmacies.name',
                'pharmacies.address',
                'pharmacies.is_open',
                'pharmacy_stocks.price',
                'pharmacy_stocks.quantity'
            )

            ->selectRaw("{$haversine} AS distance", [$userLat, $userLng, $userLat])

            ->where('pharmacy_stocks.medicament_id', $medicamentId)
            ->where('pharmacy_stocks.quantity','>',0 )

            ->orderBy('distance', 'asc');

            return $requete->get();


    }

}
