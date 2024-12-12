<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Services\UserService;
use App\Traits\ApiResponse;

class UserController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(UserService $userService)
    {
        $this->service = $userService;
    }

    public function index()
    {
        $response = $this->service->all();

        return $this->success(['users' => $response], 201);
    }

    public function show($id)
    {
        $response = $this->service->find($id);

        return $this->success(['users' => $response], 201);
    }

    public function update(UserRequest $request, $id)
    {
        $response = $this->service->update($id, $request->validated());

        return $this->success(['users' => $response], 201);
    }

    public function destroy($id)
    {
        $response = $this->service->destroy($id);

        return $this->success(['users' => $response], 204);
    }
}
