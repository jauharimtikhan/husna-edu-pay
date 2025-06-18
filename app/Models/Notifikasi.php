<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    protected $fillable = [
        'user_id',
        'tagihan_id',
        'transaksi_id',
        'status',
        'read_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function tagihan()
    {
        return $this->belongsTo(Tagihan::class);
    }
    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class);
    }
}
