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

    // protected $with = ['user', 'categories', 'media'];

    public function user(){
    	return $this->belongsTo('App\User', 'user_id');
    }

    public function media(){
        return $this->hasMany('App\MediaPost', 'post_id');
    }

    public function categories(){
    	return $this->belongsToMany('App\Category');
    }

    public function goals(){
        return $this->belongsToMany('App\Goal');
    }

    public function comments(){
        return $this->hasMany('App\PostComment');
    }
}
