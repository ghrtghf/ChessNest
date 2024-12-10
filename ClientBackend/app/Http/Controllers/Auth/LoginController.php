<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;

class LoginController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(AuthService $authService)
    {
        $this->service = $authService;
    }

    public function store(LoginRequest $request)
    {
        $response = $this->service->login($request->validated());

        if ($response['status'] === 'error') {
            return $this->error($response['message'], 401);
        }

        return $this->success($response['data'], 201);
    }
}
