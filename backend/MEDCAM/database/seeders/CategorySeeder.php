<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Antibiotiques', 'Antidouleurs', 'Antiparasitaires',
            'Vitamines', 'Cardiovasculaire', 'Dermatologie'
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(['name' => $cat]);        }
    }
}
