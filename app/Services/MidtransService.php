<?php

namespace App\Services;

use App\Models\ExpoPushToken;
use App\Models\HistoryPembayaran;
use App\Models\Notifikasi;
use App\Models\Tagihan;
use App\Models\Transaksi;
use App\Models\User;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;
use Midtrans;

class MidtransService
{
  public function __construct()
  {
    Midtrans\Config::$clientKey = config('services.midtrans.client_key');
    Midtrans\Config::$serverKey = config('services.midtrans.server_key');
    Midtrans\Config::$isProduction = config('services.midtrans.is_production') ?? false;
    Midtrans\Config::$isSanitized = true;
    Midtrans\Config::$is3ds = true;
  }

  public function charge($request)
  {
    $user = User::where('username', $request->username)->first();
    $tagihan = Tagihan::with('user')
      ->where('id', $request->tagihan_id)
      ->first();
    // Create a transaction
    $order_id = $request->order_id;
    $callbackMobile = config('services.mobile.callback_url');
    $transactionData = [
      'transaction_details' => [
        'order_id' => $order_id,
        'gross_amount' => $request->nominal,
      ],
      'item_details' => [
        [
          'id' => Str::random(6),
          'price' => $request->nominal,
          'quantity' => 1,
          'name' => $tagihan->nama_tagihan,
        ],
      ],
      'customer_details' => [
        'email' => $user->username,
        'first_name' => $user->username,
      ],
    ];
    if ($request->metode_pembayaran === 'bank_transfer') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['bank_transfer'] = [
        'bank' => $request->bank,
      ];
    }
    if ($request->metode_pembayaran === 'qris') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['qris'] = [
        'acquirer' => 'gopay',
      ];
    }
    if ($request->metode_pembayaran === 'gopay') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['gopay'] = [
        'enable_callback' => true,
        'callback_url' => "https://local.jtech.my.id/pembayaran-tagihan/callback",
      ];
    }
    if ($request->metode_pembayaran === 'shopeepay') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['shopeepay'] = [
        "callback_url" => "https://local.jtech.my.id/pembayaran-tagihan/callback"
      ];
    }
    if ($request->metode_pembayaran === 'cstore') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['cstore'] = [
        'store' => $request->store === "indomaret" ? Str::ucfirst($request->store) : $request->store,
      ];
    }
    if ($request->metode_pembayaran === 'dana') {
      $transactionData['payment_type'] = 'qris';
      $transactionData['enabled_payments'] = ['dana'];
      $transactionData['dana'] = [
        'callback_url' => "https://local.jtech.my.id/pembayaran-tagihan/callback",
      ];
    }
    // dd($transactionData);

    // Create a Snap transaction
    try {
      $chargeData = \Midtrans\CoreApi::charge($transactionData);
      $transaksi = Transaksi::create([
        'metode_pembayaran' => $request->original_metode_pembayaran,
        'provider' => $request->provider,
        'detail_charge' => json_encode($chargeData),
        'tagihan_id' => $request->tagihan_id
      ]);

      $tagihan->status = $chargeData->transaction_status;
      $tagihan->save();
      HistoryPembayaran::create([
        'user_id' => $tagihan->user->id,
        'tagihan_id' => $tagihan->id,
        'transaksi_id' => $transaksi->id
      ]);
      return response()->json([
        'message' => 'Transaction created successfully',
        'data' => $chargeData,
        'midtrans_code' => 201
      ])->setStatusCode(201);
    } catch (\Exception $th) {
      $error = $this->parseMidtransException($th);
      return response()->json([
        'status' => 'error',
        'message' => $this->getMidtransErrorMessage($error['status_code']),
        'transaction_id' => $error['id'],
        'midtrans_code' => $error['status_code']
      ], $error['status_code']);
    }
  }

  public function chargeApi(Request $request)
  {
    $user = User::where('email', $request->email)->first();
    $tagihan = Tagihan::with('user')
      ->where('kode_tagihan', $request->kode_tagihan)
      ->first();
    // Create a transaction
    $order_id = $request->order_id;
    $callbackMobile = config('services.mobile.callback_url');
    $transactionData = [
      'transaction_details' => [
        'order_id' => $order_id,
        'gross_amount' => $request->nominal,
      ],
      'item_details' => [
        [
          'id' => Str::random(6),
          'price' => $request->nominal,
          'quantity' => 1,
          'name' => $tagihan->nama_tagihan,
        ],
      ],
      'customer_details' => [
        'email' => $user->email,
        'first_name' => $user->username,
      ],
    ];
    if ($request->metode_pembayaran === 'bank_transfer') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['bank_transfer'] = [
        'bank' => $request->bank,
      ];
    }
    if ($request->metode_pembayaran === 'qris') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['qris'] = [
        'acquirer' => 'gopay',
      ];
    }
    if ($request->metode_pembayaran === 'gopay') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['gopay'] = [
        'enable_callback' => true,
        'callback_url' => "$callbackMobile?order_id=$order_id",
      ];
    }
    if ($request->metode_pembayaran === 'shopeepay') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['shopeepay'] = [
        "callback_url" => "$callbackMobile?order_id=$order_id",
        "enable_callback" => true
      ];
    }
    if ($request->metode_pembayaran === 'cstore') {
      $transactionData['payment_type'] = $request->metode_pembayaran;
      $transactionData['cstore'] = [
        'store' => $request->store === "indomaret" ? Str::ucfirst($request->store) : $request->store,
      ];
    }
    if ($request->metode_pembayaran === 'dana') {
      $transactionData['payment_type'] = 'qris';
      $transactionData['enabled_payments'] = ['dana'];
      $transactionData['dana'] = [
        'callback_url' => "$callbackMobile?order_id=$order_id",
      ];
    }
    // dd($transactionData);

    // Create a Snap transaction
    try {
      $chargeData = \Midtrans\CoreApi::charge($transactionData);
      $transaksi = Transaksi::create([
        'metode_pembayaran' => $request->original_metode_pembayaran,
        'provider' => $request->provider,
        'detail_charge' => json_encode($chargeData),
        'tagihan_id' => $tagihan->id
      ]);

      $tagihan->status = $chargeData->transaction_status;
      $tagihan->save();
      HistoryPembayaran::create([
        'user_id' => $tagihan->user->id,
        'tagihan_id' => $tagihan->id,
        'transaksi_id' => $transaksi->id
      ]);
      return response()->json([
        'message' => 'Transaction created successfully',
        'data' => $chargeData,
        'midtrans_code' => 201
      ])->setStatusCode(201);
    } catch (\Exception $th) {
      $error = $this->parseMidtransException($th);
      return [
        'status' => 'error',
        'message' => $this->getMidtransErrorMessage($error['status_code']),
        'transaction_id' => $error['id'],
        'midtrans_code' => $error['status_code']
      ];
    }
  }

  public function chargeMultipleTagihan(array $request)
  {
    $transactionData = $this->generateTransactionData($request);
    $kodeTagihanList = $this->extractSystemOrderId($request['order_id']);

    // Ambil semua tagihan dan simpan array-nya
    $tagihans = Tagihan::with('user')
      ->whereIn('kode_tagihan', $kodeTagihanList)
      ->get();

    if ($tagihans->isEmpty()) {
      return response()->json(['message' => 'Tagihan tidak ditemukan'], 404);
    }

    try {
      // Hanya 1x charge ke Midtrans
      $chargeData = \Midtrans\CoreApi::charge($transactionData);

      foreach ($tagihans as $tagihan) {
        // Buat Transaksi untuk setiap tagihan
        $transaksi = Transaksi::create([
          'metode_pembayaran' => $request['original_metode_pembayaran'],
          'provider' => $request['provider'],
          'detail_charge' => json_encode($chargeData),
          'tagihan_id' => $tagihan->id
        ]);

        // Update status tagihan
        $tagihan->status = $chargeData->transaction_status;
        $tagihan->save();

        // Buat histori pembayaran
        HistoryPembayaran::create([
          'user_id' => $tagihan->user->id,
          'tagihan_id' => $tagihan->id,
          'transaksi_id' => $transaksi->id
        ]);
      }

      return response()->json([
        'message' => 'Transaction created successfully',
        'data' => $chargeData,
        'midtrans_code' => 201
      ], 201);
    } catch (\Exception $th) {
      $error = $this->parseMidtransException($th);
      return [
        'status' => 'error',
        'message' => $this->getMidtransErrorMessage($error['status_code']),
        'transaction_id' => $error['id'] ?? null,
        'midtrans_code' => $error['status_code'] ?? 500
      ];
    }
  }


  public function createPaymentLink($request)
  {
    $tagihan = Tagihan::with('user')->where('id', $request->tagihan_id)->first();
    $payload = [
      'transaction_details' => [
        'order_id' => $tagihan->kode_tagihan,
        'gross_amount' => $tagihan->nominal,
        'payment_link_id' => $tagihan->kode_tagihan
      ],
      'item_details' => [
        [
          'id' => Str::random(6),
          'price' => $tagihan->nominal,
          'quantity' => 1,
          'name' => $tagihan->nama_tagihan,
        ],
      ],
      'usage_limit' => $request->max_usage,
      'enabled_payments' => [
        'gopay',
        'bca_klikbca',
        'bca_klikpay',
        'bri_epay',
        'permata_va',
        'other_va',
        'bca_va',
        'bni_va',
        'bri_va',
        'indomaret',
        'alfamart',
        'shopeepay'
      ],
      'payment_link_type' => 'FIXED_AMOUNT',
      'title' => "Pembayaran Tagihan Husna Edu Pay",
      'expiry' => [
        'start_time' => Carbon::now()->format('Y-m-d H:i O'),
        'duration' => 30,
        'unit' => 'minutes'
      ],
    ];
    $client = new Client();
    try {
      $midtransUrl = config('services.midtrans.is_production') === false ? "https://api.sandbox.midtrans.com/v1/payment-links" : "https://api.midtrans.com/v1/payment-links";
      $authorizationString = base64_encode(config('services.midtrans.server_key'));
      $paymentLinkRequest = $client->request('POST', $midtransUrl, [
        'body' => json_encode($payload),
        'headers' => [
          'accept' => 'application/json',
          'content-type' => 'application/json',
          'Authorization' => "Basic $authorizationString"
        ],
      ]);
      $response = json_decode($paymentLinkRequest->getBody(), true);

      // Tambahkan field 'payment_type'
      $assignPaymentType = array_merge($response, [
        'payment_type' => 'payment_link'
      ]);

      // Simpan ke database
      $transaksi = Transaksi::create([
        'metode_pembayaran' => 'payment_link',
        'detail_charge' => json_encode($assignPaymentType),
        'tagihan_id' => $request->tagihan_id,
        'provider' => null
      ]);
      $tagihan->status = 'pending';
      $tagihan->save();
      HistoryPembayaran::create([
        'user_id' => $tagihan->user->id,
        'tagihan_id' => $tagihan->id,
        'transaksi_id' => $transaksi->id
      ]);
      return response()->json([
        'message' => 'Transaction created successfully',
        'data' => $response,
        'midtrans_code' => 201
      ])->setStatusCode(201);
    } catch (\Exception $th) {
      $error = $this->parseMidtransException($th);
      return response()->json([
        'status' => 'error',
        'message' => $this->getMidtransErrorMessage($error['status_code']),
        'transaction_id' => $error['id'],
        'midtrans_code' => $error['status_code']
      ], $error['status_code']);
    }
  }

  public function getStatusTransaksi(string $orderId)
  {
    $response = Midtrans\Transaction::status($orderId);
    if (is_object($response))
      $mockPayload = [
        'order_id'       => $response->order_id ?? null,
        'status_code'    => $response->status_code ?? null,
        'gross_amount'   => $response->gross_amount ?? null,
        'signature_key'  => $response->signature_key ?? $this->generateSignature($response),
        'transaction_status' => $response->transaction_status ?? null,
      ];

    // Buat objek Request palsu (dari array)
    $fakeRequest = new Request([], [], [], [], [], [], json_encode($mockPayload));
    $fakeRequest->headers->set('Content-Type', 'application/json');

    // Panggil handler webhook
    $this->handleWebhook($fakeRequest, true);
    return $response;
  }

  public function handleWebhook(Request $request, $isCheckStatus = false)
  {
    $serverKey = config('services.midtrans.server_key');

    try {
      $midtransResponse = $request->json()->all();

      // Validasi payload wajib
      if (
        empty($midtransResponse['order_id']) ||
        empty($midtransResponse['status_code']) ||
        empty($midtransResponse['gross_amount']) ||
        empty($midtransResponse['signature_key'])
      ) {
        Log::warning('Invalid Midtrans webhook payload.', ['payload' => $midtransResponse]);
        return response()->json(['message' => 'Invalid payload'], 400);
      }

      // Validasi signature
      $expectedSignature = hash(
        'sha512',
        $midtransResponse['order_id'] .
          $midtransResponse['status_code'] .
          $midtransResponse['gross_amount'] .
          $serverKey
      );

      if ($midtransResponse['signature_key'] !== $expectedSignature) {
        Log::warning('Invalid Midtrans signature.', [
          'expected' => $expectedSignature,
          'received' => $midtransResponse['signature_key']
        ]);
        return response()->json(['message' => 'Invalid signature'], 403);
      }

      // Cek apakah order_id mengandung "__"
      $kodeTagihanList = $this->extractSystemOrderId($midtransResponse['order_id']);
      $isMultiple = count($kodeTagihanList) > 1;

      if (empty($kodeTagihanList)) {
        Log::warning('No valid kode_tagihan extracted from order_id', ['order_id' => $midtransResponse['order_id']]);
        return response()->json(['message' => 'Invalid order_id format'], 200);
      }
      // Ambil semua tagihan
      $tagihans = Tagihan::with('user')->whereIn('kode_tagihan', $kodeTagihanList)->get();

      if ($tagihans->isEmpty()) {
        Log::warning('Tagihan not found.', ['kode_tagihan' => $kodeTagihanList]);
        return response()->json(['message' => 'Tagihan not found'], 200);
      }

      foreach ($tagihans as $tagihan) {

        // Update status tagihan
        $tagihan->status = $midtransResponse['transaction_status'];
        $tagihan->save();

        // Update transaksi
        $transaksi = Transaksi::where('tagihan_id', $tagihan->id)->first();
        if ($transaksi) {
          $transaksi->update([
            'detail_charge' => json_encode($midtransResponse)
          ]);
        }

        // Buat/Update notifikasi
        $notif = Notifikasi::updateOrCreate(
          [
            'user_id' => $tagihan->user->id,
            'tagihan_id' => $tagihan->id,
            'transaksi_id' => $transaksi?->id,
          ],
          [
            'user_id' => $tagihan->user->id,
            'tagihan_id' => $tagihan->id,
            'transaksi_id' => $transaksi?->id,
          ]
        );

        // Kirim push notifikasi jika bukan cek status
        $push = new ExpoPushTokenService();
        $token = ExpoPushToken::where('device_id', $tagihan->user?->device_id)
          ->first();

        if ($midtransResponse['transaction_status'] !== 'pending' && $isCheckStatus === false) {
          if ($token) {
            $statusTransaksi = $this->translateStatusTransaksi($midtransResponse['transaction_status']);
            $notification = [
              'body' => "Status Pembayaran Anda $statusTransaksi",
              'data' => json_encode($midtransResponse),
              'title' => "Pembayaran Tagihan {$tagihan->nama_tagihan}"
            ];
            $push->sendSingle($token->token, $notification['title'], $notification['body'], $notification['data']);
          }
        }
      }

      Log::info('Webhook handled successfully.', [
        'kode_tagihan' => $kodeTagihanList,
        'status' => $midtransResponse['transaction_status'],
        'mode' => $isMultiple ? 'MULTIPLE' : 'SINGLE'
      ]);

      return response()->json(['message' => 'Webhook handled successfully'], 200);
    } catch (\Throwable $e) {
      Log::error('Failed to process Midtrans webhook', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
      ]);
      return response()->json(['message' => 'Server error'], 500);
    }
  }

  public function extractSystemOrderId(string $midtransOrderId): array
  {
    $midtransOrderId = trim($midtransOrderId);

    // Deteksi delimiter untuk multiple tagihan
    $delimiters = ['__', '||'];
    $delimiter = null;

    foreach ($delimiters as $delim) {
      if (str_contains($midtransOrderId, $delim)) {
        $delimiter = $delim;
        break;
      }
    }

    // Pisah berdasarkan delimiter jika ditemukan
    $rawKodeTagihans = $delimiter
      ? explode($delimiter, $midtransOrderId)
      : [$midtransOrderId];

    $validKodeTagihans = [];

    foreach ($rawKodeTagihans as $kode) {
      $kode = trim($kode);

      // Potong trailing suffix jika formatnya seperti: INV-868ZR-xxxxxxxxxxxx
      if (preg_match('/^((INV-\d{8}-[A-Z0-9]{6})|(INV-\d{3}[A-Z]{2})|(INV-[A-Z0-9]{5,6}))-\d+$/', $kode, $matches)) {
        $kode = $matches[1]; // Ambil bagian sebelum -xxxxxxxxxx
      }

      if ($this->isValidInvoiceFormat($kode)) {
        $validKodeTagihans[] = $kode;
      }
    }

    return $validKodeTagihans;
  }

  public function isValidInvoiceFormat(string $invoiceId): bool
  {
    $invoiceId = trim($invoiceId);

    return preg_match('/^INV-\d{3}[A-Z]{2}$/', $invoiceId) ||                // INV-568EP
      preg_match('/^INV-\d{8}-[A-Z0-9]{6}$/', $invoiceId) ||            // INV-20250615-5G3TP2
      preg_match('/^INV-[A-Z0-9]{5,6}$/', $invoiceId);                  // INV-868ZR
  }



  public function generateTransactionData($request): array
  {
    $order_id = $request['order_id'];
    $callbackMobile = config('services.mobile.callback_url');
    $user = User::where('email', $request['email'])->first();
    $transactionData = [
      'transaction_details' => [
        'order_id' => $order_id,
        'gross_amount' => $request['nominal'],
      ],
      'customer_details' => [
        'email' => $request['email'],
        'first_name' => $user->username,
      ],
      $request['item_details']
    ];
    if ($request['metode_pembayaran'] === 'bank_transfer') {
      $transactionData['payment_type'] = $request['metode_pembayaran'];
      $transactionData['bank_transfer'] = [
        'bank' => $request['bank'],
      ];
    }
    if ($request['metode_pembayaran'] === 'qris') {
      $transactionData['payment_type'] = $request['metode_pembayaran'];
      $transactionData['qris'] = [
        'acquirer' => 'gopay',
      ];
    }
    if ($request['metode_pembayaran'] === 'gopay') {
      $transactionData['payment_type'] = $request['metode_pembayaran'];
      $transactionData['gopay'] = [
        'enable_callback' => true,
        'callback_url' => "$callbackMobile?order_id=$order_id",
      ];
    }
    if ($request['metode_pembayaran'] === 'shopeepay') {
      $transactionData['payment_type'] = $request['metode_pembayaran'];
      $transactionData['shopeepay'] = [
        "callback_url" => "$callbackMobile?order_id=$order_id",
        "enable_callback" => true
      ];
    }
    if ($request['metode_pembayaran'] === 'cstore') {
      $transactionData['payment_type'] = $request['metode_pembayaran'];
      $transactionData['cstore'] = [
        'store' => $request->store === "indomaret" ? Str::ucfirst($request->store) : $request->store,
      ];
    }
    if ($request['metode_pembayaran'] === 'dana') {
      $transactionData['payment_type'] = 'qris';
      $transactionData['enabled_payments'] = ['dana'];
      $transactionData['dana'] = [
        'callback_url' => "$callbackMobile?order_id=$order_id",
      ];
    }
    if ($request['provider'] === 'permata') {
      $transactionData['payment_type'] = 'bank_transfer';
      $transactionData['bank_transfer'] = [
        'bank' => $request['provider'],
        'permata' => [
          'recipient_name' => $user->username
        ]
      ];
    }
    return $transactionData;
  }

  protected function getBeforeSecondDash(string $input): string
  {
    $parts = explode('-', $input);
    if (count($parts) >= 2) {
      return $parts[0] . '-' . $parts[1];
    }
    return $input;
  }
  protected function getMidtransErrorMessage(int $statusCode): string
  {
    $messages = [
      // 2xx - Success
      200 => 'Transaksi berhasil.',
      201 => 'Transaksi berhasil dibuat, menunggu penyelesaian oleh pelanggan.',
      202 => 'Transaksi ditolak oleh sistem pembayaran atau deteksi penipuan Midtrans.',
      407 => 'Transaksi telah kedaluwarsa.',

      // 3xx - Redirection
      300 => 'Permintaan telah dialihkan secara permanen.',
      301 => 'Sumber daya telah dipindahkan secara permanen.',
      302 => 'Sumber daya telah dipindahkan sementara.',

      // 4xx - Client Error
      400 => 'Permintaan tidak valid. Silakan periksa data yang dikirim.',
      401 => 'Akses ditolak. Silakan periksa Client Key atau Server Key Anda.',
      402 => 'Merchant tidak memiliki akses untuk metode pembayaran ini.',
      403 => 'Sumber daya yang diminta tidak dapat menghasilkan konten yang dapat diterima.',
      404 => 'Sumber daya yang diminta tidak ditemukan.',
      405 => 'Metode HTTP tidak diizinkan.',
      406 => 'Order ID duplikat. Order ID telah digunakan sebelumnya.',
      408 => 'Tipe data yang dikirim tidak sesuai.',
      409 => 'Terlalu banyak transaksi dengan nomor kartu yang sama.',
      410 => 'Akun merchant dinonaktifkan. Silakan hubungi dukungan Midtrans.',
      411 => 'Token ID hilang, tidak valid, atau telah kedaluwarsa.',
      412 => 'Merchant tidak dapat mengubah status transaksi.',
      413 => 'Permintaan tidak dapat diproses karena sintaks yang salah dalam body permintaan.',
      414 => 'Permintaan pengembalian dana ditolak karena dana merchant tidak mencukupi.',
      429 => 'Batas permintaan API terlampaui. Silakan coba lagi nanti.',

      // 5xx - Server Error
      500 => 'Terjadi kesalahan internal pada server Midtrans.',
      501 => 'Fitur belum tersedia.',
      502 => 'Kesalahan koneksi dengan bank.',
      503 => 'Layanan tidak tersedia. Silakan coba lagi nanti.',
      504 => 'Deteksi penipuan tidak tersedia saat ini.',
    ];

    return $messages[$statusCode] ?? 'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi nanti.';
  }

  protected function parseMidtransException(\Exception $e): array
  {
    $message = $e->getMessage();
    $statusCode = $e->getCode() ?: 500;

    $pattern = '/API response:\s*(\{.+\})$/';
    $matches = [];

    if (preg_match($pattern, $message, $matches)) {
      $json = json_decode($matches[1], true);

      return [
        'status_code' => isset($json['status_code']) ? (int) $json['status_code'] : $statusCode,
        'status_message' => $json['status_message'] ?? 'Terjadi kesalahan dari Midtrans.',
        'id' => $json['id'] ?? null, // <- Aman walau gak ada
        'raw' => $json,
      ];
    }

    // fallback kalau ga ketemu API response
    return [
      'status_code' => $statusCode,
      'status_message' => $message,
      'id' => null,
      'raw' => null,
    ];
  }

  protected function detectMidtransWebhookType(array $payload): string
  {
    // Deteksi jika berasal dari Payment Link
    if (isset($payload['payment_link_id'])) {
      return 'payment_link';
    }

    // Deteksi jika berasal dari Core API
    if (isset($payload['payment_type']) && isset($payload['transaction_status'])) {
      return 'core_api';
    }

    // Default tidak diketahui
    return 'unknown';
  }

  protected function generateSignature($response)
  {
    $serverKey = config('services.midtrans.server_key');

    return hash(
      'sha512',
      $response->order_id .
        $response->status_code .
        $response->gross_amount .
        $serverKey
    );
  }

  protected function translateStatusTransaksi(string $status): string
  {
    switch (strtolower($status)) {
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'authorize':
        return 'Menunggu Otorisasi';
      case 'failed':
        return 'Transaksi Gagal';
      case 'capture':
        return 'Perlu Dibayar';
      case 'settlement':
        return 'Selesai';
      case 'deny':
        return 'Pembayaran Ditolak';
      case 'cancel':
        return 'Transaksi Dibatalkan';
      case 'refund':
        return 'Dana Dikembalikan';
      case 'partial_refund':
        return 'Sebagian Dana Dikembalikan';
      case 'partial_chargeback':
        return 'Sebagian Dana Ditarik Kembali';
      case 'expire':
        return 'Transaksi Kedaluwarsa';
      case 'failure':
        return 'Terjadi Kegagalan Transaksi';
      default:
        return 'Status Tidak Dikenal';
    }
  }
}
