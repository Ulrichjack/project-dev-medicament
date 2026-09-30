<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    /**
     * Retourne une réponse JSON de succès.
     */
    protected function successResponse(mixed $data,
        string $message = 'Succes', int $code=200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);

    }

     /**
     * Retourne une réponse JSON d'erreur.
     */
    protected function errorResponse(string $message, int $code = 400, array $errors = []): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors'  => $errors
        ], $code);

    }


}
