<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Category;
use App\MediaPost;
use App\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class PostController extends Controller
{
    public function index(){

        $posts = Post::orderBy('id','desc')->with(['user', 'categories', 'media'])->get();
        //$posts = Post::with(['user', 'categories', 'media'])->orderBy({})
        return $posts;
    }

    public function getUserPosts(Request $request){
        $user_id = $request->input("user_id");
        $posts = User::find($user_id)->posts()->get();

        return $posts;
    }

    public function show($id){
    	return Post::find($id);
    }

    public function create(Request $request, $user_id, $category_id){
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
            
            $post_id = $post->id;

            $post->save();
            $category = Category::find($category_id);
            $post->categories()->attach($category); 
            

            $media_file = $request->file('media');
            $extension = $media_file->getClientOriginalExtension();
            Storage::disk('public')->put($media_file->getFilename().'.'.$extension,  File::get($media_file));

            $media_url = $media_file->getFilename().'.'.$extension;
            $media = new MediaPost([
                'name' => $media_url,
                'url' => $media_url,
            ]);

            $post = Post::find($post_id);
            $post->media()->save($media);

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
