<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //

    use ApiResponse;

    public function __construct(protected AuthService $authService) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        $result = $this->authService->register($data);

        return $this->successResponse([
            'user' => new UserResource($result['user']), // <-- ICI
            'token' => $result['token'],
            'token_type' => 'Bearer',
        ], 'Inscription réussie', 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        $result = $this->authService->login($data);

        return $this->successResponse([
            'user' => new UserResource($result['user']), // <-- ICI
            'token' => $result['token'],
            'token_type' => 'Bearer',
        ], 'Message de succès', 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        // Même pas besoin de passer de données, juste le message !
        return $this->successResponse(null, 'Déconnexion réussie', 200);
    }

    public function me(Request $request): JsonResponse
    {
        return $this->successResponse(new UserResource($request->user()), 'Profil utilisateur', 200);
    }
}
