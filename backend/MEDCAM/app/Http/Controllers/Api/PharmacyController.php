<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
        return $this->successResponse($result, 'Liste des Pharmacies trouvées', 200);

    }

    public function show($id){
        $result = $this->pharmacyService->getPharmacyById($id);
        return $this->successResponse($result, 'Pharmacie trouvée n°' . $id, 200);
    }

}
