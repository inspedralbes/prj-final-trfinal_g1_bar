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
        Schema::create('item_tiquet', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('tiquet_id')->constrained('tiquets')->onDelete('cascade');
            $table->foreignId('producte_id')->constrained('productes')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->unsignedInteger('quantitat');
            $table->string('estat')->default('pendent');
            $table->text('comentari')->nullable();  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_tiquet');
    }
};
