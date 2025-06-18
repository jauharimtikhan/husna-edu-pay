<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tagihan;
use App\Traits\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class TagihanController extends Controller
{
    use JsonResponse;
    public function list(Request $request)
    {
        $query = Tagihan::with('user');
        $query->where('user_id', Auth::id());
        $query->where('status', 'capture');

        if ($request->filled('tanggal')) {
            // $tanggal = Carbon::parse($request->tanggal)->toDateString();
            $query->whereDate('tanggal', $request->tanggal);
        }

        if ($request->filled('bulan')) {
            $bulan = explode('-', $request->bulan);
            $query->whereMonth('tanggal', $bulan[1]);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('urutkan')) {
            $direction = strtolower($request->urutkan) === 'desc' ? 'desc' : 'asc';
            $query->orderBy('tanggal', $direction); // Ganti ke 'created_at' agar lebih relevan
        }
        $paginated = $query->latest()->paginate(25)->withQueryString();

        if ($request->boolean('sum')) {
            // Hitung sum hanya dari data di halaman ini
            $sum = $paginated->getCollection()->sum('nominal');

            return self::toJson([
                ...$paginated->toArray(),
                'total_nominal' => $sum,
            ], "Berhasil mendapatkan data tagihan", 200);
        }

        return self::toJson([
            'data' => $paginated,
        ], "Berhasil mendapatkan data tagihan", 200);
    }

    public function show(string $id)
    {
        try {
            $tagihan = Tagihan::find($id);
            return self::toJson($tagihan->toArray(), "Berhasil mendapatkan data tagihan", 200);
        } catch (\Exception $th) {
            return self::toJson([
                'error_message' => $th->getMessage()
            ], "error", 500);
        }
    }

    public function totalTagihanBulanIni()
    {
        try {
            $tagihan = Tagihan::where('user_id', Auth::user()->id)
                ->whereMonth('tanggal', Carbon::now()->month)
                ->whereYear('tanggal', Carbon::now()->year)
                ->where('status',  'capture')
                ->sum('nominal');
            return self::toJson([
                'nominal' => $tagihan
            ], "berhasil mendapatkan data total tagihan");
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getTagihanBulanIni()
    {
        $tagihans = Tagihan::where('user_id', Auth::id())
            ->whereMonth('tanggal', Carbon::now()->month)
            ->whereYear('tanggal', Carbon::now()->year)
            ->where('status',  'capture')
            ->get();
        $results = [];
        $totalAmount = 0;
        if ($tagihans->isEmpty()) {
            return self::toJson($results, "Gagal mendapatkan data bayar sekarang", 404);
        }
        foreach ($tagihans as $key => $tagihan) {
            $results['data'][] = [
                'kode_tagihan' => $tagihan->kode_tagihan,
                'nama_tagihan' => $tagihan->nama_tagihan,
                'nominal' => $tagihan->nominal
            ];
            $totalAmount += $tagihan->nominal;
        }
        $results['total_tagihan'] = $totalAmount;
        return self::toJson($results, "Berhasil mendapatkan data bayar sekarang");
    }
}
