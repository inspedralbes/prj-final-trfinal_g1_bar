<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    public function productes() {
        return $this->belongsToMany(Producte::class, 'producte_ingredient')
            ->withPivot('producte_id', 'ingredient_id');
    }
}
