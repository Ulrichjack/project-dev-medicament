<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Medicament;
use App\Models\Pharmacy;
use App\Models\PharmacyStock;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MedicamentTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    use RefreshDatabase;

    public function test_can_search_medicament(): void
    {
        $category = Category::create([
            'name' => 'Antalgiques'
        ]);

        Medicament::create([
             'category_id' => $category->id,
             'name' => 'Doliprane',
             'active_substance' => 'Paracetamol',
             'prescription_required' => false
        ]);

         $this->getJson('/api/medicaments/search?q=doli')
                    ->assertStatus(200)
                    ->assertJsonStructure([
                        'success',
                        'message',
                        'data' => [
                            'data'
                        ]
                    ])
                    ->assertJsonFragment([
                         'name' => 'Doliprane'
                    ]);

    }

    public function test_can_find_pharmacies_with_gps(){

        $category = Category::create([
            'name' => 'Antalgiques'
        ]);

        Medicament::create([
             'category_id' => $category->id,
             'name' => 'Doliprane',
             'active_substance' => 'Paracetamol',
             'prescription_required' => false
        ]);

        Pharmacy::create([
            'name'=>'Pharmap',
            'license_number' => '123466',
            'address' => 'Douala',
            'email'=>'jj@gmailcom',
            'phone'=> '123456789',
            'latitude'=>'4.0600',
            'longitude'=> '9.7100',
            'opening_hours'=> '',
            'is_open'=>true,
            'rating'=> 2
        ]);

        PharmacyStock::create([
            'pharmacy_id' => 1,
            'medicament_id' => 1,
            'quantity' => 10,
            'price' => 1500
        ]);


        $this->getJson('/api/medicaments/1/pharmacies?latitude=4.0600&longitude=9.7100')
                    ->assertStatus(200)
                    ->assertJsonFragment([
                        'name' => 'Pharmap'
                    ])
                    // On vérifie que la clé "distance" existe bien dans le premier résultat
                    ->assertJsonStructure([
                        'success',
                        'message',
                        'data' => [
                            '*' => ['distance', 'id', 'name', 'price'] // On vérifie que chaque élément a bien ces clés
                        ]
                    ]);

    }

}
