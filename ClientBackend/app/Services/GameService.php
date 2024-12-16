<?php

namespace App\Services;

use App\Repositories\GameRepository;

class GameService extends BaseService
{
    public $repo;

    public function __construct(GameRepository $gameRepository)
    {
        $this->repo = $gameRepository;
    }
}
