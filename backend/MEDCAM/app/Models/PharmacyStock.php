<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PharmacyStock extends Model
{
    protected $fillable = [
        'pharmacy_id',
        'medicament_id',
        'quantity',
        'price',
        'is_available',
        'min_stock_alert'
    ];

    public function pharmacy() {
        return $this->belongsTo(Pharmacy::class);
    }

    public function medicament() {
        return $this->belongsTo(Medicament::class);
    }
}
