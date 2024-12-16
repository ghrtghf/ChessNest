<?php

namespace App\Http\Controllers;

use App\Jobs\MatchmakingJob;
use App\Services\MatchmakingService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class MatchmakingController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(MatchmakingService $matchmakingService)
    {
        $this->service = $matchmakingService;
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $response = $this->service->create(['user_id' => $user->id, 'rating' => $user->rating]);

        MatchmakingJob::dispatch();

        return $this->success($response, 201);
    }

    public function destroy(Request $request)
    {
        $response = $this->service->destroy($request->user()->id);

        return $this->success($response, 204);
    }
}
