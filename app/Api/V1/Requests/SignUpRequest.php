<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class SignUpRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ];
    }

    public function authorize()
    {
        return true;
    }

    public function messages()
    {
        return
            [
                'email.required' => 'Email is required',
                'email.email' => 'Email is required',
                'email.unique' => 'Email already exist',
            ];
    }


}
