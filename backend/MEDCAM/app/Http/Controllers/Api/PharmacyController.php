<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PharmacyResource;
use App\Services\PharmacyService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class PharmacyController extends Controller
{
    //
    use ApiResponse;

    public function __construct(protected PharmacyService $pharmacyService)
    {
    }

    public function index(){
        $result = $this->pharmacyService->getAllPharmacies();
        return $this->successResponse(
            PharmacyResource::collection($result),
            'Liste des Pharmacies trouvées'
        );
    }

    public function show($id){
        $result = $this->pharmacyService->getPharmacyById($id);
        return $this->successResponse(
            new PharmacyResource($result),
            'Pharmacie trouvée {id: '.$id.'}'
        );
    }
}
