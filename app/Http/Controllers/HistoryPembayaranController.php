<?php

namespace App\Http\Controllers;

use App\Models\HistoryPembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HistoryPembayaranController extends Controller
{
    public function index(Request $request)
    {

        return Inertia::render('HistoryPembayaran/Index', [
            'history_pembayaran' => $this->search($request)
        ]);
    }


    protected function search(Request $request)
    {
        $query = HistoryPembayaran::with(['user', 'tagihan', 'transaksi']);
        if ($request->filled('nama_pengguna')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('username', 'like', '%' . $request->nama_pengguna . '%');
            });
        }
        if ($request->filled('kode_tagihan')) {
            $query->whereHas('tagihan', function ($q) use ($request) {
                $q->where('kode_tagihan', 'like', "%{$request->kode_tagihan}%");
            });
        }
        if ($request->filled('tanggal')) {
            try {
                $decoded = urldecode($request->tanggal); // 2025-06-27T00:00
                $tanggal = \Carbon\Carbon::parse($decoded)->timezone('Asia/Jakarta')->toDateString();
                $query->whereDate('created_at', 'like', "%$tanggal%");
            } catch (\Exception $e) {
                // Kalau gagal parsing (misal format aneh), bisa log atau abaikan
                Log::warning('Tanggal filter invalid: ' . $request->tanggal);
            }
        }

        // Filter berdasarkan Status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Ambil data paginasi dan tetap sertakan query string pencarian
        return $query->latest()->paginate(25)->withQueryString();
    }
}
