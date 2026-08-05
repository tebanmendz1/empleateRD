<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', fn () => response()->json([
        'data' => [
            'service' => 'EmpleateRD API',
            'status' => 'ok',
            'version' => 'v1',
        ],
    ]));
});
