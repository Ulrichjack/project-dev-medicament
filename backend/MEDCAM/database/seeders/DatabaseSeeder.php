<?php
namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PharmacySeeder::class,
            CategorySeeder::class,
            MedicamentSeeder::class,
            PharmacyStockSeeder::class,
            OrderSeeder::class,
            // On pourra ajouter OrderSeeder::class, etc. plus tard
        ]);
    }
}
