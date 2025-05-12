<?php

namespace App\Services;

use App\Repositories\NotificationRepository;

class NotificationService extends BaseService
{
    public $repo;

    public function __construct(NotificationRepository $notificationRepository)
    {
        $this->repo = $notificationRepository;
    }

    public function all($id = null)
    {
        return $this->repo->all($id);
    }
}