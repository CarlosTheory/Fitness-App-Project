<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bookmark;

class BookmarkController extends Controller
{
    public function addBookmark(Request $request){
    	$rules = [
    		'user_id',
    		'post_id',
    		'title',
    	];

    	$customMessage = ['required' => 'Por favor coloque :attribute'];

    	try{
    		$user_id = $request->input('user_id');
    		$post_id = $request->input('post_id');
    		$post_id = $request->input('title');

    		$boomark = bookmark::create([
    			'user_id' => $user_id,
    			'title' => $title,
    			'post_id' => $post_id,
    		]);


            return response()->json(['Bookmark agregado', 201]);
    	}catch(Illuminate\Database\QueryException $ex){
            $response['status'] = false;
            $response['message'] = $ex->getMeesage();
            
            return response($response, 500);
        }
    }
}
