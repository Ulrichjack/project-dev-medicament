<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Pharmacy;
use App\Models\Medicament;
use App\Models\PharmacyStock;

class PharmacySeeder extends Seeder
{
    public function run(): void
    {
        $cat1 = Category::firstOrCreate(['name' => 'Antalgiques']);
        $cat2 = Category::firstOrCreate(['name' => 'Antibiotiques']);

        $pharmacies = Pharmacy::factory(5)->create();
        $medicaments = Medicament::factory(10)->create(['category_id' => $cat1->id]);

        foreach ($pharmacies as $pharmacy) {
            $randomMedicaments = $medicaments->random(3);
            foreach ($randomMedicaments as $medicament) {
                PharmacyStock::create([
                    'pharmacy_id' => $pharmacy->id,
                    'medicament_id' => $medicament->id,
                    'quantity' => rand(10, 50),
                    'price' => rand(500, 3000),
                ]);
            }
        }
    }
}
