<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PharmacySeeder::class,
            // On pourra ajouter OrderSeeder::class, etc. plus tard
        ]);
    }
}
