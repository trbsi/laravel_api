<?php

namespace App\Http\Middleware;

use App\User;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class RoleMiddleware extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, \Closure $next, $role)
    {
        $token = $this->auth->setRequest($request)->getToken();
        $user = $this->auth->authenticate($token);

        switch ($role) {
            case 'admin':
                if ($user->role != User::ROLE_ADMIN) {
                    return response()
                        ->json([
                            'status' => 'Not Allowed'
                        ]);
                }
                break;
            case 'employee':
                if ($user->role != User::ROLE_EMPLOYEE) {
                    return response()
                        ->json([
                            'status' => 'Not Allowed'
                        ]);
                }
                break;
        }

        return $next($request);
    }
}
