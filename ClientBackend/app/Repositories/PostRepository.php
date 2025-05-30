<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepository extends BaseRepository
{
    public $model;

    public function __construct(Post $post)
    {
        $this->model = $post;
    }

    public function all()
    {
        $posts = $this->model
            ->orderBy('view', 'desc')
            ->get();
        $postIds = $posts->pluck('id')->toArray();

        Post::whereIn('id', $postIds)->increment('view');

        return $posts;
    }

}