<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'pharmacy_id',
        'total_amount',
        'delivery_fee',
        'tax_amount',
        'discount_code',
        'status',
        'delivery_address',
        'delivery_latitude',
        'delivery_longitude',
        'notes',
        'delivered_at',

    ];


    public function user(){

        return $this->belongsTo(User::class);
    }

    public function pharmacy(){
        return $this->belongsTo(Pharmacy::class);
    }

    public function items(){
        return $this->hasMany(OrderItem::class);
    }

    public function payment(){
        return $this->hasOne(Payment::class);
    }

    public function delivery(){
        return $this->hasOne(Delivery::class);
    }

    public function prescription(){
        return $this->hasOne(Prescription::class);
    }

}
