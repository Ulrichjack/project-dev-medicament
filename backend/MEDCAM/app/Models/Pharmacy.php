<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Testing\Fluent\Concerns\Has;

class Pharmacy extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'license_number',
        'address',
        'email',
        'phone',
        'longitude',
        'latitude',
        'opening_hours',
        'is_open',
        'rating'
    ];
    protected $casts = [
        'opening_hours' => 'array' , 'is_open' => 'boolean'];

    public function stocks() {
        return $this->hasMany(PharmacyStock::class);
    }

}
