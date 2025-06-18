<?php

namespace App\Providers;

use App\Services\ExpoPushTokenService;
use App\Services\MidtransService;
use App\Services\XenditService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('midtrans', function ($app) {
            return new MidtransService();
        });
        $this->app->singleton('xendit', function ($app) {
            return new XenditService();
        });
        $this->app->singleton('expopushnotification', function ($app) {
            return new ExpoPushTokenService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
