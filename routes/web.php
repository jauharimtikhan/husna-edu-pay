<?php

use App\Facades\Midtrans;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HistoryPembayaranController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PengaturanController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', [AuthController::class, 'index'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
});

Route::middleware('auth')->group(function () {
    Route::controller(HomeController::class)
        ->prefix('home')
        ->group(function () {
            Route::get('/', 'index')->name('home.index');
        });

    Route::controller(TagihanController::class)
        ->prefix('tagihan')
        ->as('tagihan.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/buat-tagihan-baru', 'create')->name('create');
            Route::get('/update-tagihan/{id}', 'edit')->name('edit');
            Route::get('/search', 'search')->name('search');
            Route::post('/update-tagihan-post/{id}', 'update')->name('update');
            Route::post('/buat-tagihan-baru/store', 'store')->name('store');
            Route::post('/buat-tagihan-baru-multiple/store', 'storeMultiple')->name('store.multiple');
            Route::delete('/delete/{id}', 'destroy')->name('destroy');
        });

    Route::controller(TransaksiController::class)
        ->prefix('transaksi')
        ->as('transaksi.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/charge', 'charge')->name('charge');
            Route::post('/charge-payment-link', 'chargePaymentLink')->name('charge.payment.link');
            Route::delete('/delete/{id}', 'destroy')->name('destroy');
        });

    Route::controller(HistoryPembayaranController::class)
        ->prefix('history-pembayaran')
        ->as('history.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
        });

    Route::controller(UserController::class)
        ->prefix('user')
        ->as('user.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::put('/{id}', 'update')->name('update');
            Route::delete('/{id}', 'destroy')->name('destroy');
        });

    Route::controller(PengaturanController::class)
        ->prefix('pengaturan')
        ->as('pengaturan.')
        ->group(function () {
            Route::get('/daftar-metode-pembayaran', 'daftarMetodePembayaran')
                ->name('payment.method.list');
            Route::post('/daftar-metode-pembayaran/store', 'daftarMetodePembayaranStore')
                ->name('payment.method.store');
            Route::put('/daftar-metode-pembayaran/edit/{id}', 'updateMetodePembayaran')
                ->name('payment.method.update');
            Route::delete('/daftar-metode-pembayaran/delete/{id}', 'deleteMetodePembayaran')
                ->name('payment.method.delete');

            Route::get('/kebijakan-privasi', 'kebijakanPrivasiIndex')
                ->name('kebijakan-privasi.index');

            Route::post('/kebijakan-privasi/post', 'kebijakanPrivasiIndexStore')
                ->name('kebijakan-privasi.store');

            Route::get('/bantuan', 'bantuanIndex')
                ->name('bantuan.index');

            Route::post('/bantuan/post', 'bantuanIndexStore')
                ->name('bantuan.store');

            Route::get('/syarat-ketentuan', 'syaratKetentuanIndex')
                ->name('syarat-ketentuan.index');

            Route::post('/syarat-ketentuan/post', 'syaratKetentuanIndexStore')
                ->name('syarat-ketentuan.store');
        });


    Route::delete('/logout', [AuthController::class, 'logout'])->name('logout');
});


Route::get('pembayaran-tagihan/status/finish', function (Request $request) {
    $order_id = $request->query('order_id');
    if ($request->has('order_id')) {
        $midtransResponse = Midtrans::getStatusTransaksi($order_id);
        if ($midtransResponse['status_code'] === '404') {
            return to_route('pembayaran.error');
        }
        $response = [
            'orderId' => $midtransResponse['order_id'],
            'transactionStatus' => $midtransResponse['transaction_status'],
            'grossAmount' => $midtransResponse['gross_amount'],
            'payment_type' => $midtransResponse['payment_type']
        ];
        return Inertia::render('StatusPage/Finish', [
            'response' => $response
        ]);
    } else {
        $response = [
            'orderId' => "asdkaskd",
            'transactionStatus' => 'settlement',
            'grossAmount' => 100000.00,
            'paymentType' => 'payment_link'
        ];
        return Inertia::render('StatusPage/Finish', [
            'response' => $response
        ]);
    }
});

Route::get('pembayaran-tagihan/status/error', function () {
    return Inertia::render('StatusPage/Finish');
})->name('pembayaran.error');

Route::get('pembayaran-tagihan/callback', function () {
    $order_id = request()->get('order_id');
    $midtransResponse = Midtrans::getStatusTransaksi($order_id);
    return response()->json([
        'status' => true,
        'data' => $midtransResponse
    ]);
})->name('pembayaran.callback');


Route::post('/_test', [TransaksiController::class, 'test'])->middleware('web');
