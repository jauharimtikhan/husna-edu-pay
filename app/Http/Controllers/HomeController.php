<?php

namespace App\Http\Controllers;

use App\Models\Tagihan;
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

        return Inertia::render('Beranda/Index', [
            'totalPendapatan' => $totalPendapatan,
            'totalPengguna' => User::count(),
            'pendapatanPerBulan' => $pendapatanPerBulan
        ]);
    }
}
