<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MediaPost extends Model
{
    protected $table = 'media_posts';
    protected $guarded = [];
    protected $attributes = [
    	'active' = 1,
    ];
}
