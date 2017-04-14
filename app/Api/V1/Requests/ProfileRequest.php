<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|max:20',
            'surname' => 'required|max:20',
            'address' => 'required|max:50',
        ];
    }

    public function authorize()
    {
        return true;
    }
}
