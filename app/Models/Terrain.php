<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Terrain extends Model
{
    use HasFactory;

    public $guarded = [];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function annonces(){
        return $this->hasMany(Annonce::class);
    }
}
