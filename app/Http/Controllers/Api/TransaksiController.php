<?php

namespace App\Http\Controllers\Api;

use App\Facades\Midtrans;
use App\Http\Controllers\Controller;
use App\Models\Tagihan;
use App\Models\Transaksi;
use App\Traits\JsonResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TransaksiController extends Controller
{
    use JsonResponse;
    public function charge(Request $request)
    {
        $request->validate([
            'nominal' => 'required|numeric',
            'email' => 'required',
            'metode_pembayaran' => 'required|in:qris,bank_transfer,cstore,gopay,shopeepay,dana',
            'bank' => 'required_if:metode_pembayaran,bank_transfer|in:bca,mandiri,bni,bri',
            'store' => 'required_if:metode_pembayaran,cstore|in:alfamart,indomaret',
        ]);

        $request->merge([
            'order_id' => $request->kode_tagihan,
            'provider' => $request->provider,
            'original_metode_pembayaran' => $request->original_metode_pembayaran
        ]);

        $tagihan = Tagihan::where('kode_tagihan', $request->kode_tagihan)->first();

        if (! $tagihan) {
            return self::toJson([], 'Tagihan tidak ditemukan', 404);
        }

        $transaksi = Transaksi::where('tagihan_id', $tagihan->id)->first();

        if ($transaksi) {
            return self::toJson([], 'Transaksi sudah ada', 406);
        }


        return Midtrans::chargeApi($request);
    }

    public function chargeMultiple(Request $request)
    {
        $validated = $request->validate([
            'data_charge' => 'required|array'
        ]);
        $charges = $validated['data_charge'] ?? [];

        if (empty($charges)) {
            throw new Exception("Data charge kosong.");
        }

        $first = $charges[0];
        $totalAmount = array_sum(array_column($charges, 'nominal'));

        // Gabung semua kode_tagihan jadi satu string tanpa trailing ||
        $kodeTagihanGabung = implode('__', array_column($charges, 'kode_tagihan'));

        // Bangun payload utama
        $payload = [
            'email' => $first['email'],
            'order_id' => $kodeTagihanGabung,
            'metode_pembayaran' => $first['metode_pembayaran'],
            'original_metode_pembayaran' => $first['original_metode_pembayaran'],
            'provider' => $first['provider'],
            'item_details' => [],
            'nominal' => $totalAmount
        ];
        if (isset($first['bank'])) {
            $payload['bank'] = $first['bank'];
        } else if (isset($first['store'])) {
            $payload['store'] = $first['store'];
        }

        // Tambahkan detail item ke item_details
        foreach ($charges as $item) {
            $payload['item_details'][] = [
                'id' => $item['kode_tagihan'],
                'name' => $item['nama_tagihan'],
                'price' => $item['nominal'],
                'quantity' => 1,
            ];
        }
        return Midtrans::chargeMultipleTagihan($payload);
    }


    public function status(string $id)
    {
        try {
            $response = Midtrans::getStatusTransaksi($id);
            $tagihan = Tagihan::where('kode_tagihan', $id)->first();
            if ($tagihan) {
                $transaksi = Transaksi::where('tagihan_id', $tagihan->id)->first();

                if (!$transaksi && is_object($response)) {
                    Transaksi::create([
                        'tagihan_id' => $tagihan->id,
                        'metode_pembayaran' => $this->getAttributeProviderMidtransResponse($response)['metode_pembayaran'],
                        'provider' => $this->getAttributeProviderMidtransResponse($response)['provider'],
                        'detail_charge' => json_encode($response)
                    ]);
                }
            }
            $response = json_encode($response);
            return self::toJson([
                'data' => json_decode($response, true)
            ], "Berhasil mendapatkan data status transaksi!");
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    protected function getAttributeProviderMidtransResponse(object $midtransResponse)
    {
        if ($midtransResponse->payment_type === 'bank_transfer') {
            return [
                'metode_pembayaran' => 'bank_transfer',
                'provider' => $midtransResponse->va_numbers[0]->bank
            ];
        } else if ($midtransResponse->payment_type === 'qris') {
            return [
                'metode_pembayaran' => 'e_wallet',
                'provider' => 'qris'
            ];
        } else  if ($midtransResponse->payment_type === 'gopay') {
            return [
                'metode_pembayaran' => 'e_wallet',
                'provider' => 'gopay'
            ];
        } else  if ($midtransResponse->payment_type === 'dana') {
            return [
                'metode_pembayaran' => 'e_wallet',
                'provider' => 'dana'
            ];
        } else  if ($midtransResponse->payment_type === 'shopeepay') {
            return [
                'metode_pembayaran' => 'e_wallet',
                'provider' => 'shopeepay'
            ];
        } else  if ($midtransResponse->payment_type === 'cstore') {
            return [
                'metode_pembayaran' => 'cstore',
                'provider' => $midtransResponse->store
            ];
        }
    }

    public function checkTransaksi(string $id)
    {
        try {
            $tagihan = Tagihan::where('kode_tagihan', $id)->first();
            $transaksi = Transaksi::where('tagihan_id', $tagihan->id)->first();
            return self::toJson([
                'data' => json_decode($transaksi->detail_charge, true)
            ], "Berhasil mendapatkan detail transaksi");
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
