<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Review;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    //
    use ApiResponse;

        public function store(Request $request)
        {
            $data = $request->validate([
                'order_id' => 'required|exists:orders,id',
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'nullable|string'
            ]);

            $order = Order::where('id', $data['order_id'])
                      ->where('user_id', $request->user()->id)
                      ->firstOrFail();

            if ($order->status !== 'delivered') {
            return $this->errorResponse("Vous ne pouvez pas noter une commande tant qu'elle n'est pas livrée.", 400);
        }

             $review = Review::create([
            'order_id' => $order->id,
            'user_id' => $request->user()->id,
            'pharmacy_id' => $order->pharmacy_id,
            'rating' => $data['rating'],
            'comment' => $data['comment']
            ]);

            return $this->successResponse($review, 'Avis créé avec succès', 201);
        }
}
