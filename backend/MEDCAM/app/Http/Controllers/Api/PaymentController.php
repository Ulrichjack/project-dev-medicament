<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Services\PaymentService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    use ApiResponse;

    public function __construct(protected PaymentService $paymentService) {}

    public function simulate(Request $request, int $orderId)
    {
        try {
            $order = $this->paymentService->simulatePayment($orderId, $request->user());
            return $this->successResponse(new OrderResource($order), 'Paiement validé avec succès', 200);        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }
}
