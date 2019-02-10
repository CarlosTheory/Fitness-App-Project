<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    protected $table = 'post_comments';
    protected $guarded = [];
    protected $attributes = [
    	'active' => 1,
    ];

    public function user(){
    	return $this->belongsTo('App\User');
    }

    public function post(){
    	return $this->belongsTo('App\Post');
    }
}
