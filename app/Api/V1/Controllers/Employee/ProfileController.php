<?php

namespace App\Api\V1\Controllers\Employee;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\User;
use App\Profile;
use App\Api\V1\Requests\ProfileRequest;

class ProfileController extends Controller
{
    public function __construct(User $user, Profile $profile)
    {
        $this->user = $user;
        $this->profile = $profile;
        $this->currentUser = $this->user->currentUser();
    }

    public function edit(ProfileRequest $request)
    {
        $profile = $this->profile->getProfile($this->currentUser->id);
        if ($profile->update($request->all())) {
            return response()->json([
                'status' => true
            ], 201);
        }

        return response()->json([
            'status' => false
        ], 201);
    }

    public function show()
    {
        $profile = $this->profile->getProfile($this->currentUser->id);
        return response()->json([
            $profile
        ], 201);
    }
}
