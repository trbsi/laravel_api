<?php

namespace App\Api\V1\Controllers\Admin;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\User;
use App\Profile;
use Illuminate\Http\Request;
use App\Api\V1\Requests\SignUpRequest;

class EmployeeController extends Controller
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function index()
    {
        $users = $this->user->getAllUsers();
        return response()->json(['users' => $users]);
    }

    public function destroy(Request $request)
    {
        $id = $request->input('id');
        $user = $this->user->findOne($id);
        if (!empty($user) && $user->delete()) {
            return response()->json(['status' => true]);
        }

        return response()->json(['status' => false]);
    }

    public function create(SignUpRequest $request)
    {
        $user = new User($request->all());

        if (!$user->save()) {
            throw new HttpException(500);
        }

        $profile = new Profile();
        $profile->user_id = $user->id;
        $profile->save();

        return response()->json([
            'status' => true,
        ], 201);
    }
}
