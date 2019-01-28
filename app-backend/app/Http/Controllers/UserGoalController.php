<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserGoal;
use App\User;

class UserGoalController extends Controller
{
    public function getGoals($user_id){
    	$goals = UserGoal::where('user_id', $user_id)->get();

    	if(sizeof($goals) == 0){
    		return response()->json(['No tiene metas registradas.']);
    	}else{
    		return $goals;
    	}
    }
}
