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
        $pharmacist = $request->user();

        $pharmacy = $pharmacist->pharmacy;

        if (!$pharmacy) {
            return $this->errorResponse("Ce pharmacien n'est associé à aucune pharmacie.", 403);
        }

        $orders = $this->pharmacistService->getPharmacyOrders($pharmacy->id);
        return $this->successResponse($orders, 'Commandes à traiter', 200);
    }


    public function addStock(Request $request){
        $stockItem = $this->pharmacistService->addMedicamentToStock($request->all(), $request->user());
        return $this->successResponse($stockItem, 'Médicament ajouté au stock', 201);
    }

    public function updateStock(Request $request, int $stockId){
        $updatedItem = $this->pharmacistService->updateStockItem($stockId, $request->all(), $request->user());
        return $this->successResponse($updatedItem, 'Stock mis à jour', 200);
    }

    public function updateOrderStatus(Request $request, int $orderId){
        $newStatus = $request->input('status');
        $updatedOrder = $this->pharmacistService->updateOrderStatus($orderId, $newStatus, $request->user());
        return $this->successResponse($updatedOrder, 'Statut de la commande mis à jour', 200);
    }



}
