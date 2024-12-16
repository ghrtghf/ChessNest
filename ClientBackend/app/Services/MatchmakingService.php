<?php

namespace App\Services;

use App\Repositories\MatchmakingRepository;

class MatchmakingService extends BaseService
{
    public $repo;

    public function __construct(MatchmakingRepository $matchmakingRepository)
    {
        $this->repo = $matchmakingRepository;
    }
}
