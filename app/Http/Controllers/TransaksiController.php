<?php

namespace App\Http\Controllers;

use App\Facades\Midtrans;
use App\Models\Tagihan;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiController extends Controller
{
    public function index(Request $request)
    {
        $transaksis = Transaksi::filter($request);
        return Inertia::render('Transaksi/Index', [
            'transaksis' => $transaksis
        ]);
    }

    public function charge(Request $request)
    {

        $request->validate([
            'nominal' => 'required|numeric',
            'username' => 'required',
            'metode_pembayaran' => 'required|in:qris,bank_transfer,cstore,gopay,shopeepay,dana',
            'bank' => 'required_if:metode_pembayaran,bank_transfer|in:bca,mandiri,bni,bri',
            'store' => 'required_if:metode_pembayaran,cstore|in:alfamart,indomaret',
        ]);
        $tagihan = Tagihan::where('id', $request->tagihan_id)->first();
        $request->merge([
            'order_id' => $tagihan->kode_tagihan,
            'provider' => $request->provider,
        ]);

        return  Midtrans::charge($request);
    }

    public function chargePaymentLink(Request $request)
    {
        return Midtrans::createPaymentLink($request);
    }

    public function destroy(string $id)
    {
        try {
            $transaksi = Transaksi::find($id);
            $tagihan = Tagihan::find($transaksi->tagihan_id);
            $tagihan->delete();
            $transaksi->delete();
            return $this->redirectWithAlert([
                'type' => 'success',
                'message' => 'Berhasil menghapus data transaksi'
            ], 'transaksi.index');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
