<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producte;

class Tiquet extends Model
{
    use HasFactory;

    public function tiquets() {
        return $this->belongsToMany(Producte::class, 'item_tiquet')
            ->withPivot('quantitat', 'estat', 'user_id');
    }
}
