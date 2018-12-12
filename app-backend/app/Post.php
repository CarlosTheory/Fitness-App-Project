<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table= "posts";

    protected $guarded = [];

    protected $attributes = [
    	'active' => 1,
    ];

    protected $with = ['user'];

    public function user(){
    	return $this->belongsTo('App\User', 'user_id');
    }

    public function category(){
    	return $this->belongsToMany('App\Category');
    }
}
