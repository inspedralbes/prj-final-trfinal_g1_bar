<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categoria;

class Restaurant extends Model
{
    use HasFactory;

    public function categories() {
        return $this->hasMany(Categoria::class, 'restaurant_id');
    }
}
