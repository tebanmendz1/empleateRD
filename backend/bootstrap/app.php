<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\RecordActivity;
use App\Http\Middleware\SecurityHeaders;
use App\Http\Middleware\AuthenticateApiClient;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(append: [SecurityHeaders::class, RecordActivity::class]);
        $middleware->alias(['api.client' => AuthenticateApiClient::class]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
