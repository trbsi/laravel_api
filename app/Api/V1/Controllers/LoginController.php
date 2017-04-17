<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\User;

class LoginController extends Controller
{
    public function login(LoginRequest $request, JWTAuth $JWTAuth)
    {

        $credentials = $request->only(['email', 'password']);

        try {
            $token = $JWTAuth->attempt($credentials);
            $user = User::where('email', '=', $request->get('email'))->first();
            if (!$token) {
                return response()
                    ->json([
                        'status' => false,
                        'message' => 'No such user',
                    ]);
            }

        } catch (JWTException $e) {
            throw new HttpException(500);
        }

        return response()
            ->json([
                'status' => true,
                'token' => $token,
                'role' => $user->role
            ]);
    }
}
