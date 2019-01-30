<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $table = 'goals';
    protected $guarded = [];
    protected $attributes = [
    	'active' => 1,
    ];

    public function users(){
    	return $this->belongsToMany('App\User');
    }

    public function posts(){
    	return $this->belongsToMany('App\Post');
    }
}
