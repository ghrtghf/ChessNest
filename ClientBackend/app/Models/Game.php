<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_white_id',
        'player_black_id',
        'status',
        'winner_id',
        'started_at',
        'finished_at',
    ];
}
