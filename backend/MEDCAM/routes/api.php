<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MedicamentController;
use App\Http\Controllers\Api\PharmacyController;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});

Route::get('/medicaments/search', [MedicamentController::class, 'search']);
Route::get('/medicaments/{id}/pharmacies', [MedicamentController::class, 'pharmacies']);



Route::get('/pharmacies', [PharmacyController::class, 'index']);
Route::get('/pharmacies/{id}', [PharmacyController::class, 'show']);
        