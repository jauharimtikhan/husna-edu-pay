<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MetodePembayaran;
use App\Traits\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MetodePembayaranController extends Controller
{
    use JsonResponse;

    public function index(Request $request)
    {
        $userId = Auth::id();

        // Ambil semua metode pembayaran
        $metodes = MetodePembayaran::select(['id', 'nama', 'gambar', 'kategori'])->get();

        // Ambil statistik penggunaan hanya dari transaksi milik user yang sedang login
        $popularStats = DB::table('transaksis')
            ->join('tagihans', 'transaksis.tagihan_id', '=', 'tagihans.id')
            ->select('transaksis.metode_pembayaran', 'transaksis.provider', DB::raw('count(*) as total'))
            ->where('tagihans.user_id', $userId)
            ->groupBy('transaksis.metode_pembayaran', 'transaksis.provider')
            ->get();

        // Gabungkan popularitas ke metode pembayaran
        $metodes->map(function ($item) use ($popularStats) {
            $usage = $popularStats->first(function ($stat) use ($item) {
                return $stat->metode_pembayaran === $item->kategori
                    && $stat->provider === $item->nama;
            });

            $item->total_used = $usage ? $usage->total : 0;
            return $item;
        });

        // Group by kategori dan cari yang paling populer jika ada data transaksi
        $grouped = $metodes->groupBy('kategori')->map(function ($group) {
            $items = $group->values();

            $maxUsage = $items->max('total_used');

            // Cari semua metode yang punya total_used sama dengan maxUsage
            $topItems = $items->filter(fn($item) => $item->total_used === $maxUsage);

            // Hanya tampilkan most_popular_used kalau cuma ada 1 metode dengan penggunaan tertinggi
            if ($maxUsage > 0 && $topItems->count() === 1) {
                return [
                    'items' => $items,
                    'most_popular_used' => $topItems->first()
                ];
            }

            return [
                'items' => $items
            ];
        });


        return self::toJson([
            'data' => $grouped,
        ], "Berhasil mendapatkan data metode pembayaran");
    }
}
