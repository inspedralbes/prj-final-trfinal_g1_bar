<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Restaurant;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $categories = Categoria::where('restaurant_id', $id)->get();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar els camps
        $request->validate([
            'nom' => 'required|string',
            'imatge' => 'required|string',
            'restaurant_id' => 'required|integer|exists:restaurants,id'
        ]);

        // Validar que l'usuari sigui administrador del restaurant
        $restaurant = Restaurant::find($request->restaurant_id);
        if ($request->user()->restaurant_id != $restaurant->id) {
            return response()->json(['error' => 'No tens permisos per crear categories en aquest restaurant'], 403);
        }

        // Crear la categoria
        $categoria = new Categoria();
        $categoria->nom = $request->nom;
        $categoria->imatge = $request->imatge;
        $categoria->restaurant_id = $request->restaurant_id;
        $categoria->save();

        return response()->json($categoria, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validar els camps
        $request->validate([
            'nom' => 'required|string',
            'imatge' => 'required|string'
        ]);

        // Validar que l'usuari sigui administrador del restaurant
        $categoria = Categoria::find($id);
        if ($request->user()->restaurant_id != $categoria->restaurant_id) {
            return response()->json(['error' => 'No tens permisos per editar categories en aquest restaurant'], 403);
        }

        // Actualitzar la categoria
        $categoria->nom = $request->nom;
        $categoria->imatge = $request->imatge;
        $categoria->save();

        return response()->json($categoria, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Validar que l'usuari sigui administrador del restaurant
        $categoria = Categoria::find($id);
        if (auth()->user()->restaurant_id != $categoria->restaurant_id) {
            return response()->json(['error' => 'No tens permisos per eliminar categories en aquest restaurant'], 403);
        }

        // Eliminar la categoria
        $categoria->delete();

        return response()->json(null, 204);
    }
}
