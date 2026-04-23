<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MedicamentController;
use App\Http\Controllers\Api\PharmacyController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PharmacistController;

/*
|--------------------------------------------------------------------------
| 1. ROUTES PUBLIQUES (Pas besoin d'être connecté)
|--------------------------------------------------------------------------
*/
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Catalogue (Tout le monde peut chercher)
Route::get('/medicaments/search', [MedicamentController::class, 'search']);
Route::get('/medicaments/{id}/pharmacies', [MedicamentController::class, 'pharmacies']);
Route::get('/pharmacies', [PharmacyController::class, 'index']);
Route::get('/pharmacies/{id}', [PharmacyController::class, 'show']);


/*
|--------------------------------------------------------------------------
| 2. ESPACE CLIENT (Il faut le token Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Profil
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Commandes
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::patch('/orders/{id}/cancel', [OrderController::class, 'cancel']);

    // Paiement
    Route::post('/orders/{id}/pay', [PaymentController::class, 'simulate']);
});


/*
|--------------------------------------------------------------------------
| 3. ESPACE PHARMACIEN (Il faut le token Sanctum ET le rôle pharmacien)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:pharmacien'])->prefix('pharmacist')->group(function () {

    Route::get('/orders', [PharmacistController::class, 'getOrders']);

});
