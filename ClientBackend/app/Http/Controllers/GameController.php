<?php

namespace App\Http\Controllers;

use App\Http\Requests\GameRequest;
use App\Services\GameService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class GameController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(GameService $gameService)
    {
        $this->service = $gameService;
    }

    public function index()
    {
        //
    }

    public function show($gameId)
    {
        $game = $this->service->find($gameId);

        return $this->success($game, 201);
    }

    public function store(GameRequest $request)
    {
        $response = $this->service->create($request->validated());

        return $this->success($response, 201);
    }

    public function update($gameId, Request $request)
    {
        //
    }
}
