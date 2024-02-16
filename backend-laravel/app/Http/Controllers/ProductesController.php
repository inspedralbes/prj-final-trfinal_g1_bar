<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producte;
use App\Models\Categoria;
use App\Models\Ingredient;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ProductesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $productes = Categoria::find($id)->productes->load('categories', 'ingredients');
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
            'ingredients' => 'required|array',
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

        // Afegir els ingredients al producte
        $producte->ingredients()->attach($request->ingredients);

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
            'ingredients' => 'required|array',
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

        // Actualitzar els ingredients del producte
        $producte->ingredients()->sync($request->ingredients);

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

    //CRUD
    public function indexWeb()
    {
        $productes = Producte::all();
        $allProductes = Producte::all();
        return view('productes.index', ['productes' => $productes, 'allProductes' => $allProductes]);
    }

    public function searchCrudWeb(Request $request)
    {
        $search = $request->search;
        $productes = Producte::when(!empty($search), function ($query) use ($search) {
            $query->where('nom', 'LIKE', "%{$search}%");
        })->get();
        $allProductes = Producte::all();
        return view('productes.index', ['productes' => $productes, 'allProductes' => $allProductes]);
    }

    public function showWeb(string $id)
    {
        $producte = Producte::find($id);

        $linkedCategories = $producte->categories;
        $allCategories = Categoria::all();

        $linkedIngredients = $producte->ingredients;
        $allIngredients = Ingredient::all();

        return view('productes.show', ['producte' => $producte, 'linkedCategories' => $linkedCategories, 'allCategories' => $allCategories, 'linkedIngredients' => $linkedIngredients, 'allIngredients' => $allIngredients]);
    }

    public function storeShowWeb()
    {
        $categories = Categoria::all();
        $ingredients = Ingredient::all();
        return view('productes.create', ['categories' => $categories, 'ingredients' => $ingredients]);
    }

    public function storeWeb(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'actiu' => 'boolean', // 'actiu' => 'required|boolean
            'descripcio' => 'required|string',
            'preu' => 'required|numeric',
            'imatge' => 'required|string',
            'categories' => 'required|array',
            'ingredients' => 'required|array',
            'image' => 'required',
        ]);

        // Guardar la imatge
        $nameImage = $request->file('image')->getClientOriginalName();
        $request->image->move(public_path('img'), $nameImage);

        $producte = new Producte();
        $producte->nom = $request->nom;
        $producte->actiu = $request->actiu ? true : false;
        $producte->descripcio = $request->descripcio;
        $producte->preu = $request->preu;
        $producte->imatge = $nameImage;
        $producte->save();
        
        $producte->categories()->attach($request->categories);
        $producte->ingredients()->attach($request->ingredients);

        return redirect()->route('productesIndex')->with('success', 'Producte creat correctament');
    }

    public function updateWeb(Request $request, string $id)
    {
        $request->validate([
            'nom' => 'required',
            'descripcio' => 'required',
            'preu' => 'required',
            'imatge' => 'required',
            'esActiu' => 'boolean',
            'categories' => 'required|array',
            'ingredients' => 'required|array',
        ]);

        $producte = Producte::find($id);
        $producte->nom = $request->nom;
        $producte->descripcio = $request->descripcio;
        $producte->preu = $request->preu;
        $producte->imatge = $request->imatge;
        $producte->actiu = $request->esActiu ? true : false;

        $producte->save();

         $producte->categories()->sync($request->input('categories'));
        $producte->ingredients()->sync($request->input('ingredients'));

        return redirect()->route('productesIndex')->with('success', 'Producte actualitzat correctament');
    }

    public function destroyWeb(Request $request, string $id)
    {
        $msg = "Producte eliminat correctament";
        /* if($request->eliminar_preg){
            Pregunta::where('categoria_id', $id)->delete();
            $msg = 'Categoria i preguntes adherides eliminades correctament';
        } */
        Producte::findOrFail($id)->delete();

        return redirect()->route('productesIndex')->with('success', $msg);
    }
}
