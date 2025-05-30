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
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

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
        $lock = Cache::lock('matchmaking_lock', 10);

        if ($lock->get()) {
            try {
                Matchmaking::orderBy('created_at', 'asc')->chunk(100, function ($requests) {
                    $processedUserIds = [];

                    foreach ($requests as $request) {
                        $opponent = DB::table('matchmaking as m1')
                            ->join('matchmaking as m2', function ($join) use ($request) {
                                $join->on('m1.user_id', '!=', 'm2.user_id')
                                    ->whereBetween('m2.rating', [$request->rating - 100, $request->rating + 100]);
                            })
                            ->where('m1.user_id', $request->user_id)
                            ->orderBy('m2.created_at', 'asc')
                            ->select('m2.user_id as opponent_id')
                            ->first();

                        if ($opponent) {
                            DB::transaction(function () use ($request, $opponent) {
                                $game = Game::create([
                                    'player_white_id' => $request->user_id,
                                    'player_black_id' => $opponent->opponent_id,
                                    'started_at' => now(),
                                ]);

                                broadcast(new MatchFound($game));
                            });

                            $processedUserIds[] = $request->user_id;
                            $processedUserIds[] = $opponent->opponent_id;
                        }
                    }

                    if (!empty($processedUserIds)) {
                        Matchmaking::whereIn('user_id', $processedUserIds)->delete();
                    }
                });
            } finally {
                $lock->release();
            }
        }
    }
}
