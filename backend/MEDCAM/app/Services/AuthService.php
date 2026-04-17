<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{

    /**
     * Crée un nouvel utilisateur et lui retourne un token.
     * Reçoit un tableau de données déjà validées.
     *
     * @param array $data
     * @return array ['user' => User, 'token' => string]
     */
    public function register(array $data): array
    {

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    /**
     * Authentifie un utilisateur et lui retourne un token.
     *
     * @param array $data
     * @return array ['user' => User, 'token' => string]
     * @throws ValidationException
     */
    public function login(array $data)
    {
        $user = User::where('email', $data['email'])->first();

        if(! $user || ! Hash::check($data['password'], $user->password)){
            // alors déclenche une erreur : throw ValidationException::withMessages(['email' => 'Identifiants incorrects.']);
            throw ValidationException::withMessages([
                    'email' => ['Les identifiants fournis sont incorrects.'],
            ]);
        }

        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

         return [
            'user' => $user,
            'token' => $token,
        ];
     }

      /**
     * Déconnecte l'utilisateur en révoquant son token actuel.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function logout(User $user): void
    {
        /**
         * @var \Laravel\Sanctum\PersonalAccessToken|null $token
         */
        $token = $user->currentAccessToken();

        if ($token) {
            $token->delete();
        }
    }
}
