<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{

    /**
     * Generated
     */

    protected $table = 'profile';
    public $timestamps = false;
    protected $fillable = ['id', 'user_id', 'name', 'surname', 'address'];


    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id', 'id');
    }

    public function getProfile($id)
    {
        return Profile::where(['user_id' => $id])->first();
    }
}
