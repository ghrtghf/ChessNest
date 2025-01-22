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

    public function player_white()
    {
        return $this->belongsTo(User::class, 'player_white_id');
    }

    public function player_black()
    {
        return $this->belongsTo(User::class, 'player_black_id');
    }

    public function moves()
    {
        return $this->hasMany(Move::class);
    }
}
