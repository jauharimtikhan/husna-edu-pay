<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Tagihan extends Model
{
    protected $fillable = [
        'user_id',
        'nama_tagihan',
        'kode_tagihan',
        'status',
        'nominal',
        'tanggal',
    ];

    protected function casts()
    {
        return [
            'nominal' => 'float',
            'tanggal' => 'date'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function setNominalAttribute($value)
    {
        $this->attributes['nominal'] = preg_replace('/[^0-9]/', '', $value);
    }
    public function setTanggalAttribute($value)
    {

        $this->attributes['tanggal'] = Carbon::parse($value)->setTimezone('Asia/Jakarta')->startOfDay();
    }
    public function transaksi()
    {
        return $this->hasOne(Transaksi::class, 'tagihan_id');
    }
}
