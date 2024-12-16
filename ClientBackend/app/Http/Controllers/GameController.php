<?php

namespace App\Http\Controllers;

use App\Services\GameService;
use Illuminate\Http\Request;

class GameController extends Controller
{
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
    }

    public function store(Request $request)
    {
        //
    }

    public function update($gameId, Request $request)
    {
        //
    }
}
