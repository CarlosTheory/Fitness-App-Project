<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Goal;
use App\User;
use App\Post;

class GoalController extends Controller
{
		public function getIndex(){
			$goals = Goal::orderBy('name')->get();

			return $goals;
		}

    public function getUserGoals($user_id){
    	$goals = User::find($user_id)->goals()->orderBy('name')->get();
    	//$goals = Goal::where('user_id', $user_id)->with('users')->get();
    	if(sizeof($goals) == 0){
    	 	return response()->json(['No tiene metas registradas.']);
    	 }else{
    	 	return $goals;
    	 }
    }

    public function getGoalsPost($post_id){
        $goals = Post::find($post_id)->goals()->orderBy('name')->get();
        //$goals = Goal::where('user_id', $user_id)->with('users')->get();
        if(sizeof($goals) == 0){
            return response()->json(['No tiene metas registradas.']);
         }else{
            return $goals;
         }
    }

    public function addUserGoal(Request $request){
    	$rules = [
    		"user_id" => "required",
    		"goal_id" => "required",
    	];

    	$customMessage=['required' => "Este campo es obligatorio :atribute"];
    	$this->validate($request, $rules, $customMessage);

    	try{
    		$goal_id = $request->input('goal_id');
    		$user_id = $request->input('user_id');

    		$user = User::find($user_id);
    		//$goal = Goal::find($goal_id);
    		//$goal->users()->attach($user_id);
    		$user->goals()->attach($goal_id);

    		return response()->json(['creado' => true, 201]);
    	}catch(\Illuminate\Database\QueryException $ex){
    		return response()->json(['creado' => false, 500]);
    	}
    }

    public function getPostGoals($goal_id){
    	$goals = Goal::find($goal_id)->posts()->orderBy('id','desc')->get();
    	//$goals = Goal::where('user_id', $user_id)->with('users')->get();
    	if(sizeof($goals) == 0){
    	 	return response()->json(['No tiene posts que mostrar.']);
    	 }else{
    	 	return $goals;
    	 }
    }

    public function addPostGoal(Request $request){
    	$rules = [
    		"post_id" => "required",
    		"goal_id" => "required",
    	];

    	$customMessage=['required' => "Este campo es obligatorio :atribute"];
    	$this->validate($request, $rules, $customMessage);

    	try{
    		$goal_id = $request->input('goal_id');
    		$post_id = $request->input('post_id');

    		$post = Post::find($post_id);
    		//$goal = Goal::find($goal_id);
    		//$goal->users()->attach($user_id);
    		$post->goals()->attach($goal_id);

    		return response()->json(['creado' => true, 201]);
    	}catch(\Illuminate\Database\QueryException $ex){
    		return response()->json(['creado' => false, 500]);
    	}
    }


    public function addGoal(Request $request){
    	$rules = [
    		"name" => "required",
    	];

    	$customMessage = ["required" => "Estos campos son necesarios :attribute"];
    	$this->validate($request, $rules, $customMessage);

    	try{
    		$name = $request->input("name");
    		$description = $request->input("description");
    		$user_id = $request->input('user_id');

    		$goal = Goal::create([
    			'name' => $name,
    			'description' => $description,
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
