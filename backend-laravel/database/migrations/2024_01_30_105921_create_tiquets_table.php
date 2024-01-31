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
        Schema::create('tiquets', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedInteger('nombre_taula');
            $table->string('codi_qr', 1000)->unique();
            $table->foreignId('restaurant_id')->constrained('restaurants');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiquets');
    }
};
