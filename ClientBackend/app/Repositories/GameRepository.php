<?php

namespace App\Repositories;

use App\Models\Game;

class GameRepository extends BaseRepository
{
    public $model;

    public function __construct(Game $game)
    {
        $this->model = $game;
    }
}
