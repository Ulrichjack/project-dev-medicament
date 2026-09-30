<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MedicamentController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PharmacyController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PharmacistController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\CategoryController; // N'oublie pas l'import
/*
|--------------------------------------------------------------------------
| 1. ROUTES PUBLIQUES (Pas besoin d'être connecté)
|--------------------------------------------------------------------------
*/
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// ... dans le bloc des routes publiques
Route::get('/categories', [CategoryController::class, 'index']);

// Catalogue (Tout le monde peut chercher)
Route::get('/medicaments', [MedicamentController::class, 'index']);
Route::get('/medicaments/search', [MedicamentController::class, 'search']); // <-- CORRIGÉ : IL DOIT ÊTRE AVANT {id} !
Route::get('/medicaments/{id}', [MedicamentController::class, 'show']);
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

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    //Review
    Route::post('/reviews', [ReviewController::class, 'store']);
});


/*
|--------------------------------------------------------------------------
| 3. ESPACE PHARMACIEN (Il faut le token Sanctum ET le rôle pharmacien)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:pharmacien'])->prefix('pharmacist')->group(function () {

    //Gestion des commandes
    Route::get('/orders', [PharmacistController::class, 'getOrders']); // <-- Doublon supprimé
    Route::get('/stock', [PharmacistController::class, 'getStock']);
    Route::patch('/orders/{orderId}/status', [PharmacistController::class, 'updateOrderStatus']);

    // Gestion des stocks
    Route::post('/stock', [PharmacistController::class, 'addStock']);
    Route::patch('/stock/{stockId}', [PharmacistController::class, 'updateStock']);
    Route::post('/medicaments', [PharmacistController::class, 'createMedicament']);
});
