<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        // On récupère toutes les catégories
        $categories = Category::all();
        return $this->successResponse($categories, 'Catégories récupérées');
    }
}
