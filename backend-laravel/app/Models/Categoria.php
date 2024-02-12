<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producte;

class Categoria extends Model
{
    use HasFactory;

    public function productes() {
        return $this->belongsToMany(Producte::class, 'categoria_producte')
            ->withPivot('producte_id', 'categoria_id');
    }
}
