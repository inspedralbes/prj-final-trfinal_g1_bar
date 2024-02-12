<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producte;
use App\Models\Categoria;
use Illuminate\Support\Facades\DB;

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
         return view('productes.index', ['productes' => $productes]);
     }
 
     public function searchCrudWeb(Request $request)
     {
         $search = $request->search;
         $productes = Producte::when(!empty($search), function ($query) use ($search) {
                                     $query->where('nom', 'LIKE', "%{$search}%");
                                 })->get();
         return view('productes.index', ['productes' => $productes]);
     }
 
     public function showWeb(string $id)
     {    
         $producte = Producte::find($id);

         $categoria_id = DB::table('productes')
         ->join('categoria_producte', 'productes.id', '=', 'categoria_producte.producte_id')
         ->where('productes.id', '=', $id)
         ->select('categoria_producte.categoria_id')
         ->get();

         $producte->categoria_id = $categoria_id[0]->categoria_id;
         
         $categories = Categoria::all();

         return view('productes.show', ['producte' => $producte, 'categories' => $categories]);
     }

     public function storeShowWeb()
     {
        $categories = Categoria::all();
        return view('productes.create', ['categories' => $categories]);
     }

     public function storeWeb(Request $request)
     {
         $request->validate([
             'nom' => 'required',
             'categoria' => 'required',
             'descripcio' => 'required',
             'preu' => 'required',
             'imatge' => 'required',
         ]);
         $producte = new Producte();
         $producte->nom = $request->nom;
         $producte->categoria = $request->categoria;
         $producte->descripcio = $request->descripcio;
         $producte->preu = $request->preu;
         $producte->imatge = $request->imatge;
         $producte->actiu = 1;
         $producte->save();
 
         return redirect()->route('productesIndex')->with('success', 'Producte creat correctament');
     }

     public function updateWeb(Request $request, string $id)
     {
         $request->validate([
            'nom' => 'required',
            'descripcio' => 'required',
            'preu' => 'required',
            'imatge' => 'required',
         ]);

         $producte = Producte::find($id);
         $producte->nom = $request->nom;
         $producte->nom = $request->nom;
         $producte->descripcio = $request->descripcio;
         $producte->preu = $request->preu;
         $producte->imatge = $request->imatge;

         if (!$request->esActiu) {
            $producte->actiu = 0;
         } else {
            $producte->actiu = 1;
         }
         
         $producte->save();
 
         return redirect()->route('productesIndex')->with('success', 'Producte actualitzat correctament');
     }
     
     public function destroyWeb(Request $request, string $id)
     {
         $msg ="Producte eliminat correctament";
         /* if($request->eliminar_preg){
             Pregunta::where('categoria_id', $id)->delete();
             $msg = 'Categoria i preguntes adherides eliminades correctament';
         } */
         Producte::findOrFail($id)->delete();
 
         return redirect()->route('productesIndex')->with('success', $msg);
     }
}
