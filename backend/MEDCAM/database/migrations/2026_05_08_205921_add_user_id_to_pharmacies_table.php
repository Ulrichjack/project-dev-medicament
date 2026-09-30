<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       Schema::table('users', function (Blueprint $table) {
        if (Schema::hasColumn('users', 'pharmacy_id')) {
            $table->dropForeign(['pharmacy_id']);
            $table->dropColumn('pharmacy_id');
        }
    });
    }

    public function down(): void
    {
        
    }
};
