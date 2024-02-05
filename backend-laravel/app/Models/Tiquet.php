<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Producte;

class Tiquet extends Model
{
    use HasFactory;

    protected $appends = ['tiquets'];

    public function getTiquetsAttribute() {
        return $this->items()->get();
    }

    public function items() {
        return $this->belongsToMany(Producte::class, 'item_tiquet')
            ->withPivot('quantitat', 'estat', 'user_id', 'comentari');
    }
}
