<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function index(){
    	return Post::all();
    }

    public function show($id){
    	return Post::find($id);
    }

    public function store(Request $request){
    	return Post::create($request->all());
    }

    public function update(Request $request, $id){
    	$post = Post::findOrFail($id);
    	$post->update($request->all());

    	return $post;
    }

    public function delete(Request $request, $id){
    	$post = Post::findOrFail($id);
    	$post->delete();

    	return 204; 
    }	
}
