<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Move extends Model
{
    use HasFactory;

    protected $fillable = ['game_id', 'player_id', 'move', 'move_number'];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}