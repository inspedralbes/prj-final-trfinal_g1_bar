<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductesController;
use App\Http\Controllers\IngredientsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('app');
});

//CATEGORIES
Route::get('/categories', [CategoriesController::class, 'indexWeb'])->name('categoriesIndex');
Route::get('/categories/search', [CategoriesController::class, 'searchCrudWeb'])->name('categoriesIndexSearch');
Route::get('/categories/{id}', [CategoriesController::class, 'showWeb'])->name('categoriesShow');
Route::get('/crearCategoria', [CategoriesController::class,'storeShowWeb'])->name('categoriesStore');
Route::post('/crearCategoria', [CategoriesController::class, 'storeWeb'])->name('categoriesStore');
Route::put('/categories/{id}', [CategoriesController::class, 'updateWeb'])->name('categoriesUpdate');
Route::delete('/categories/delete/{id}', [CategoriesController::class, 'destroyWeb'])->name('categoriesDestroy');

//PRODUCTES
Route::get('/productes', [ProductesController::class, 'indexWeb'])->name('productesIndex');
Route::get('/productes/search', [ProductesController::class, 'searchCrudWeb'])->name('productesIndexSearch');
Route::get('/productes/{id}', [ProductesController::class, 'showWeb'])->name('productesShow');
Route::get('/crearProducte', [ProductesController::class,'storeShowWeb'])->name('productesStore');
Route::post('/crearProducte', [ProductesController::class, 'storeWeb'])->name('productesStore');
Route::put('/productes/{id}', [ProductesController::class, 'updateWeb'])->name('productesUpdate');
Route::delete('/productes/delete/{id}', [ProductesController::class, 'destroyWeb'])->name('productesDestroy');

// INGREDIENTS
Route::get('/ingredients', [IngredientsController::class, 'indexWeb'])->name('ingredientsIndex');
Route::get('/ingredients/search', [IngredientsController::class, 'searchCrudWeb'])->name('ingredientsIndexSearch');
Route::get('/ingredients/{id}', [IngredientsController::class, 'showWeb'])->name('ingredientsShow');
Route::get('/crearIngredient', [IngredientsController::class,'storeShowWeb'])->name('ingredientsStore');
Route::post('/crearIngredient', [IngredientsController::class, 'storeWeb'])->name('ingredientsStore');
Route::put('/ingredients/{id}', [IngredientsController::class, 'updateWeb'])->name('ingredientsUpdate');
Route::delete('/ingredients/delete/{id}', [IngredientsController::class, 'destroyWeb'])->name('ingredientsDestroy');