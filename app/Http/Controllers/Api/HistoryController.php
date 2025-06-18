<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HistoryPembayaran;
use App\Traits\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    use JsonResponse;

    public function index(Request $request)
    {
        $history = HistoryPembayaran::with(['user', 'transaksi', 'tagihan'])
            ->where('user_id', Auth::id()); // lebih singkat

        // Filter berdasarkan tanggal spesifik (YYYY-MM-DD)
        if ($request->filled('tanggal')) {
            $history->whereDate('created_at', $request->tanggal);
        }

        // Filter berdasarkan bulan (format 'YYYY-MM')
        if ($request->filled('bulan')) {
            $bulanParts = explode('-', $request->bulan);
            if (count($bulanParts) === 2) {
                [$year, $month] = $bulanParts;
                $history->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            }
        }

        // Filter berdasarkan status tagihan
        if ($request->filled('status')) {
            $history->whereHas('tagihan', function ($q) use ($request) {
                $q->where('status', $request->status);
            });
        }

        // Urutkan berdasarkan user_id atau kolom lain (optional)
        if ($request->filled('urutkan')) {
            $direction = strtolower($request->urutkan) === 'desc' ? 'desc' : 'asc';
            $history->orderBy('created_at', $direction); // Ganti ke 'created_at' agar lebih relevan
        }

        return self::toJson([
            'data' => $history->get(),
        ]);
    }


    public function list(Request $request)
    {
        try {
            $history = HistoryPembayaran::with(['user', 'transaksi', 'tagihan'])
                ->where('user_id', Auth::user()->id)
                ->limit(10)
                ->get();
            return  self::toJson([
                'data' => $history
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
