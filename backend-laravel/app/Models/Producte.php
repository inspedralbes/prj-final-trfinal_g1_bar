<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tiquet;
use App\Models\Categoria;
use App\Models\Ingredient;

class Producte extends Model
{
    use HasFactory;

    public function items() {
        return $this->belongsToMany(Tiquet::class, 'item_tiquet')
            ->withPivot('quantitat', 'user_id');
    }

    public function categories() {
        return $this->belongsToMany(Categoria::class, 'categoria_producte')
            ->withPivot('producte_id', 'categoria_id');
    }

    public function ingredients() {
        return $this->belongsToMany(Ingredient::class, 'producte_ingredient')
            ->withPivot('producte_id', 'ingredient_id');
    }
}
