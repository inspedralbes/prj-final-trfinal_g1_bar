<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nom', 100)->unique();
            $table->string('descripcio', 1000);
            $table->decimal('preu', 6, 2);
            $table->string('imatge', 1000);
            $table->boolean('actiu')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productes');
    }
};
