<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService extends BaseService
{
    public $repo;

    public function __construct(UserRepository $userRepository)
    {
        $this->repo = $userRepository;
    }

    public function findByName($nickname)
    {
        if (empty($nickname)) {
            return collect();
        }

        return $this->repo->findByName($nickname);
    }

    public function stats($period)
    {

    }
}
