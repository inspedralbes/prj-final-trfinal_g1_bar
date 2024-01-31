<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tiquet;

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tiquet = Tiquet::with('tiquets')->find($id);

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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
