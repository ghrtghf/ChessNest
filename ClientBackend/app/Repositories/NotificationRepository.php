<?php

namespace App\Repositories;

use App\Models\Notification;

class NotificationRepository extends BaseRepository
{
    public $model;

    public function __construct(Notification $notification)
    {
        $this->model = $notification;
    }

    public function all($id = null)
    {
        $notification = $this->model
            ->wheres('id', $id)
            ->orderBy($this->sortBy, $this->sortOrder)
            ->get();

        $notification->update(['is_read' => true]);
        $notification->save();

        return $notification;
    }
}