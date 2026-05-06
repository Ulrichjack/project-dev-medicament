<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // On crée un client de test
        User::firstOrCreate(['email' => 'client@test.com'], [
            'name' => 'Client Test',
            'password' => Hash::make('password123'),
            'role' => 'client',
        ]);

        // On crée un pharmacien de test
        User::firstOrCreate(['email' => 'pharmacien@test.com'], [
            'name' => 'Pharmacien Test',
            'password' => Hash::make('password123'),
            'role' => 'pharmacien',
        ]);
    }
}
