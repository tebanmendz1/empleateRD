<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\PaymentOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CompanyPaymentController extends Controller
{
    public function show(Request $request, Job $job): JsonResponse
    {
        $this->authorizeJob($request, $job, false);
        return response()->json(['data' => $job->payment]);
    }

    public function store(Request $request, Job $job): JsonResponse
    {
        $company = $this->authorizeJob($request, $job, true);
        abort_unless($job->status === 'pending_payment', 422, 'La vacante no está pendiente de pago.');
        abort_if($job->payment, 422, 'Esta vacante ya tiene una orden de pago.');
        $quote = $job->quotation;
        abort_unless($quote && $quote->expires_at->isFuture(), 422, 'La cotización asociada venció.');
        $payment = PaymentOrder::create(['company_id' => $company->id, 'job_id' => $job->id, 'quotation_id' => $quote->id, 'submitted_by' => $request->user()->id, 'reference' => (string) Str::uuid(), 'amount' => $quote->total, 'currency' => $quote->currency, 'method' => 'bank_transfer']);
        return response()->json(['data' => $payment, 'message' => 'Orden de pago creada.'], 201);
    }

    public function upload(Request $request, Job $job): JsonResponse
    {
        $this->authorizeJob($request, $job, true);
        $payment = $job->payment;
        abort_unless($payment && in_array($payment->status, ['awaiting_proof', 'rejected']), 422, 'Este pago no admite otro comprobante.');
        $data = $request->validate(['proof' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png,webp', 'max:5120'], 'company_note' => ['nullable', 'string', 'max:1000']]);
        if ($payment->proof_path) Storage::disk('local')->delete($payment->proof_path);
        $file = $data['proof'];
        $path = $file->store('payment-proofs/'.$payment->company_id, 'local');
        $payment->update(['proof_path' => $path, 'proof_name' => $file->getClientOriginalName(), 'proof_mime' => $file->getMimeType(), 'company_note' => $data['company_note'] ?? null, 'status' => 'proof_submitted', 'proof_submitted_at' => now(), 'review_note' => null]);
        return response()->json(['data' => $payment->fresh(), 'message' => 'Comprobante enviado para revisión.']);
    }

    private function authorizeJob(Request $request, Job $job, bool $write)
    {
        abort_unless($request->user()->account_type === 'company', 403);
        $company = $request->user()->companies()->wherePivot('status', 'active')->whereKey($job->company_id)->first();
        abort_unless($company, 404);
        $role = $company->members()->whereKey($request->user()->id)->first()?->pivot->role;
        if ($write) abort_unless(in_array($role, ['owner', 'admin', 'recruiter']), 403);
        return $company;
    }
}
