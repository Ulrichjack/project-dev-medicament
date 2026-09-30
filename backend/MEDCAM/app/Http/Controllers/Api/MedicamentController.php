<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MedicamentResource;
use App\Models\Medicament;
use App\Services\MedicamentService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MedicamentController extends Controller
{
    use ApiResponse;

    public function __construct(protected MedicamentService $medicamentService)
    {
    }

    // 1️⃣ NOUVEAU : Récupérer tous les médicaments (Page d'accueil & Bouton "Tous")
    public function index(): JsonResponse
    {
        // On récupère tous les médicaments avec leur catégorie pour éviter les requêtes N+1
        $medicaments = Medicament::with('category')->get();

        return $this->successResponse(
            MedicamentResource::collection($medicaments),
            'Liste des médicaments'
        );
    }

    // 2️⃣ NOUVEAU : Récupérer les détails d'un seul médicament (Page Détails)
    public function show(int $id): JsonResponse
    {
        $medicament = Medicament::with('category')->find($id);

        if (!$medicament) {
            return $this->errorResponse('Médicament introuvable', 404);
        }

        return $this->successResponse(
            new MedicamentResource($medicament),
            'Détail du médicament'
        );
    }

    // Tes anciennes méthodes (Recherche et Pharmacies) qu'on garde :
    public function search(Request $request): JsonResponse
    {
        $query = $request->query('q', '');
        $filters = $request->only(['category_id']);

        $result = $this->medicamentService->search($query, $filters);

        return $this->successResponse(
            MedicamentResource::collection($result),
            'Médicaments trouvés'
        );
    }

    public function pharmacies(Request $request, int $id)
    {
        $lat = (float) $request->query('latitude');
        $lng = (float) $request->query('longitude');

        $result = $this->medicamentService->getPharmaciesWithStock($id, $lat, $lng);

        return $this->successResponse($result, 'Pharmacies trouvées', 200);
    }
}
