<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Services\UserService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;


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

    public function find(Request $request)
    {
        $response = $this->service->findByName($request->nickname);

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

    public function stats(Request $request)
    {
        $response = $this->service->stats($request->period);

        return $this->success($response, 201);
    }

    public function addFriend($nickname)
    {
        $response = $this->service->addFriend($nickname);

        return $this->success(['users' => $response], 201);
    }
}
