<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class Transaksi extends Model
{
    protected $fillable = [
        'tagihan_id',
        'metode_pembayaran',
        'detail_charge',
        'provider',
    ];

    protected function casts()
    {
        return [
            'detail_charge' => 'array'
        ];
    }

    public function tagihan()
    {
        return $this->belongsTo(Tagihan::class)->withDefault();
    }

    public static function filter($request)
    {
        $query = self::with('tagihan.user');

        // 🔍 Filter berdasarkan Nama Pengguna (via tagihan.user)
        if ($request->filled('nama_pengguna')) {
            $query->whereHas('tagihan.user', function ($q) use ($request) {
                $q->where('username', 'like', '%' . $request->nama_pengguna . '%');
            });
        }

        // 🔍 Filter berdasarkan Kode Tagihan (via tagihan)
        if ($request->filled('kode_tagihan')) {
            $query->whereHas('tagihan', function ($q) use ($request) {
                $q->where('kode_tagihan', 'like', '%' . $request->kode_tagihan . '%');
            });
        }

        // 🔍 Filter berdasarkan Tanggal (format dari date-fns bisa ISO, dst)
        if ($request->filled('tanggal')) {
            try {
                $tanggal = Carbon::parse(urldecode($request->tanggal))
                    ->timezone('Asia/Jakarta')
                    ->toDateString(); // YYYY-MM-DD

                $query->whereHas('tagihan', function ($q) use ($tanggal) {
                    $q->whereDate('tanggal', $tanggal);
                });
            } catch (\Exception $e) {
                Log::warning('Tanggal filter invalid: ' . $request->tanggal);
            }
        }

        // 🔍 Filter berdasarkan Status (dari relasi tagihan)
        if ($request->filled('status')) {
            $query->whereHas('tagihan', function ($q) use ($request) {
                $q->where('status', $request->status);
            });
        }

        if ($request->filled('metode_pembayaran')) {
            $query->where('metode_pembayaran', $request->metode_pembayaran);
        }

        // ✅ Return hasil paginasi
        return $query->latest()->paginate(25)->withQueryString();
    }
}
