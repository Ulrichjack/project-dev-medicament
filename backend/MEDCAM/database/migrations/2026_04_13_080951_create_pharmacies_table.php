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
        Schema::create('pharmacies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('license_number', 50)->unique();

            $table->text('address');
            $table->string('email',150)->unique();
            $table->string('phone',20)->nullable();


            $table->decimal('latitude',10, 8);
            $table->decimal('longitude', 11, 8);

            $table->json('opening_hours')->nullable();
            $table->boolean('is_open')->default(true);
            $table->decimal('rating', 3, 2)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacies');
    }
};
