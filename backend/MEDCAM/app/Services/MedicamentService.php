<?php

namespace App\Services;

use App\Models\Medicament;
use Illuminate\Support\Facades\DB;

class MedicamentService
{
    public function search(string $query, array $filters = [])
    {
        // 1. On demande à Laravel quel moteur de base de données on utilise actuellement
        $operator = DB::connection()->getDriverName() === 'pgsql' ? 'ILIKE' : 'LIKE';

        $requete = Medicament::query()
            ->with('category', 'stocks') // On charge les relations nécessaires pour éviter les N+1
            ->where(function($q) use ($query, $operator) { // <-- N'oublie pas d'ajouter $operator ici

                // 2. On utilise la variable $operator au lieu d'écrire 'ILIKE' en dur
                $q->where('name', $operator, '%' . $query . '%')
                  ->orWhere('active_substance', $operator, '%' . $query . '%');
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
