<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;

class RegisterController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(AuthService $authService)
    {
        $this->service = $authService;
    }

    public function store(RegisterRequest $request)
    {
        return $this->success($this->service->register($request->validated()), 201);
    }
}
