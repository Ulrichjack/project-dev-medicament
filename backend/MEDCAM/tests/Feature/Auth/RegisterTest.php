<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    // TRÈS IMPORTANT : Ceci vide la base de données de test avant chaque test
    use RefreshDatabase;

    public function test_user_can_register(): void
    {
        $donnees = [
            'name' => 'Test User',
            'email' => 'jack@gmail.com',
            'role' => 'client',
            'phone' => '1234567890',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        // On simule une requête POST
        $response = $this->postJson('/api/auth/register', $donnees);

        // On vérifie que ça a marché (201 Created)
        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'user' => ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
                    'token',
                ],
            ]);

        // On vérifie que l'utilisateur est bien dans la base de données
        $this->assertDatabaseHas('users', [
            'email' => 'jack@gmail.com',
        ]);
    }

    public function test_user_can_login(): void
    {
        // 1. On crée un faux utilisateur dans la base de données de test
        $user = User::factory()->create([
            'email' => 'login@gmail.com',
            'password' => bcrypt('password123'),
        ]);

        // 2. On essaie de se connecter
        $response = $this->postJson('/api/auth/login', [
            'email' => 'login@gmail.com',
            'password' => 'password123',
        ]);

        // 3. On vérifie le succès (200 OK)
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['user', 'token'],
            ]);
    }

    public function test_public_registration_cannot_create_a_pharmacist(): void
    {
        $this->postJson('/api/auth/register', [
            'name' => 'Pharmacien non vérifié',
            'email' => 'unverified@example.com',
            'role' => 'pharmacien',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ])->assertUnprocessable()->assertJsonValidationErrors('role');

        $this->assertDatabaseMissing('users', ['email' => 'unverified@example.com']);
    }

    public function test_inactive_user_cannot_login(): void
    {
        User::factory()->create([
            'email' => 'inactive@example.com',
            'password' => bcrypt('password123'),
            'is_active' => false,
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'inactive@example.com',
            'password' => 'password123',
        ])->assertUnprocessable()->assertJsonValidationErrors('email');
    }
}
