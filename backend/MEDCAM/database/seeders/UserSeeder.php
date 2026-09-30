<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(['email' => 'client@medcam.cm'], [
            'name' => 'Client Test',
            'password' => Hash::make('password'),
            'role' => 'client',
        ]);

        User::firstOrCreate(['email' => 'admin@medcam.cm'], [
            'name' => 'Admin Medcam',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);
    }
}
