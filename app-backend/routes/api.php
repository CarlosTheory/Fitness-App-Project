<?php 

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Users
Route::get('get/users', 'UserController@index');
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::group(['middleware' => 'auth:api'], function(){
	//User
	Route::post('details','UserController@details');
	
});
Route::post('update/{user_id}', 'UserController@update');	
//Posts
Route::post('cat/new', 'CategoryController@register');	
Route::get('posts', 'PostController@index');
Route::post('post/{user_id}/create/{category_id}', 'PostController@create');
Route::post('user/posts', 'PostController@getUserPosts');
Route::get('post/{id}', 'PostController@showSinglePost');

//Nope
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Goals
Route::get('goals', 'GoalController@getIndex');
Route::get('{user_id}/goal', 'GoalController@getUserGoals');
Route::get('{post_id}/goalpost', 'GoalController@getGoalsPost');
Route::get('{goal_id}/postgoal', 'GoalController@getPostGoals');
Route::post('add/goal', 'GoalController@addGoal');
Route::post('add/usergoal', 'GoalController@addUserGoal');
Route::post('add/postgoal', 'GoalController@addPostGoal');

//Categories
Route::get('categories', 'CategoryController@index');


//Posts
Route::get('posts/{id}', 'PostController@show'); 
Route::put('posts/{id}', 'PostController@update');
Route::delete('posts/{id}', 'PostController@delete');

//Comments
Route::post('add/comment', 'PostCommentController@addComment');
