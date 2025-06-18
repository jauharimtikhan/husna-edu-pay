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
        Schema::create('tagihans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('nama_tagihan');
            $table->string('kode_tagihan');
            $table->decimal('nominal', 15, 2);
            $table->enum('status', [
                'pending',
                'authorize',
                'failed',
                'capture',
                'settlement',
                'deny',
                'cancel',
                'refund',
                'partial_refund',
                'partial_chargeback',
                'expire',
                'failure',
            ]);
            $table->dateTime('tanggal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihans');
    }
};
