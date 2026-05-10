<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            // 1. Les bases (Utilisateurs et Pharmacies vides)
            UserSeeder::class,
            PharmacySeeder::class,

            // 2. Le catalogue de médicaments
            CategorySeeder::class,
            MedicamentSeeder::class,

            // 3. On remplit les stocks
            PharmacyStockSeeder::class,

            // 4. On crée une fausse commande pour tester
            OrderSeeder::class,

            // 5. À LA FIN, on lie le pharmacien à sa pharmacie !
            PharmacistSeeder::class,
        ]);
    }
}
