<?php

namespace App\Repositories;

use App\Models\Matchmaking;

class MatchmakingRepository extends BaseRepository
{
    public $model;

    public function __construct(Matchmaking $model)
    {
        $this->model = $model;
    }

    public function destroy($user_id)
    {
        return $this->model->where('user_id', $user_id)->delete();
    }
}
