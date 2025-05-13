<?php

namespace App\Http\Controllers;

use App\Services\PostService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(PostService $postService)
    {
        $this->service = $postService;
    }

    public function index()
    {
        $response = $this->service->all();

        return $this->success($response, 201);
    }

    public function show($id)
    {
        $post = $this->service->find($id);

        return $this->success(['posts' => $post], 201);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'max:2048',
        ]);

        $post = $this->service->create($validated);

        return $this->success(['post' => $post], 201);
    }
}
