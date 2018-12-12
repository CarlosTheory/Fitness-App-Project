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
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::group(['middleware' => 'auth:api'], function(){
	//User
	Route::post('details','UserController@details');
	Route::put('update/{user_id}', 'UserController@update');

	Route::post('post/{user_id}/create', 'PostController@create');
});

	//Posts
	
	Route::get('posts', 'PostController@index');


//Nope
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


//Posts
Route::get('posts/{id}', 'PostController@show'); 
Route::put('posts/{id}', 'PostController@update');
Route::delete('posts/{id}', 'PostController@delete');
