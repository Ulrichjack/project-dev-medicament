<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MedicamentController;
use App\Http\Controllers\Api\PharmacyController;
use App\Http\Controllers\Api\OrderController;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    //medicaments
    Route::get('/medicaments/search', [MedicamentController::class, 'search']);
    Route::get('/medicaments/{id}/pharmacies', [MedicamentController::class, 'pharmacies']);


    // Commandes (Orders)
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::patch('/orders/{id}/cancel', [OrderController::class, 'cancel']); // PATCH car on modifie juste le statut

    //pharmacies
    Route::get('/pharmacies', [PharmacyController::class, 'index']);
    Route::get('/pharmacies/{id}', [PharmacyController::class, 'show']);


    //paiement
    Route::post('/orders/{id}/pay', [App\Http\Controllers\Api\PaymentController::class, 'simulate']);

});

