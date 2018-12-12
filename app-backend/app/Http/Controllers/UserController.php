<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
//use Validator;

class UserController extends Controller
{

    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')]))
        {
            $user = Auth::user();
            $success['token'] = $user->createToken('FitnessApp')->accessToken;

            return response()->json(['success' => $success], 200);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function index(){
    	return User::all();
    }

    public function show($id){
    	return User::find($id);
    }

    public function register(Request $request){
    	$rules = [
          'name' => 'required',
          'last_name' => 'required',
          'email' => 'required',
          'password' => 'required',
          'country' => 'required',
          'province' => 'required',
          'city' => 'required',
          'zip_code' => 'required',
          'address' => 'required',
          'birthday' => 'required',
          'gender' => 'required',
        ];

        $customMessage = ['required' => 'Por favor rellene todos los :attribute'];

        //Validate required values
        $this->validate($request, $rules, $customMessage);

        try{
          $name = $request->input('name');
          $last_name = $request->input('last_name');
          $email = $request->input('email');
          $password = $request->input('password');
          $country = $request->input('country');
          $province = $request->input('province');
          $city = $request->input('city');
          $zip_code = $request->input('zip_code');
          $phone = $request->input('phone');
          $address = $request->input('address');
          $birthday = $request->input('birthday');
          $gender = $request->input('gender');

          $user = user::create([
            'name' => $name,
            'last_name' => $last_name,
            'email' => $email,
            'password' => Hash::make($password),
            'country' => $country,
            'province' => $province,
            'city' => $city,
            'zip_code' => $zip_code,
            'phone' => $phone,
            'address' => $address,
            'birthday' => $birthday,
            'gender' => $gender,
          ]);

          $success['token'] = $user->createToken('FitnessApp')->accessToken;
          $success['email'] = $user->email;

          $response['status'] = true;
          $response['message'] = 'Registro exitoso';

          return response()->json(['success' => $success], 201);

        }catch(\Illuminate\Database\QueryException $ex){
          $response['status'] = false;
          $response['message'] = $ex->getMessage();

          return response($response, 500);
        } 

    }	

    public function details(){
      $user = Auth::user();
      return response()->json(['success' => $user, 200]);
    }

    public function update(Request $request, $user_id){
    	$user = User::findOrFail($user_id);
    	$user->update($request->all());

    	return $user;
    }
}
