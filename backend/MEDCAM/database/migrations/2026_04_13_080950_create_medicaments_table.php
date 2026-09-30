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
        Schema::create('medicaments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->nullOnDelete();
            $table->string('name', 200);
            $table->string('active_substance', 200)->nullable();
            $table->text('description')->nullable();
            $table->string('dosage', 100)->nullable();
            $table->boolean('prescription_required')->default(false);

            $table->string('photo_url', 500)->nullable();
            $table->string('manufacturer', 200)->nullable();
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicaments');
    }
};
