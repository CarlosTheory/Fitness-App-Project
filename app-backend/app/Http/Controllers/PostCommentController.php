<?php

namespace App\Http\Controllers;

use App\PostComment;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addComment(Request $request)
    {
        $rules = [
            "body" => "required",
            "user_id" => "required",
            "post_id" => "required",
        ];

        $customMessage = ["required" => "Esto es obligatorio :attribute"];

        try{
            $body = $request->input("body");
            $user_id = $request->input("user_id");
            $post_id = $request->input("post_id");

            $comment = PostComment::create([
                "body" => $body,
                "user_id" => $user_id,
                "post_id" => $post_id,
            ]);

            $comment->save();

            return response()->json(["Comentario agregado" => true, 201]);
        }catch(\Illuminate\Database\QueryException $ex){
            return response()->json(["No agreagado" => false, 500]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PostComment  $postComment
     * @return \Illuminate\Http\Response
     */
    public function show(PostComment $postComment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PostComment  $postComment
     * @return \Illuminate\Http\Response
     */
    public function edit(PostComment $postComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PostComment  $postComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PostComment $postComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PostComment  $postComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(PostComment $postComment)
    {
        //
    }
}
