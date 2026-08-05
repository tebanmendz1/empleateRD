<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentOrder extends Model
{
    protected $fillable = ['company_id', 'job_id', 'quotation_id', 'submitted_by', 'reviewed_by', 'reference', 'amount', 'currency', 'method', 'status', 'proof_path', 'proof_name', 'proof_mime', 'company_note', 'review_note', 'proof_submitted_at', 'reviewed_at'];

    protected function casts(): array
    {
        return ['amount' => 'decimal:2', 'proof_submitted_at' => 'datetime', 'reviewed_at' => 'datetime'];
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function job(): BelongsTo { return $this->belongsTo(Job::class); }
    public function quotation(): BelongsTo { return $this->belongsTo(Quotation::class); }
}
