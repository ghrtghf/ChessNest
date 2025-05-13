<?php

namespace App\Services;

use App\Repositories\PostRepository;
use Illuminate\Support\Facades\Storage;

class PostService extends BaseService
{
    public $repo;

    public function __construct(PostRepository $postRepository)
    {
        $this->repo = $postRepository;
    }

    public function create(array $input)
    {
        if (isset($input['image'])) {
            $imagePath = $input['image']->store('public/images');

            $input['image_url'] = asset(Storage::url($imagePath));

            unset($input['image']);
        }
        $input['view'] = 0;
        return $this->repo->create($input);
    }
}