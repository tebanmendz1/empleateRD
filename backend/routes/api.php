<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\EmailVerificationController;
use App\Http\Controllers\Api\V1\CandidateDocumentController;
use App\Http\Controllers\Api\V1\CandidateProfileController;
use App\Http\Controllers\Api\V1\JobApplicationController;
use App\Http\Controllers\Api\V1\CandidateCvController;
use App\Http\Controllers\Api\V1\CandidateCvAnalysisController;
use App\Http\Controllers\Api\V1\CandidatePhotoController;
use App\Http\Controllers\Api\V1\CompanyProfileController;
use App\Http\Controllers\Api\V1\CompanyTeamController;
use App\Http\Controllers\Api\V1\CompanyQuotationController;
use App\Http\Controllers\Api\V1\CompanyJobController;
use App\Http\Controllers\Api\V1\CompanyPaymentController;
use App\Http\Controllers\Api\V1\AdminModerationController;
use App\Http\Controllers\Api\V1\PublicJobController;
use App\Http\Controllers\Api\V1\CompanyCandidateController;
use App\Http\Controllers\Api\V1\CandidateProcessController;
use App\Http\Controllers\Api\V1\ReportController;
use App\Http\Controllers\Api\V1\SystemHealthController;
use App\Http\Controllers\Api\V1\CandidateCvShareController;
use App\Http\Controllers\Api\V1\CandidateMatchController;
use App\Http\Controllers\Api\V1\TalentPoolController;
use App\Http\Controllers\Api\V1\NotificationCenterController;
use App\Http\Controllers\Api\V1\AssessmentController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', [SystemHealthController::class, 'readiness']);
    Route::get('/jobs', [PublicJobController::class, 'index']);
    Route::get('/jobs/{job:slug}', [PublicJobController::class, 'show']);
    Route::get('/cv/{token}', [CandidateCvShareController::class, 'show']);

    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:6,1');
        Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:5,1');
        Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:5,1');
        Route::get('/verify-email/{id}/{hash}', [EmailVerificationController::class, 'verify'])->middleware(['signed', 'throttle:6,1'])->name('verification.verify');

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::get('/user', [AuthController::class, 'user']);
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/verification-notification', [EmailVerificationController::class, 'resend'])->middleware('throttle:3,1');
        });
    });

    Route::middleware('auth:sanctum')->prefix('candidate')->group(function (): void {
        Route::get('/profile', [CandidateProfileController::class, 'show']);
        Route::put('/profile', [CandidateProfileController::class, 'update']);
        Route::get('/documents', [CandidateDocumentController::class, 'index']);
        Route::post('/documents', [CandidateDocumentController::class, 'store'])->middleware('throttle:10,1');
        Route::get('/documents/{document}/download', [CandidateDocumentController::class, 'download']);
        Route::delete('/documents/{document}', [CandidateDocumentController::class, 'destroy']);
        Route::get('/applications', [JobApplicationController::class, 'index']);
        Route::post('/jobs/{job:slug}/applications', [JobApplicationController::class, 'store'])->middleware('throttle:10,1');
        Route::get('/jobs/{job:slug}/match', [CandidateMatchController::class, 'candidate']);
        Route::patch('/applications/{application}/withdraw', [JobApplicationController::class, 'withdraw']);
        Route::get('/applications/{application}/process', [CandidateProcessController::class, 'show']);
        Route::post('/applications/{application}/messages', [CandidateProcessController::class, 'message']);
        Route::post('/interviews/{interview}/respond', [CandidateProcessController::class, 'respond']);
        Route::get('/cv/export', [CandidateCvController::class, 'export'])->middleware('throttle:10,1');
        Route::get('/cv/analyze', [CandidateCvAnalysisController::class, 'show'])->middleware('throttle:20,1');
        Route::post('/cv/photo', [CandidatePhotoController::class, 'store'])->middleware('throttle:10,1');
        Route::delete('/cv/photo', [CandidatePhotoController::class, 'destroy']);
        Route::post('/cv/share', [CandidateCvShareController::class, 'update']);
        Route::put('/talent/preferences', [TalentPoolController::class, 'preferences']);
        Route::get('/talent/invitations', [TalentPoolController::class, 'invitations']);
        Route::post('/talent/invitations/{invitation}/respond', [TalentPoolController::class, 'respond']);
        Route::post('/talent/companies/{company}/block', [TalentPoolController::class, 'block']);
        Route::get('/assessments', [AssessmentController::class, 'candidateIndex']);
        Route::post('/assessments/{assignment}/submit', [AssessmentController::class, 'submit']);
    });
    Route::middleware('auth:sanctum')->group(function (): void {
        Route::get('/notifications', [NotificationCenterController::class, 'index']);
        Route::put('/notifications/preferences', [NotificationCenterController::class, 'preferences']);
        Route::post('/notifications/push-subscriptions', [NotificationCenterController::class, 'subscribe']);
        Route::patch('/notifications/{notification}/read', [NotificationCenterController::class, 'read']);
        Route::get('/interviews/{interview}/calendar', [NotificationCenterController::class, 'calendar']);
    });
    Route::middleware('auth:sanctum')->prefix('company')->group(function (): void {
        Route::get('/profile', [CompanyProfileController::class, 'show']);
        Route::put('/profile', [CompanyProfileController::class, 'update']);
        Route::post('/verification/submit', [CompanyProfileController::class, 'submit'])->middleware('throttle:5,1');
        Route::get('/team', [CompanyTeamController::class, 'index']);
        Route::post('/team', [CompanyTeamController::class, 'store'])->middleware('throttle:10,1');
        Route::patch('/team/{member}', [CompanyTeamController::class, 'update']);
        Route::delete('/team/{member}', [CompanyTeamController::class, 'destroy']);
        Route::get('/quotations', [CompanyQuotationController::class, 'index']);
        Route::post('/quotations', [CompanyQuotationController::class, 'store'])->middleware('throttle:20,1');
        Route::get('/jobs', [CompanyJobController::class, 'index']);
        Route::post('/jobs', [CompanyJobController::class, 'store']);
        Route::put('/jobs/{job}', [CompanyJobController::class, 'update']);
        Route::post('/jobs/{job}/submit', [CompanyJobController::class, 'submit']);
        Route::get('/jobs/{job}/payment', [CompanyPaymentController::class, 'show']);
        Route::post('/jobs/{job}/payment', [CompanyPaymentController::class, 'store']);
        Route::post('/jobs/{job}/payment/proof', [CompanyPaymentController::class, 'upload'])->middleware('throttle:10,1');
        Route::get('/applications', [CompanyCandidateController::class, 'index']);
        Route::get('/applications/{application}', [CompanyCandidateController::class, 'show']);
        Route::patch('/applications/{application}/status', [CompanyCandidateController::class, 'updateStatus']);
        Route::post('/applications/{application}/messages', [CompanyCandidateController::class, 'message']);
        Route::post('/applications/{application}/interviews', [CompanyCandidateController::class, 'interview']);
        Route::get('/applications/{application}/document', [CompanyCandidateController::class, 'document']);
        Route::get('/applications/{application}/match', [CandidateMatchController::class, 'company']);
        Route::get('/reports', [ReportController::class, 'company']);
        Route::get('/talents', [TalentPoolController::class, 'search']);
        Route::post('/talents/{candidate}/save', [TalentPoolController::class, 'save']);
        Route::post('/talents/{candidate}/invite', [TalentPoolController::class, 'invite']);
        Route::get('/assessments', [AssessmentController::class, 'companyIndex']);
        Route::post('/assessments', [AssessmentController::class, 'create']);
        Route::post('/assessments/{assessment}/assign', [AssessmentController::class, 'assign']);
        Route::patch('/assessment-assignments/{assignment}/review', [AssessmentController::class, 'review']);
        Route::put('/applications/{application}/evaluation', [AssessmentController::class, 'evaluate']);
    });
    Route::middleware('auth:sanctum')->prefix('admin')->group(function (): void {
        Route::get('/moderation', [AdminModerationController::class, 'queue']);
        Route::post('/companies/{company}/review', [AdminModerationController::class, 'reviewCompany']);
        Route::get('/payments/{payment}/proof', [AdminModerationController::class, 'proof']);
        Route::post('/payments/{payment}/review', [AdminModerationController::class, 'reviewPayment']);
        Route::post('/jobs/{job}/review', [AdminModerationController::class, 'reviewJob']);
        Route::get('/reports', [ReportController::class, 'admin']);
        Route::get('/system-health', [SystemHealthController::class, 'details']);
    });
});
