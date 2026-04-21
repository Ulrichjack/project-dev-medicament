<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    //
    protected $fillable = [
        'order_id',
        'medicament_id',
        'quantity',
        'unit_price',
    ];

    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function medicament(){
        return $this->belongsTo(Medicament::class);
    }

}
