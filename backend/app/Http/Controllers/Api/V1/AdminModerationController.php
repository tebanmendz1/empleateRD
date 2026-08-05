<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\PaymentOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class AdminModerationController extends Controller
{
    public function queue(Request $request): JsonResponse
    {
        $this->admin($request);
        return response()->json(['data' => [
            'payments' => PaymentOrder::with('company:id,name', 'job:id,title,status')->where('status', 'proof_submitted')->oldest('proof_submitted_at')->get(),
            'jobs' => Job::with('company:id,name,verification_status')->where('status', 'pending_review')->oldest('submitted_at')->get(),
        ]]);
    }

    public function proof(Request $request, PaymentOrder $payment)
    {
        $this->admin($request);
        abort_unless($payment->proof_path && Storage::disk('local')->exists($payment->proof_path), 404);
        return Storage::disk('local')->download($payment->proof_path, $payment->proof_name);
    }

    public function reviewPayment(Request $request, PaymentOrder $payment): JsonResponse
    {
        $this->admin($request);
        $data = $request->validate(['decision' => ['required', Rule::in(['approve', 'reject'])], 'note' => ['nullable', 'string', 'max:2000']]);
        abort_unless($payment->status === 'proof_submitted', 422, 'Este comprobante ya fue revisado.');
        DB::transaction(function () use ($request, $payment, $data): void {
            $approved = $data['decision'] === 'approve';
            $payment->update(['status' => $approved ? 'approved' : 'rejected', 'review_note' => $data['note'] ?? null, 'reviewed_by' => $request->user()->id, 'reviewed_at' => now()]);
            $payment->job->update(['status' => $approved ? 'pending_review' : 'pending_payment']);
        });
        return response()->json(['data' => $payment->fresh(), 'message' => $data['decision'] === 'approve' ? 'Pago aprobado; vacante enviada a moderación.' : 'Comprobante rechazado.']);
    }

    public function reviewJob(Request $request, Job $job): JsonResponse
    {
        $this->admin($request);
        $data = $request->validate(['decision' => ['required', Rule::in(['approve', 'changes', 'reject'])], 'note' => ['nullable', 'string', 'max:2000']]);
        abort_unless($job->status === 'pending_review', 422, 'Esta vacante no está pendiente de revisión.');
        $status = ['approve' => 'active', 'changes' => 'changes_requested', 'reject' => 'rejected'][$data['decision']];
        $values = ['status' => $status, 'review_note' => $data['note'] ?? null];
        if ($status === 'active') {
            $duration = (int) ($job->quotation?->answers['duration'] ?? 30);
            $values += ['published_at' => now(), 'expires_at' => now()->addDays($duration)];
        }
        $job->update($values);
        return response()->json(['data' => $job->fresh(), 'message' => $status === 'active' ? 'Vacante publicada.' : 'Revisión registrada.']);
    }

    private function admin(Request $request): void { abort_unless($request->user()->is_admin, 403, 'Acceso administrativo requerido.'); }
}
