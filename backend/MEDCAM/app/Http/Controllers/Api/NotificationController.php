<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    //

    use ApiResponse;

    public function index(Request $request):JsonResponse{
        $user = $request->user();
        $notifications = $user->appNotifications()->latest()->get();
        return $this->successResponse($notifications, 'Notifications récupérées', 200);
    }

        public function markAsRead(Request $request, int $notificationId):JsonResponse{
            $user = $request->user();

            $notification = $user->appNotifications()->where('id', $notificationId)->firstOrFail();            $notification->update(['is_read' => true]);

            return $this->successResponse($notification, 'Notification marquée comme lue', 200);
        }
}
