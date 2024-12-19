<?php

namespace App\Jobs;

use App\Events\MatchFound;
use App\Models\Game;
use App\Models\Matchmaking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MatchmakingJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        $requests = Matchmaking::orderBy('created_at', 'asc')->get();
        foreach ($requests as $request) {
            $opponent = Matchmaking::where('user_id', '!=', $request->user_id)
                ->whereBetween('rating', [$request->rating - 100, $request->rating + 100])
                ->orderBy('created_at', 'asc')
                ->first();

            if ($opponent) {
                $game = Game::create([
                    'player_white_id' => $request->user_id,
                    'player_black_id' => $opponent->user_id,
                    'started_at' => now(),
                ]);

                broadcast(new MatchFound($game));

                $request->delete();
                $opponent->delete();
            }
        }
    }
}
