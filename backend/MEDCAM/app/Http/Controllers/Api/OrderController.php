<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponse;

    public function __construct(protected OrderService $orderService) {}

    public function store(Request $request)
    {
        // Validation basique
        $request->validate([
            'pharmacy_id' => 'required|exists:pharmacies,id',
            'delivery_address' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.medicament_id' => 'required|exists:medicaments,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            // On passe les données et l'utilisateur connecté (grâce au token Sanctum)
            $order = $this->orderService->createOrder($request->all(), $request->user());
            return $this->successResponse($order, 'Commande créée avec succès', 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }

    public function index(Request $request):JsonResponse
    {
        $orders = $this->orderService->getUserOrders($request->user());
        return $this->successResponse($orders, 'Historique des commandes', 200);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        try {
            $order = $this->orderService->getOrderById($id, $request->user());
            return $this->successResponse($order, 'Détails de la commande', 200);
        } catch (\Exception $e) {
            return $this->errorResponse("Commande introuvable", 404);
        }
    }

    public function cancel(Request $request, int $id): JsonResponse
    {
        try {
            $order = $this->orderService->cancelOrder($id, $request->user());
            return $this->successResponse($order, 'Commande annulée avec succès', 200);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }



}
