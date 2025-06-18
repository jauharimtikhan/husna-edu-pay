<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function alert(array $data)
    {
        return session()->flash('alert', [
            'type' => $data['type'],
            'message' => $data['message']
        ]);
    }

    public function json(array $data, int $code = 200)
    {
        return response()->json([
            'success' => $data['success'],
            'message' => $data['message'],
            'data' => $data['data']
        ], $code);
    }

    public function redirectWithAlert(array $data, string $routeName, $parameters = [])
    {
        return to_route($routeName, $parameters)->with('alert', $data);
    }

    public function generateInvoiceCode(string $prefix = "INV"): string
    {
        // Format tanggal: YYYYMMDD
        $datePart = date('Ymd');

        // Generate 6 karakter acak (angka + huruf kapital)
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $randomPart = '';
        for ($i = 0; $i < 6; $i++) {
            $randomPart .= $characters[random_int(0, strlen($characters) - 1)];
        }

        return "{$prefix}-{$datePart}-{$randomPart}";
    }

    public function generateInvoiceCodeNew(string $prefix = 'INV'): string
    {
        // Format tanggal: YYYYMMDD
        $datePart = now()->format('Ymd');

        // Generate 6 karakter acak (angka + huruf kapital)
        $randomPart = strtoupper(substr(bin2hex(random_bytes(3)), 0, 6));

        return "{$prefix}-{$datePart}-{$randomPart}";
    }

    public function translateStatusTransaksi(string $status): string
    {
        return match (strtolower($status)) {
            'pending'            => 'Menunggu Pembayaran',
            'authorize'          => 'Menunggu Otorisasi',
            'failed'             => 'Transaksi Gagal',
            'capture'            => 'Pembayaran Dicapture',
            'settlement'         => 'Pembayaran Berhasil',
            'deny'               => 'Pembayaran Ditolak',
            'cancel'             => 'Transaksi Dibatalkan',
            'refund'             => 'Dana Dikembalikan',
            'partial_refund'     => 'Sebagian Dana Dikembalikan',
            'partial_chargeback' => 'Sebagian Dana Ditarik Kembali',
            'expire'             => 'Transaksi Kedaluwarsa',
            'failure'            => 'Terjadi Kegagalan Transaksi',
            default              => 'Status Tidak Dikenal',
        };
    }
}
