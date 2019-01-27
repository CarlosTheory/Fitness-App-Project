<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'users';

    // protected $fillable = [
    //     'name', 'last_name', 'email', 'password', 'country', 'province', 'city', 'zip_code', 'phone', 'address', 'birthday', 'gender',
    // ];

    protected $guarded = [];

    protected $hidden = [
        'password', 'remember_token', 'active', 'api_token',
    ];

    protected $attributes = [
        'avatar' => 'user.jpg',
        'active' => 1,
    ];

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function goals(){
        return $this->hasMany('App\UserGoal');
    }

/*    public function details(){
        return $this->em
    }*/



    // /**
    //  * The attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected $fillable = [
    //     'name', 'email', 'password',
    // ];

    // /**
    //  * The attributes that should be hidden for arrays.
    //  *
    //  * @var array
    //  */
    // protected $hidden = [
    //     'password', 'remember_token',
    // ];
}
