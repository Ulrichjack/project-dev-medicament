<?php

namespace Database\Seeders;

use App\Models\Medicament;
use Illuminate\Database\Seeder;

class MedicamentSeeder extends Seeder
{
    public function run(): void
    {
        $meds = [
            // Antibiotiques (ID 1)
            ['category_id' => 1, 'name' => 'Amoxicilline 500mg', 'active_substance' => 'Amoxicilline', 'dosage' => 'Gélule'],
            ['category_id' => 1, 'name' => 'Cotrimoxazole 480mg', 'active_substance' => 'Sulfaméthoxazole', 'dosage' => 'Comprimé'],
            ['category_id' => 1, 'name' => 'Doxycycline 100mg', 'active_substance' => 'Doxycycline', 'dosage' => 'Gélule'],

            // Antidouleurs (ID 2)
            ['category_id' => 2, 'name' => 'Paracétamol 500mg', 'active_substance' => 'Paracétamol', 'dosage' => 'Comprimé'],
            ['category_id' => 2, 'name' => 'Ibuprofène 400mg', 'active_substance' => 'Ibuprofène', 'dosage' => 'Comprimé'],

            // Antiparasitaires (ID 3)
            ['category_id' => 3, 'name' => 'Artéméther 80mg', 'active_substance' => 'Artéméther', 'dosage' => 'Injection'],
            ['category_id' => 3, 'name' => 'Mébendazole 500mg', 'active_substance' => 'Mébendazole', 'dosage' => 'Comprimé'],

            // Vitamines (ID 4)
            ['category_id' => 4, 'name' => 'Vitamine C 1000mg', 'active_substance' => 'Acide ascorbique', 'dosage' => 'Effervescent'],
            ['category_id' => 4, 'name' => 'Zinc 20mg', 'active_substance' => 'Sulfate de Zinc', 'dosage' => 'Comprimé'],
            ['category_id' => 4, 'name' => 'Acide folique 5mg', 'active_substance' => 'Acide folique', 'dosage' => 'Comprimé'],

            // Cardiovasculaire (ID 5)
            ['category_id' => 5, 'name' => 'Amlodipine 5mg', 'active_substance' => 'Amlodipine', 'dosage' => 'Comprimé'],
            ['category_id' => 5, 'name' => 'Metformine 500mg', 'active_substance' => 'Metformine', 'dosage' => 'Comprimé'],
            ['category_id' => 5, 'name' => 'Oméprazole 20mg', 'active_substance' => 'Oméprazole', 'dosage' => 'Gélule'],

            // Dermatologie (ID 6)
            ['category_id' => 6, 'name' => 'Loratadine 10mg', 'active_substance' => 'Loratadine', 'dosage' => 'Comprimé'],
            ['category_id' => 6, 'name' => 'Fer 100mg', 'active_substance' => 'Fumarate ferreux', 'dosage' => 'Sirop'],
        ];

        foreach ($meds as $med) {
            Medicament::create($med);
        }
    }
}
