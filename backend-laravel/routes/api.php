<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductesController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\TiquetsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Auth routes
Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);

// Get categories d'un restaurant en concret
Route::get('/restaurants/{id}/categories', [CategoriesController::class,'index']);
// Get productes d'una categoria en concret
Route::get('/categories/{id}/productes', [ProductesController::class,'index']);
// Get ingredients d'un producte en concret
Route::get('/productes/{id}/ingredients', [IngredientsController::class,'indexPerProducte']);
// Get tots els ingredients
Route::get('/ingredients', [IngredientsController::class,'index']);
// Get d'un tiquet en concret
Route::get('/tiquets/{id}', [TiquetsController::class,'show']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Fer logout
    Route::post('/logout', [AuthController::class,'logout']);

    // Crear un registre nou d'un tiquet
    Route::post('/tiquets', [TiquetsController::class,'store']);

    // Crear un nou registre d'un item al tiquet
    Route::post('/tiquets/items', [TiquetsController::class,'addItem']);

    /******************/
    /*   CATEGORIES   */
    /******************/
    // Crear una nova categoria
    Route::post('/categories', [CategoriesController::class,'store']);
    // Editar una categoria
    Route::put('/categories/{id}', [CategoriesController::class,'update']);
    // Eliminar una categoria
    Route::delete('/categories/{id}', [CategoriesController::class,'destroy']);

    /*****************/
    /*   PRODUCTES   */
    /*****************/
    // Crear un nou producte
    Route::post('/productes', [ProductesController::class,'store']);
    // Editar un producte
    Route::put('/productes/{id}', [ProductesController::class,'update']);
    // Eliminar un producte
    Route::delete('/productes/{id}', [ProductesController::class,'destroy']);

    /*******************/
    /*   INGREDIENTS   */
    /*******************/
    // Crear un nou ingredient
    Route::post('/ingredients', [IngredientsController::class,'store']);
    // Editar un ingredient
    Route::put('/ingredients/{id}', [IngredientsController::class,'update']);
    // Eliminar un ingredient
    Route::delete('/ingredients/{id}', [IngredientsController::class,'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
