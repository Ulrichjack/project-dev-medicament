<?php

namespace Database\Factories;

use App\Models\Medicament; // <-- IMPORT DU MODÈLE
use Illuminate\Database\Eloquent\Factories\Factory;

class MedicamentFactory extends Factory
{
    // On force Laravel à comprendre que cette usine fabrique des Médicaments
    protected $model = Medicament::class;

    public function definition(): array
    {
        return [
            'name' => ucfirst($this->faker->word()) . ' ' . $this->faker->randomElement(['500mg', '1000mg', 'Sirop']),
            'active_substance' => ucfirst($this->faker->word()),
            'prescription_required' => $this->faker->boolean(20),
        ];
    }
}
