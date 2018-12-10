<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserBodyDetail extends Model
{
    protected $table = 'user_body_details';
    protected $guarded = [];
    protected $attributes = [
    	'active' = 1;
    ];
}
