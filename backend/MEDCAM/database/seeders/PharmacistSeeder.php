<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Pharmacy;
use Illuminate\Support\Facades\Hash;

class PharmacistSeeder extends Seeder
{
    public function run(): void
    {
        // On récupère la pharmacie qui a été créée par PharmacySeeder
        $pharmacy = Pharmacy::where('license_number', 'PH-AKWA-001')->first();
        if (!$pharmacy) {
             $this->command->error('La pharmacie d\'Akwa n\'a pas été trouvée. Lancez PharmacySeeder d\'abord.');
             return;
        }

        // On crée notre compte pharmacien
        $pharmacist = User::updateOrCreate(
            ['email' => 'pro@medcam.com'],
            [
                'name' => 'Dr. Akwa Pharmacien',
                'password' => Hash::make('password'),
                'role' => 'pharmacien',
            ]
        );

        // On lie la pharmacie au pharmacien
        $pharmacy->user_id = $pharmacist->id;
        $pharmacy->save();

        $this->command->info('✅ Le compte pro@medcam.com a été lié à la pharmacie d\'Akwa.');
    }
}
