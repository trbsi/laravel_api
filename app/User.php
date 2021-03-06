<?php

namespace App;

use Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use JWTAuth;

class User extends Authenticatable
{
    use Notifiable;

    const ROLE_ADMIN = 1;
    const ROLE_EMPLOYEE = 0;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'role',
    ];

    /**
     * Automatically creates hash for the user password.
     *
     * @param  string $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function profile()
    {
        return $this->hasOne(\App\Profile::class, 'user_id', 'id');
    }

    public function getAllUsers()
    {
        return User::with('profile')->get();
    }

    public function findOne($id)
    {
        return User::where(['id' => $id])->first();
    }

    public function currentUser()
    {
        return JWTAuth::parseToken()->authenticate();
    }
}
