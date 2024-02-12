<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tiquet;
use App\Models\Producte;
use Illuminate\Support\Facades\DB;
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
            'nombre_taula' => [
                'required',
                'integer',
                'min:1',
                Rule::unique('tiquets')->where(function ($query) use ($request) {
                    return $query->where('restaurant_id', $request->user()->restaurant_id);
                }),
            ],
            'link_qr' => 'required|string|unique:tiquets,link_qr'
        ]);

        // Comprovar que l'usuari està autoritzat per crear un tiquet per aquest restaurant
        if ($request->user()->restaurant_id != $request->restaurant_id) {
            return response()->json([
                'message' => 'User is not the administrator of this restaurant'
            ], 401);
        }

        // Crear un nou tiquet
        $tiquet = new Tiquet();
        $tiquet->restaurant_id = $request->restaurant_id;
        $tiquet->nombre_taula = $request->nombre_taula;
        $tiquet->link_qr = $request->link_qr;
        $tiquet->save();

        return response()->json($tiquet);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        $tiquet = Tiquet::find($id);

        // Si el tiquet no existeix, retornem un error 404
        if (!$tiquet) {
            return response()->json([
                'message' => 'Tiquet not found'
            ], 404);
        }

        return response()->json($tiquet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        // Validar els inputs
        $request->validate([
            'nombre_taula' => [
                'required',
                'integer',
                'min:1',
                Rule::unique('tiquets')->where(function ($query) use ($request) {
                    return $query->where('restaurant_id', $request->user()->restaurant_id);
                }),
            ],
            'link_qr' => 'required|string|unique:tiquets,link_qr'
        ]);

        // Comprovar que el tiquet existeix
        $tiquet = Tiquet::find($id);
        if (!$tiquet) {
            return response()->json([
                'message' => 'Tiquet not found'
            ], 404);
        }

        // Comprovar que l'usuari està autoritzat per editar el tiquet
        if ($request->user()->restaurant_id != $tiquet->restaurant_id) {
            return response()->json([
                'message' => 'User is not the administrator of this restaurant'
            ], 401);
        }

        // Actualitzar el tiquet
        $tiquet->nombre_taula = $request->nombre_taula;
        $tiquet->link_qr = $request->link_qr;
        $tiquet->save();

        return response()->json($tiquet);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id) {
        // Comprovar que el tiquet existeix
        $tiquet = Tiquet::find($id);
        if (!$tiquet) {
            return response()->json([
                'message' => 'Tiquet not found'
            ], 404);
        }

        // Comprovar que l'usuari està autoritzat per eliminar el tiquet
        if ($request->user()->restaurant_id != $tiquet->restaurant_id) {
            return response()->json([
                'message' => 'User is not the administrator of this restaurant'
            ], 401);
        }

        // Eliminar el tiquet
        $tiquet->delete();

        // Retorna un missatge d'èxit
        return response()->json([
            'message' => 'Tiquet deleted successfully'
        ]);
    }

    public function addItem(Request $request) {
        // Validar els inputs. 
        $request->validate([
            'tiquet_id' => 'required|integer|min:1',
            'producte_id' => 'required|integer|min:1',
            'quantitat' => 'required|integer|min:1',
            'comentari' => 'string|nullable'
        ]);

        // Comprovar que el tiquet i el producte existeixen
        $tiquet = Tiquet::find($request->tiquet_id);
        if (!$tiquet) {
            return response()->json([
                'message' => 'Tiquet not found'
            ], 404);
        }
        $producte = Producte::find($request->producte_id);
        if (!$producte) {
            return response()->json([
                'message' => 'Producte not found'
            ], 404);
        }

        // Get el id del user que ha fet la petició
        $user_id = $request->user()->id;

        // Crear un nou item al tiquet
        $tiquet->items()->attach($producte->id, [
            'quantitat' => $request->quantitat,
            'estat' => 'Pendent',
            'user_id' => $user_id,
            'comentari' => $request->comentari
        ]);

        // Retorna només el item que s'ha creat
        return response()->json($tiquet->items()->find($producte->id));
    }

    public function updateItem(Request $request, string $id)
    {
        // Validar els inputs. 
        $request->validate([
            'tiquet_id' => 'required|integer|min:1',
            'producte_id' => 'required|integer|min:1',
            'quantitat' => 'required|integer|min:1',
            'comentari' => 'string|nullable'
        ]);

        // Comprovar que el tiquet i el producte existeixen
        $tiquet = Tiquet::find($request->tiquet_id);
        if (!$tiquet) {
            return response()->json([
                'message' => 'Tiquet not found'
            ], 404);
        }
        $producte = Producte::find($request->producte_id);
        if (!$producte) {
            return response()->json([
                'message' => 'Producte not found'
            ], 404);
        }

        // Comprovar que el item existeix al tiquet
        $item = $tiquet->items()->where('item_tiquet.id', $id)->first();
        if (!$item) {
            return response()->json([
                'message' => 'Item not found'
            ], 404);
        }

        // Comprovar que el item està en estat 'Pendent'
        if ($item->pivot->estat != 'Pendent') {
            return response()->json([
                'message' => 'Item is not in state \'Pendent\''
            ], 400);
        }

        // Get el id del user que ha fet la petició
        $user_id = $request->user()->id;

        // Comprovar que l'usuari està autoritzat per editar el item
        if ($user_id != $item->pivot->user_id) {
            return response()->json([
                'message' => 'User is not the owner of this item'
            ], 401);
        }

        // Actualitzar el item al tiquet
        $tiquet->items()->newPivotStatement()->where('id', $id)->update([
            'quantitat' => $request->quantitat,
            'estat' => 'Pendent',
            'user_id' => $user_id,
            'comentari' => $request->comentari
        ]);

        // Retorna només el item que s'ha actualitzat
        return response()->json($tiquet->items()->where('item_tiquet.id', $id)->first());
    }

    public function updateItemEstat(Request $request, string $id) {
        // Validar els inputs.
        $request->validate([
            'tiquet_id' => 'required|integer|min:1',
            'producte_id' => 'required|integer|min:1',
            'estat' => 'required|string|in:Pendent,En Preparació,Entregat,Pagat'
        ]);

        // Comprovar que el tiquet i el producte existeixen
        $tiquet = Tiquet::find($request->tiquet_id);
        if (!$tiquet) {
            return response()->json([
                'message' => 'Tiquet not found'
            ], 404);
        }
        $producte = Producte::find($request->producte_id);
        if (!$producte) {
            return response()->json([
                'message' => 'Producte not found'
            ], 404);
        }

        // Comprovar que el item existeix al tiquet
        $item = $tiquet->items()->where('item_tiquet.id', $id)->first();
        if (!$item) {
            return response()->json([
                'message' => 'Item not found'
            ], 404);
        }

        // Get el id del user que ha fet la petició
        $user_id = $request->user()->id;

        // Comprovar que l'usuari està autoritzat per editar el item
        if ($request->user()->restaurant_id != $tiquet->restaurant_id) {
            return response()->json([
                'message' => 'User is not the administrator of this restaurant'
            ], 401);
        }

        // Actualitzar l'item al tiquet
        $tiquet->items()->newPivotStatement()->where('id', $id)->update([
            'quantitat' => $item->pivot->quantitat, // Mantenir la quantitat
            'comentari' => $item->pivot->comentari, // Mantenir el comentari
            'estat' => $request->estat,
            'user_id' => $user_id
        ]);

        // Retorna només l'item que s'ha actualitzat
        return response()->json($tiquet->items()->where('item_tiquet.id', $id)->first());

    }

    public function deleteItem(Request $request, string $id) {
        // Comprovar que el item existeix
        $item = DB::table('item_tiquet')->where('id', $id)->first();
        if (!$item) {
            return response()->json([
                'message' => 'Item not found'
            ], 404);
        }

        // Comprovar que l'usuari està autoritzat per eliminar el item
        if ($request->user()->id != $item->user_id) {
            return response()->json([
                'message' => 'User is not the owner of this item'
            ], 401);
        }

        // Comprovar que el item està en estat 'Pendent'
        if ($item->estat != 'Pendent') {
            return response()->json([
                'message' => 'Item is not in state \'Pendent\''
            ], 400);
        }

        // Eliminar el item del tiquet
        DB::table('item_tiquet')->where('id', $id)->delete();

        // Retorna un missatge d'èxit
        return response()->json([
            'message' => 'Item deleted successfully'
        ]);
    }
}
