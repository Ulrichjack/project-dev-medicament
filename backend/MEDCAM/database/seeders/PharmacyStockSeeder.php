<?php

namespace Database\Seeders;

use App\Models\Medicament;
use App\Models\Pharmacy;
use App\Models\PharmacyStock;
use Illuminate\Database\Seeder;

class PharmacyStockSeeder extends Seeder
{
    public function run(): void
    {
        $pharmacies = Pharmacy::all();
        $medicaments = Medicament::all();

        if ($pharmacies->isEmpty() || $medicaments->isEmpty()) return;

        foreach ($medicaments as $med) {
            // On sélectionne 2 pharmacies au hasard pour ce médicament
            $randomPharmacies = $pharmacies->random(min(2, $pharmacies->count()));

            foreach ($randomPharmacies as $pharmacy) {
                // updateOrCreate évite l'erreur "Unique violation"
                PharmacyStock::updateOrCreate(
                    [
                        'pharmacy_id' => $pharmacy->id,
                        'medicament_id' => $med->id,
                    ],
                    [
                        'quantity' => rand(10, 50),
                        'price' => rand(500, 4500),
                        'is_available' => true,
                        'min_stock_alert' => 5
                    ]
                );
            }
        }
    }
}
