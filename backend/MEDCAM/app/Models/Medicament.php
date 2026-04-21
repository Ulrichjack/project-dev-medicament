<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medicament extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'category_id',
        'name',
        'active_substance',
        'description',
        'dosage',
        'prescription_required',
        'photo_url',
        'manufacturer'
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function stocks(){
        return $this->hasMany(PharmacyStock::class);
    }
}
