<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MedicamentService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MedicamentController extends Controller
{
    //
    use ApiResponse;

    public function __construct(protected MedicamentService $medicamentService)
    {
    }

    public function search(Request $request): JsonResponse
    {
        $query = $request->query('q', '');
        $filters = $request->only(['category_id']);

        $result = $this->medicamentService->search($query, $filters);

        return $this->successResponse($result, 'Recherche réussie', 200);
    }

    public function pharmacies(Request $request, int $id)
    {
        $lat = (float) $request->query('latitude');
        $lng = (float) $request->query('longitude');

        $result = $this->medicamentService->getPharmaciesWithStock($id, $lat, $lng);

        return $this->successResponse($result, 'Pharmacies trouvées', 200);
    }

}
