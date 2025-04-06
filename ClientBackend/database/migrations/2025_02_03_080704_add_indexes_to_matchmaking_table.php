<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('matchmaking', function (Blueprint $table) {
            $table->index('user_id', 'matchmaking_user_id_index');
            $table->index('rating', 'matchmaking_rating_index');
            $table->index('created_at', 'matchmaking_created_at_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('matchmaking', function (Blueprint $table) {
            $table->dropIndex('matchmaking_user_id_index');
            $table->dropIndex('matchmaking_rating_index');
            $table->dropIndex('matchmaking_created_at_index');
        });
    }
};
