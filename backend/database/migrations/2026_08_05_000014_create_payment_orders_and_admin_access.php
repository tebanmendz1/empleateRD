<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', fn (Blueprint $table) => $table->boolean('is_admin')->default(false)->index());

        Schema::create('payment_orders', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('job_id')->unique()->constrained('job_postings')->cascadeOnDelete();
            $table->foreignId('quotation_id')->constrained()->restrictOnDelete();
            $table->foreignId('submitted_by')->constrained('users')->restrictOnDelete();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->uuid('reference')->unique();
            $table->decimal('amount', 12, 2);
            $table->string('currency', 3);
            $table->string('method', 30)->default('bank_transfer');
            $table->string('status', 30)->default('awaiting_proof')->index();
            $table->string('proof_path')->nullable();
            $table->string('proof_name')->nullable();
            $table->string('proof_mime', 100)->nullable();
            $table->text('company_note')->nullable();
            $table->text('review_note')->nullable();
            $table->timestamp('proof_submitted_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });

        Schema::table('job_postings', fn (Blueprint $table) => $table->text('review_note')->nullable());
    }

    public function down(): void
    {
        Schema::table('job_postings', fn (Blueprint $table) => $table->dropColumn('review_note'));
        Schema::dropIfExists('payment_orders');
        Schema::table('users', fn (Blueprint $table) => $table->dropColumn('is_admin'));
    }
};
