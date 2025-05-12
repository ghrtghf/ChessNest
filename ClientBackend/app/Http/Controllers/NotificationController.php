<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(NotificationService $notificationService)
    {
        $this->service = $notificationService;
    }

    public function index()
    {
        $response = $this->service->all(Auth::id());

        return $this->success(['notifications' => $response], 201);
    }

    public function show($id)
    {

    }

    public function store(Request $request)
    {
        $response = $this->service->create($request->all());

        return $this->success(['notifications' => $response], 201);
    }
}
