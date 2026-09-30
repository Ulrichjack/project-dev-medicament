<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
     {
        // Si l'utilisateur n'est pas connecté, ou s'il n'a pas le bon rôle
        if (! $request->user() || $request->user()->role !== $role) {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé. Réservé au rôle : ' . $role
            ], 403);
        }

        return $next($request);
    }
}
