<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\EmailVerificationController;
use App\Http\Controllers\Api\V1\CandidateDocumentController;
use App\Http\Controllers\Api\V1\CandidateProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', fn () => response()->json([
        'data' => [
            'service' => 'EmpleateRD API',
            'status' => 'ok',
            'version' => 'v1',
        ],
    ]));

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
    });
});
