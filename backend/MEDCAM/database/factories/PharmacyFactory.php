<?php

namespace Database\Factories;

use App\Models\Pharmacy; // <-- IMPORT DU MODÈLE
use Illuminate\Database\Eloquent\Factories\Factory;

class PharmacyFactory extends Factory
{
    // On force Laravel à comprendre que cette usine fabrique des Pharmacies
    protected $model = Pharmacy::class;

    public function definition(): array
    {
        return [
            'name' => 'Pharmacie ' . $this->faker->company(),
            'license_number' => 'PH-' . $this->faker->unique()->randomNumber(5, true),
            'address' => $this->faker->address(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'latitude' => $this->faker->latitude(3.9, 4.2),
            'longitude' => $this->faker->longitude(9.6, 9.9),
            'is_open' => true,
        ];
    }
}
