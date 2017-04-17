<?php

namespace App\Api\V1\Controllers;

use Config;
use App\User;
use App\Profile;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\SignUpRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SignUpController extends Controller
{
    public function signUp(SignUpRequest $request, JWTAuth $JWTAuth)
    {
        $user = new User($request->all());

        if (!$user->save()) {
            return response()->json([
                'status' => false
            ]);
        }

        $profile = new Profile();
        $profile->user_id = $user->id;
        $profile->save();

        if (!Config::get('myconfig.sign_up.release_token')) {
            return response()->json([
                'status' => true
            ]);
        }

        $token = $JWTAuth->fromUser($user);
        return response()->json([
            'status' => true,
            'token' => $token
        ]);
    }
}
