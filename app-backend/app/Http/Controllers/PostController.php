<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function index(){

        $posts = Post::with('user:id,name,last_name')->get();

        return $posts;
        // $posts = Post::all();

        // $posts->each(function($post) foreach($posts as $post){
        //     return response->json(['post' => $post]);
        // });

    	//return Post::all();
    }

    public function show($id){
    	return Post::find($id);
    }

    public function create(Request $request, $user_id){
        $rules = [
            'title' => 'required',
            'body' => 'required',
        ];

        $customMessage = ['required' => 'Por favor rellene :attribute'];
        $this->validate($request, $rules, $customMessage);

        try{
            $title = $request->input('title');
            $body = $request->input('body');

            $post = post::create([
                'title' => $title,
                'body' => $body,
                'user_id' => $user_id,
            ]);

            $success['status'] = true;
            $response['message'] = 'Entrada agregada';

            return response()->json(['success' => $success], 201);

            }catch(\Illuminate\Database\QueryException $ex){
                $response['status'] = false;
                $response['message'] = $ex->getMessage();

                return response($response, 500);
            }
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
