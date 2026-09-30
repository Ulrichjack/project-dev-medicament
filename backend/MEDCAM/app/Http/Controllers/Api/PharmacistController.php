<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource; // <-- IMPORT
use App\Http\Resources\StockResource; // <-- IMPORT
use App\Services\PharmacistService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PharmacistController extends Controller
{
    use ApiResponse;

    public function __construct(protected PharmacistService $pharmacistService) {}

    public function getOrders(Request $request): JsonResponse
    {
        $pharmacist = $request->user();
        $pharmacy = $pharmacist->pharmacy;

        if (! $pharmacy) {
            return $this->errorResponse("Ce pharmacien n'est associé à aucune pharmacie.", 403);
        }

        $orders = $this->pharmacistService->getPharmacyOrders($pharmacy->id);

        // ON UTILISE ORDER RESOURCE ICI
        return $this->successResponse(
            OrderResource::collection($orders),
            'Commandes à traiter',
            200
        );
    }
    // Dans app/Http/Controllers/Api/PharmacistController.php

    public function getStock(Request $request)
    {
        $stockItems = $this->pharmacistService->getPharmacyStock($request->user());

        // On utilise la StockResource qu'on a créée !
        return $this->successResponse(
            StockResource::collection($stockItems),
            'Stock de la pharmacie récupéré'
        );
    }

    public function addStock(Request $request)
    {
        $validated = $request->validate([
            'medicament_id' => 'required|integer|exists:medicaments,id',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
        ]);
        $stockItem = $this->pharmacistService->addMedicamentToStock($validated, $request->user());

        // ON UTILISE STOCK RESOURCE ICI
        return $this->successResponse(new StockResource($stockItem), 'Médicament ajouté au stock', 201);
    }

    public function updateStock(Request $request, int $stockId)
    {
        $validated = $request->validate([
            'quantity' => 'sometimes|required|integer|min:0',
            'price' => 'sometimes|required|numeric|min:0',
            'is_available' => 'sometimes|required|boolean',
        ]);
        $updatedItem = $this->pharmacistService->updateStockItem($stockId, $validated, $request->user());

        // ON UTILISE STOCK RESOURCE ICI
        return $this->successResponse(new StockResource($updatedItem), 'Stock mis à jour', 200);
    }

    public function updateOrderStatus(Request $request, int $orderId)
    {
        $validated = $request->validate([
            'status' => 'required|in:preparing,ready,delivered',
        ]);
        $newStatus = $validated['status'];
        $updatedOrder = $this->pharmacistService->updateOrderStatus($orderId, $newStatus, $request->user());

        // ON UTILISE ORDER RESOURCE ICI
        return $this->successResponse(new OrderResource($updatedOrder), 'Statut de la commande mis à jour', 200);
    }

    public function createMedicament(Request $request)
    {
        // Validation basique
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'active_substance' => 'nullable|string|max:200',
            'category_id' => 'required|integer|exists:categories,id',
            'prescription_required' => 'sometimes|boolean',
        ]);

        $medicament = $this->pharmacistService->createNewMedicament($validated);

        return $this->successResponse($medicament, 'Nouveau médicament ajouté au catalogue', 201);
    }
}
