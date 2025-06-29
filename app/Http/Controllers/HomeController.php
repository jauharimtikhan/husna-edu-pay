<?php

namespace App\Http\Controllers;

use App\Models\Tagihan;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $totalPendapatan = Tagihan::where('status', 'settlement')->get()->sum('nominal');
        $pendapatanPerBulan = Tagihan::selectRaw('
        DATE_FORMAT(tanggal, "%Y-%m") as bulan,
        SUM(nominal) as total
    ')
            ->where('status', 'settlement')
            ->groupBy(DB::raw('DATE_FORMAT(tanggal, "%Y-%m")'))
            ->orderBy('bulan', 'asc')
            ->get();


        $paymentMethods = Transaksi::select(['metode_pembayaran'])
            ->selectRaw('COUNT(*) as count')
            ->selectRaw("CONCAT(ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 1), '%') as percentage")
            ->groupBy('metode_pembayaran')
            ->get();

        $chartData = $paymentMethods->map(function ($item) {
            return [
                'name' => $item->metode_pembayaran,
                'value' => $item->count,
                'percentage' => $item->percentage
            ];
        });


        return Inertia::render('Beranda/Index', [
            'totalPendapatan' => $totalPendapatan,
            'totalPengguna' => User::count(),
            'pendapatanPerBulan' => $pendapatanPerBulan,
            'payment_method_stat' => $chartData
        ]);
    }
}
