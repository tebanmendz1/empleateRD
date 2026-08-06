<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\PaymentOrder;
use App\Models\Company;
use App\Models\User;
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
            'users' => User::whereNull('email_verified_at')->where('is_admin', false)->oldest()->get(['id', 'name', 'email', 'phone', 'account_type', 'created_at']),
            'companies' => Company::with('members:id,name,email')->where('verification_status', '!=', 'verified')->oldest('verification_submitted_at')->get(),
            'payments' => PaymentOrder::with('company:id,name', 'job:id,title,status')->where('status', 'proof_submitted')->oldest('proof_submitted_at')->get(),
            'jobs' => Job::with('company:id,name,verification_status')->where('status', 'pending_review')->oldest('submitted_at')->get(),
        ]]);
    }

    public function verifyUser(Request $request, User $user): JsonResponse
    {
        $this->admin($request);
        abort_if($user->is_admin, 422, 'La cuenta administrativa no requiere esta acción.');
        abort_if($user->hasVerifiedEmail(), 422, 'Esta cuenta ya está verificada.');
        $user->forceFill(['email_verified_at' => now()])->save();
        return response()->json(['data' => $user->fresh(), 'message' => 'Cuenta verificada manualmente.']);
    }

    public function proof(Request $request, PaymentOrder $payment)
    {
        $this->admin($request);
        abort_unless($payment->proof_path && Storage::disk('local')->exists($payment->proof_path), 404);
        return Storage::disk('local')->download($payment->proof_path, $payment->proof_name);
    }

    public function reviewCompany(Request $request, Company $company): JsonResponse
    {
        $this->admin($request);
        $data = $request->validate(['decision' => ['required', Rule::in(['approve', 'reject'])], 'note' => ['nullable', 'string', 'max:2000']]);
        abort_if($company->verification_status === 'verified', 422, 'Esta empresa ya está verificada.');
        $approved = $data['decision'] === 'approve';
        $company->update(['verification_status' => $approved ? 'verified' : 'rejected', 'verification_review_note' => $data['note'] ?? null, 'verification_reviewed_by' => $request->user()->id, 'verification_reviewed_at' => now()]);
        return response()->json(['data' => $company->fresh(), 'message' => $approved ? 'Empresa verificada.' : 'Verificación empresarial rechazada.']);
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
        if ($data['decision'] === 'approve') abort_unless($job->company->verification_status === 'verified', 422, 'Verifica primero la empresa antes de publicar su vacante.');
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
