<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tiquet;
use App\Models\Producte;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TiquetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar els inputs
        $request->validate([
            'restaurant_id' => 'required|integer|min:1',
            'nombre_taula' => 'required|integer|min:1',
        ]);

        // Comprovar que l'usuari està autoritzat per crear un tiquet per aquest restaurant
        if ($request->user()->restaurant_id != $request->restaurant_id) {
            return response()->json([
                'error' => 'User is not the administrator of this restaurant'
            ], 401);
        }

        // Crear un nou tiquet
        $tiquet = new Tiquet();
        $tiquet->restaurant_id = $request->restaurant_id;
        $tiquet->nombre_taula = $request->nombre_taula;
        $tiquet->save();

        return response()->json($tiquet);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tiquet = Tiquet::find($id);

        // Si el tiquet no existeix, retornem un error 404
        if (!$tiquet) {
            return response()->json([
                'error' => 'Tiquet not found'
            ], 404);
        }

        return response()->json($tiquet);
    }

    public function addItem(Request $request)
    {

        foreach ($request->all() as $req) {
            // Validar els inputs.
            Validator::make($req, [
                'tiquet_id' => 'required|integer|min:1',
                'producte_id' => 'required|integer|min:1',
                'quantitat' => 'required|integer|min:1',
                'user_id' => 'required|integer|min:1',
            ])->validate();

            // Comprovar que el tiquet i el producte existeixen
            $tiquet = Tiquet::find($req['tiquet_id']);
            if (!$tiquet) {
                return response()->json([
                    'error' => 'Tiquet not found'
                ], 404);
            }
            $producte = Producte::find($req['producte_id']);
            if (!$producte) {
                return response()->json([
                    'error' => 'Producte not found'
                ], 404);
            }
            
            // Comprovar que l'usuari està autoritzat per afegir un item a aquest tiquet
            if ($tiquet->restaurant_id != $request->user()->restaurant_id) {
                return response()->json([
                    'error' => 'User is not the administrator of this restaurant'
                ], 401);
            }

            // Crear un nou item al tiquet
            $tiquet->items()->attach($producte->id, [
                'quantitat' => $req['quantitat'],
                'user_id' => $req['user_id'],
            ]);
        }

        // Retorna el tiquet sencer
        return response()->json($tiquet);
    }

}
