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

    public function show($nickname)
    {
        $response = $this->service->find($nickname);

        return $this->success(['users' => $response], 201);
    }

    public function update(UserRequest $request, $nickname)
    {
        $response = $this->service->update($nickname, $request->validated());

        return $this->success(['users' => $response], 201);
    }

    public function destroy($nickname)
    {
        $response = $this->service->destroy($nickname);

        return $this->success(['users' => $response], 204);
    }
}
