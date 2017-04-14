<?php

use Dingo\Api\Routing\Router;

$api = app(Router::class);

$api->version('v1', function (Router $api) {

    $api->group(['prefix' => 'auth'], function (Router $api) {

        $api->post('signup', 'App\Api\V1\Controllers\SignUpController@signUp');
        $api->post('login', 'App\Api\V1\Controllers\LoginController@login');

        $api->post('recovery', 'App\Api\V1\Controllers\ForgotPasswordController@sendResetEmail');
        $api->post('reset', 'App\Api\V1\Controllers\ResetPasswordController@resetPassword');
    });

    $api->group(['middleware' => ['jwt.auth']], function (Router $api) {

        $api->group(['middleware' => ['auth.role:admin'], 'prefix' => 'admin'], function (Router $api) {
            $api->post('destroy', 'App\Api\V1\Controllers\Admin\EmployeeController@destroy');
            $api->get('index', 'App\Api\V1\Controllers\Admin\EmployeeController@index');
            $api->post('create', 'App\Api\V1\Controllers\Admin\EmployeeController@create');
        });

        $api->group(['middleware' => ['auth.role:employee'], 'prefix' => 'employee'], function (Router $api) {
            $api->post('edit', 'App\Api\V1\Controllers\Employee\ProfileController@edit');
            $api->get('show', 'App\Api\V1\Controllers\Employee\ProfileController@show');
        });

    });

});