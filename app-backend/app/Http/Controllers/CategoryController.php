<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function register(Request $request){
        $rules = [
            'name' => 'required',
        ];

        $customMessage = ['required' => 'Por favor coloque el nombre de la categoria'];

        try{
            $name = $request->input('name');
            $description = $request->input('description');

            $category = category::create([
                'name' => $name,
                'description' => $description,
            ]);

            $response['status']=true;
            $response['message']="Categoria registrada";

            return response()->json(['success', 201]);

        }catch(Illuminate\Database\QueryException $ex){
            $response['status'] = false;
            $response['message'] = $ex->getMeesage();
            
            return response($response, 500);
        }
    }

    public function index(){
        $categories = Category::orderBy('name','asc')->get();
        return $categories;
    }
}
