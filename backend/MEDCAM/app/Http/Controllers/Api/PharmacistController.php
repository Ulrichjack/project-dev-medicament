<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PharmacistService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PharmacistController extends Controller
{
    use ApiResponse;

    public function __construct(protected PharmacistService $pharmacistService) {}

    public function getOrders(Request $request): JsonResponse
    {
        // Pour l'instant on force l'ID 1.
        // Plus tard, on liera le pharmacien connecté à sa pharmacie dans la BDD.
        $pharmacyId = 1;

        $orders = $this->pharmacistService->getPharmacyOrders($pharmacyId);
        return $this->successResponse($orders, 'Commandes à traiter', 200);
    }
}
