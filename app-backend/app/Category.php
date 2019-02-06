<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';

    protected $guarded = [];

   /* protected $attributes = [
    	'active' = 1,
    ]; */

    public function posts(){
    	return $this->belongsToMany('App\Post');
    }
}
