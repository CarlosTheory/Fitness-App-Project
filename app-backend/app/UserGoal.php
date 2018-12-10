<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserGoal extends Model
{
    protected $table = 'user_goals';
    protected $guarded = [];
    protected $attributes = [
    	'active' = 1,
    ];
}
