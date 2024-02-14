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

    // CRUD WEB

    public function indexWeb()
    {
        $ingredients = Ingredient::all();
        return view('ingredients.index', ['ingredients' => $ingredients]);
    }

    public function searchCrudWeb(Request $request)
    {
        $search = $request->search;
        $ingredients = Ingredient::when(!empty($search), function ($query) use ($search) {
                                            $query->where('nom', 'LIKE', "%{$search}%");
                                        })->get();
        return view('ingredients.index', ['ingredients' => $ingredients]);
    }

    public function showWeb(string $id)
    {
        $ingredient = Ingredient::find($id);
        return view('ingredients.show', ['ingredient' => $ingredient]);
    }

    public function storeShowWeb()
    {
        return view('ingredients.create');
    }

    public function storeWeb(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'gluten' => 'boolean',
            'lactosa' => 'boolean',
            'fruits_secs' => 'boolean',
            'vegetariana' => 'boolean',
            'vegana' => 'boolean',
        ]);

        $ingredient = new Ingredient();
        $ingredient->nom = $request->nom;
        $ingredient->gluten = $request->gluten ? true : false;
        $ingredient->lactosa = $request->lactosa ? true : false;
        $ingredient->fruits_secs = $request->fruits_secs ? true : false;
        $ingredient->vegetariana = $request->vegetariana ? true : false;
        $ingredient->vegana = $request->vegana ? true : false;
        $ingredient->save();

        return redirect()->route('ingredientsIndex')->with('success', 'Ingredient creat correctament');
    }

    public function updateWeb(Request $request, string $id)
    {

        $request->validate([
            'nom' => 'required|string',
            'gluten' => 'boolean',
            'lactosa' => 'boolean',
            'fruits_secs' => 'boolean',
            'vegetariana' => 'boolean',
            'vegana' => 'boolean',
        ]);

        $ingredient = Ingredient::find($id);
        $ingredient->nom = $request->nom;
        $ingredient->gluten = $request->gluten ? true : false;
        $ingredient->lactosa = $request->lactosa ? true : false;
        $ingredient->fruits_secs = $request->fruits_secs ? true : false;
        $ingredient->vegetariana = $request->vegetariana ? true : false;
        $ingredient->vegana = $request->vegana ? true : false;
        $ingredient->save();

        return redirect()->route('ingredientsIndex')->with('success', 'Ingredient actualitzat correctament');
    }

    public function destroyWeb(Request $request, string $id)
    {
        $ingredient = Ingredient::findOrFail($id);
        if($ingredient){
            $ingredient->delete();
            $msg = 'Ingredient eliminat correctament';
        } else {
            $msg = 'No s\'ha pogut eliminar l\'ingredient';
        }

        return redirect()->route('ingredientsIndex')->with('success', $msg);
    }
}
