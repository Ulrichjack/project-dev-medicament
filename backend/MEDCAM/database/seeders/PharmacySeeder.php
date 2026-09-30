<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pharmacy;

class PharmacySeeder extends Seeder
{
    public function run(): void
    {
        // On utilise updateOrCreate pour éviter les doublons si on relance le seeder

        // Pharmacie à Douala (qui aura l'ID 1)
        Pharmacy::updateOrCreate(
            ['license_number' => 'PH-AKWA-001'],
            [
                'name' => 'Grande Pharmacie d\'Akwa',
                'address' => 'Boulevard de la Liberté, Akwa, Douala',
                'email' => 'contact@grandepharma-akwa.cm',
                'phone' => '699010203',
                'latitude' => 4.0454,
                'longitude' => 9.7045,
                'is_open' => true,
            ]
        );

        // Pharmacie à Yaoundé (qui aura l'ID 2)
        Pharmacy::updateOrCreate(
            ['license_number' => 'PH-BASTOS-001'],
            [
                'name' => 'Pharmacie de Bastos',
                'address' => 'Rue 1.761, Bastos, Yaoundé',
                'email' => 'contact@pharma-bastos.cm',
                'phone' => '677040506',
                'latitude' => 3.8821,
                'longitude' => 11.5093,
                'is_open' => true,
            ]
        );
    }
}
