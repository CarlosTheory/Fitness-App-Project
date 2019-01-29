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

    public function addGoal(Request $request){
    	$rules = [
    		"name" => "required",
    		"user_id" => "required",
    	];

    	$customMessage = ["required" => "Estos campos son necesarios :attribute"];
    	$this->validate($request, $rules, $customMessage);

    	try{
    		$name = $request->input("name");
    		$description = $request->input("description");
    		$user_id = $request->input('user_id');

    		$goal = UserGoal::create([
    			'name' => $name,
    			'description' => $description,
    			'user_id' => $user_id
    		]);

    		$goal->save();

    		return response()->json(['Meta agregada' => true], 201);
    	}catch(\Illuminate\Database\QueryException $ex){
        $response['status'] = false;
        $response['message'] = $ex->getMessage();

        return response($response, 500);
      }

    }
}
