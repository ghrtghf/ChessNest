<?php

namespace App\Services;

use App\Repositories\UserRepository;

class AuthService extends BaseService
{
    public $repo;

    public function __construct(UserRepository $userRepository)
    {
        $this->repo = $userRepository;
    }

    public function register($request)
    {
        $user = $this->repo->create($request);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'access_token' => $token,
        ];
    }
}
