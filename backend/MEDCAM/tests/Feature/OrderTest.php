<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Medicament;
use App\Models\Pharmacy;
use App\Models\PharmacyStock;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum; // <-- Très important pour simuler la connexion
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_order(): void
    {
        // 1. PRÉPARATION DES DONNÉES (Le monde virtuel)
        $user = User::create([
            'name' => 'Client Test',
            'email' => 'client@test.com',
            'password' => bcrypt('password'),
            'role' => 'client'
        ]);

        $pharmacy = Pharmacy::create([
            'name' => 'Pharmacie Centrale',
            'email'=>'jj@gmailcom',
            'license_number' => 'PH-999',
            'address' => 'Yaoundé',
            'latitude' => 3.8480,
            'longitude' => 11.5021,
        ]);

        $category = Category::create(['name' => 'Antibiotiques']);

        $medicament = Medicament::create([
            'category_id' => $category->id,
            'name' => 'Amoxicilline',
        ]);

        // On met 10 boîtes en stock
        PharmacyStock::create([
            'pharmacy_id' => $pharmacy->id,
            'medicament_id' => $medicament->id,
            'quantity' => 10,
            'price' => 2000
        ]);

        // 2. SIMULATION DE LA CONNEXION
        // On dit à Laravel : "Fais comme si ce $user était connecté avec un token"
        Sanctum::actingAs($user);

        // 3. LES DONNÉES DE LA REQUÊTE (Le panier du client)
        $payload = [
            'pharmacy_id' => $pharmacy->id,
            'delivery_address' => 'Quartier Bastos, Yaoundé',
            'items' => [
                [
                    'medicament_id' => $medicament->id,
                    'quantity' => 2 // Le client achète 2 boîtes
                ]
            ]
        ];

        // ==========================================
        // 🚀 À TOI DE JOUER À PARTIR D'ICI !
        // ==========================================
        $response = $this->postJson('/api/orders', $payload)
                    ->assertStatus(201)
                    ->assertJsonStructure([
                        'success',
                        'message',
                        'data' => [
                                'id', 'pharmacy_id', 'user_id'
                        ]
                    ]);
                    $this->assertDatabaseHas('pharmacy_stocks', [
                        'pharmacy_id' => $pharmacy->id,
                        'medicament_id' => $medicament->id,
                        'quantity' => 8 // Il doit en rester 8 après l'achat de 2
                    ]);


        // 4. Fais une requête POST JSON vers '/api/orders' avec le $payload
        // 5. Vérifie que le statut est 201 (Created)
        // 6. Vérifie que la réponse contient "success" et "message"

        // 7. LE TEST DU BOSS : Vérifie que le stock a bien diminué dans la base de données !
        // Indice : Le stock de départ était 10. Il en a acheté 2. Il doit en rester 8.
        // Utilise : $this->assertDatabaseHas('pharmacy_stocks', ['quantity' => 8]);

    }
}
