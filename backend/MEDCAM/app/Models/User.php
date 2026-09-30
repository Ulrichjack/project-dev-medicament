<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens ,HasFactory, Notifiable , SoftDeletes;
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role',
        'pharmacy_id',
        'is_active'
    ];

    /**
     * The attributes that should be hidden for serialization.
     * (Les colonnes qu'on ne veut JAMAIS renvoyer dans l'API, ex: le mot de passe)
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // --- NOS METHODES DE VERIFICATION ---
   public function isClient(){
        return $this->role === "client";
    }

    public function isPharmacien(){
        return $this->role === "pharmacien";
    }

    public function isAdmin(){
        return $this->role === "admin";
    }

    public function pharmacy(){
        return $this->hasOne(Pharmacy::class);
    }

    // Remplace le nom de la fonction
    public function appNotifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

}

