<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producte;
use App\Models\Ingredient;

class IngredientsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Ingredient::all();
    }

    public function indexPerProducte($id)
    {
        $ingredients = Producte::find($id)->ingredients;
        return response()->json($ingredients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar els camps
        $request->validate([
            'nom' => 'required|string',
            'gluten' => 'required|boolean',
            'lactosa' => 'required|boolean',
            'fruits_secs' => 'required|boolean',
            'vegetariana' => 'required|boolean',
            'vegana' => 'required|boolean',
        ]);

        // Validar que l'usuari sigui administrador d'algun restaurant
        if ($request->user()->restaurant_id == null) {
            return response()->json(['error' => 'No tens permisos per crear ingredients'], 403);
        }

        // Crear l'ingredient
        $ingredient = new Ingredient();
        $ingredient->nom = $request->nom;
        $ingredient->gluten = $request->gluten;
        $ingredient->lactosa = $request->lactosa;
        $ingredient->fruits_secs = $request->fruits_secs;
        $ingredient->vegetariana = $request->vegetariana;
        $ingredient->vegana = $request->vegana;
        $ingredient->save();

        return response()->json($ingredient, 201);
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
            'gluten' => 'required|boolean',
            'lactosa' => 'required|boolean',
            'fruits_secs' => 'required|boolean',
            'vegetariana' => 'required|boolean',
            'vegana' => 'required|boolean',
        ]);

        // Validar que l'usuari sigui administrador d'algun restaurant
        if ($request->user()->restaurant_id == null) {
            return response()->json(['error' => 'No tens permisos per editar ingredients'], 403);
        }

        // Actualitzar l'ingredient
        $ingredient = Ingredient::find($id);
        $ingredient->nom = $request->nom;
        $ingredient->gluten = $request->gluten;
        $ingredient->lactosa = $request->lactosa;
        $ingredient->fruits_secs = $request->fruits_secs;
        $ingredient->vegetariana = $request->vegetariana;
        $ingredient->vegana = $request->vegana;
        $ingredient->save();

        return response()->json($ingredient, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Validar que l'usuari sigui administrador d'algun restaurant
        if (auth()->user()->restaurant_id == null) {
            return response()->json(['error' => 'No tens permisos per eliminar ingredients'], 403);
        }

        // Eliminar l'ingredient
        $ingredient = Ingredient::find($id);
        $ingredient->delete();

        return response()->json(null, 204);
    }
}
