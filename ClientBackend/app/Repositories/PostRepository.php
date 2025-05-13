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
        return $this->model
            ->orderBy('view')
            ->get();
    }

}