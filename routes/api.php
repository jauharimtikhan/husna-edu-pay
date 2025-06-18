<?php

use App\Facades\Midtrans;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;
use Illuminate\Support\Facades\Log;

Route::prefix('v1')
  ->group(function () {

    Route::controller(Api\AuthController::class)
      ->prefix('auth')
      ->group(function () {
        Route::post('login', 'login');
        Route::post('store/expo_token', 'storeExpoToken');
        Route::post('update_device_id', 'updateDeviceId');
        Route::get('me', 'me')->middleware('auth:sanctum');
        Route::post('logout', 'logout')->middleware('auth:sanctum');
        Route::post('/update-profile', 'updateProfile')->middleware('auth:sanctum');
        Route::post('/update-password', 'updatePassword')->middleware('auth:sanctum');
      });

    Route::middleware('auth:sanctum')
      ->group(function () {
        Route::controller(Api\TagihanController::class)
          ->prefix('tagihan')
          ->group(function () {
            Route::get('/', 'list');
            Route::get('/find/{id}', 'show');
            Route::get('/total-tagihan-bulan-ini', 'totalTagihanBulanIni');
            Route::get('/bayar-sekarang', 'getTagihanBulanIni');
          });


        Route::controller(Api\TransaksiController::class)
          ->prefix('transaksi')
          ->group(function () {
            Route::post('charge', 'charge');
            Route::post('charge-multiple', 'chargeMultiple');
            Route::post('status/{id}', 'status');
            Route::get('cek_transaksi/{id}', 'CheckTransaksi');
          });

        Route::controller(Api\HistoryController::class)
          ->prefix('history')
          ->group(function () {
            Route::get('/', 'index');
            Route::get('/list', 'list');
          });

        Route::controller(Api\MetodePembayaranController::class)
          ->prefix('metode-pembayaran')
          ->group(function () {
            Route::get('/', 'index');
          });

        Route::controller(Api\NotifikasiController::class)
          ->prefix('notifikasi')
          ->group(function () {
            Route::get('/', 'index');
            Route::post('/update-all', 'updateAll');
            Route::post('/update/{id}', 'update');
            Route::post('/send', 'sendNotification');
          });

        Route::get('/utils/bantuan', [Api\AuthController::class, 'getBantuanContent']);
        Route::get('/utils/kebijakan-privasi', [Api\AuthController::class, 'getKebijakanPrivasiContent']);
        Route::get('/utils/syarat-ketentuan', [Api\AuthController::class, 'getSyaratKetentuanContent']);
      });



    Route::get('status', function () {
      return response()->json([
        'status' => true,
        'message' => "Server Husna Edu Pay is Ready To Use!🚀🔥😎😎"
      ]);
    });
  });





// handle webhook from midtrans
Route::post('v1/midtrans/webhook', fn(Request $request) => Midtrans::handleWebhook($request));
