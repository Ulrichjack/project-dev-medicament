<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable =[
        'name'
    ];

    public function medicaments(){
        return $this->hasMany(Medicament::class);
    }
}
