<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    use HasFactory;

    public $guarded =[];


    protected $casts =[
        'created_at'=> 'date:Y-m-d',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function annonce(){
        return $this->belongsTo(Terrain::class);
    }
}
