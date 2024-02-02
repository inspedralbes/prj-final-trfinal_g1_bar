<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producte;
use App\Models\Categoria;

class ProductesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $productes = Categoria::find($id)->productes;
        return response()->json($productes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar els camps
        $request->validate([
            'nom' => 'required|string',
            'descripcio' => 'required|string',
            'preu' => 'required|numeric',
            'imatge' => 'required|string',
            'actiu' => 'required|boolean',
            'categories' => 'required|array',
        ]);

        // Validar que l'usuari sigui administrador del restaurant
        $categoria = Categoria::find($request->categories[0]);
        if ($request->user()->restaurant_id != $categoria->restaurant_id) {
            return response()->json(['error' => 'No tens permisos per crear productes en aquest restaurant'], 403);
        }

        // Validar que les categories siguin del mateix restaurant
        foreach ($request->categories as $categoria_id) {
            $categoria = Categoria::find($categoria_id);
            if ($categoria->restaurant_id != $request->user()->restaurant_id) {
                return response()->json(['error' => 'No pots afegir categories d\'altres restaurants'], 403);
            }
        }

        // Crear el producte
        $producte = new Producte();
        $producte->nom = $request->nom;
        $producte->descripcio = $request->descripcio;
        $producte->preu = $request->preu;
        $producte->imatge = $request->imatge;
        $producte->actiu = $request->actiu;
        $producte->save();

        // Afegir el producte a les categories
        $producte->categories()->attach($request->categories);

        return response()->json($producte, 201);
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
            'descripcio' => 'required|string',
            'preu' => 'required|numeric',
            'imatge' => 'required|string',
            'actiu' => 'required|boolean',
            'categories' => 'required|array',
        ]);

        // Validar que l'usuari sigui administrador del restaurant
        $producte = Producte::find($id);
        if ($request->user()->restaurant_id != $producte->categories[0]->restaurant_id) {
            return response()->json(['error' => 'No tens permisos per editar productes en aquest restaurant'], 403);
        }

        // Validar que les categories siguin del mateix restaurant
        foreach ($request->categories as $categoria_id) {
            $categoria = Categoria::find($categoria_id);
            if ($categoria->restaurant_id != $request->user()->restaurant_id) {
                return response()->json(['error' => 'No pots afegir categories d\'altres restaurants'], 403);
            }
        }

        // Actualitzar el producte
        $producte->nom = $request->nom;
        $producte->descripcio = $request->descripcio;
        $producte->preu = $request->preu;
        $producte->imatge = $request->imatge;
        $producte->actiu = $request->actiu;
        $producte->save();

        // Actualitzar les categories del producte
        $producte->categories()->sync($request->categories);

        return response()->json($producte, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Validar que l'usuari sigui administrador del restaurant
        $producte = Producte::find($id);
        if (auth()->user()->restaurant_id != $producte->categories[0]->restaurant_id) {
            return response()->json(['error' => 'No tens permisos per eliminar productes en aquest restaurant'], 403);
        }

        // Eliminar el producte
        $producte->delete();

        return response()->json(null, 204);
    }
}
