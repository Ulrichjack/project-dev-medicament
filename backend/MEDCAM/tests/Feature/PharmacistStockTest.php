<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Medicament;
use App\Models\Pharmacy;
use App\Models\PharmacyStock;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PharmacistStockTest extends TestCase
{
    use RefreshDatabase;

    public function test_pharmacist_cannot_move_stock_to_another_pharmacy(): void
    {
        $pharmacist = User::factory()->create(['role' => 'pharmacien']);
        $pharmacy = Pharmacy::factory()->create();
        $pharmacy->user_id = $pharmacist->id;
        $pharmacy->save();

        $otherPharmacy = Pharmacy::factory()->create();
        $category = Category::create(['name' => 'Antalgiques']);
        $medicament = Medicament::factory()->create(['category_id' => $category->id]);
        $stock = PharmacyStock::create([
            'pharmacy_id' => $pharmacy->id,
            'medicament_id' => $medicament->id,
            'quantity' => 10,
            'price' => 1500,
        ]);

        Sanctum::actingAs($pharmacist);

        $this->patchJson("/api/pharmacist/stock/{$stock->id}", [
            'pharmacy_id' => $otherPharmacy->id,
            'quantity' => 5,
        ])->assertOk();

        $this->assertDatabaseHas('pharmacy_stocks', [
            'id' => $stock->id,
            'pharmacy_id' => $pharmacy->id,
            'quantity' => 5,
        ]);
    }

    public function test_pharmacist_cannot_set_negative_stock(): void
    {
        $pharmacist = User::factory()->create(['role' => 'pharmacien']);
        Sanctum::actingAs($pharmacist);

        $category = Category::create(['name' => 'Antalgiques']);
        $medicament = Medicament::factory()->create(['category_id' => $category->id]);

        $this->postJson('/api/pharmacist/stock', [
            'medicament_id' => $medicament->id,
            'quantity' => -1,
            'price' => 1500,
        ])->assertUnprocessable()->assertJsonValidationErrors('quantity');
    }
}
