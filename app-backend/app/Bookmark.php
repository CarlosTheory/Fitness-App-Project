<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    protected $table = "bookmarks";

    protected $guarded = [];

        protected $attributes = [
    	'active' => 1,
    ]; 

    public function user(){
    	return $this->belongsYo('App\User');
    }
}
