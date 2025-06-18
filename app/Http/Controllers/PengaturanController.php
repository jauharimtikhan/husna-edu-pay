<?php

namespace App\Http\Controllers;

use App\Models\MetodePembayaran;
use App\Models\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PengaturanController extends Controller
{
    public function daftarMetodePembayaran(Request $request)
    {
        return Inertia::render('Pengaturan/MetodePembayaran/Index', [
            'payment_list' => MetodePembayaran::paginate(25)
        ]);
    }

    public function daftarMetodePembayaranStore(Request $request)
    {
        $request->validate([
            'nama' => 'required|unique:metode_pembayarans,nama',
            'kategori' => 'required|in:bank_transfer,e_wallet,cstore',
            'gambar' => 'required|image|max:2048'
        ]);

        try {
            if ($request->hasFile('gambar')) {
                $path = $request->file('gambar')->storeAs('payment_methods', Str::uuid() . "." . $request->file('gambar')->getClientOriginalExtension(), 'public');
                MetodePembayaran::create([
                    'nama' => $request->nama,
                    'kategori' => $request->kategori,
                    'gambar' => $path
                ]);
            }

            return $this->redirectWithAlert([
                'type' => 'success',
                'message' => 'Berhasil menyimpan data metode pembayaran!'
            ], 'pengaturan.payment.method.list');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function updateMetodePembayaran(Request $request, string $id)
    {
        $validated =  $request->validate([
            'nama' => 'required',
            'kategori' => 'required|in:bank_transfer,e_wallet,cstore',
        ]);
        try {
            $metodePembayaran = MetodePembayaran::find($id);
            if ($request->hasFile('gambar')) {
                if ($metodePembayaran->gambar && Storage::disk('public')->exists($metodePembayaran->gambar)) {
                    Storage::disk('public')->delete($metodePembayaran->gambar);
                }

                $path = $request->file('gambar')->storeAs('payment_methods', Str::uuid() . "." . $request->file('gambar')->getClientOriginalExtension(), 'public');
                $metodePembayaran->gambar = $path;
            } else {
                $metodePembayaran->gambar = $request->gambar;
            }
            $metodePembayaran->nama = $validated['nama'];
            $metodePembayaran->kategori = $validated['kategori'];
            $metodePembayaran->save();
            return $this->redirectWithAlert([
                'type' => 'success',
                'message' => 'Berhasil mengupdate data metode pembayaran!'
            ], 'pengaturan.payment.method.list');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function deleteMetodePembayaran(string $id)
    {
        try {
            $metodePembayaran = MetodePembayaran::find($id);
            if ($metodePembayaran->gambar && Storage::disk('public')->exists($metodePembayaran->gambar)) {
                Storage::disk('public')->delete($metodePembayaran->gambar);
            }
            $metodePembayaran->delete();
            return $this->redirectWithAlert([
                'type' => 'success',
                'message' => 'Berhasil menghapus data metode pembayaran!'
            ], 'pengaturan.payment.method.list');
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function kebijakanPrivasiIndex()
    {
        $utils = Utils::find(1);

        return Inertia::render('Pengaturan/Kebijakan-Bantuan/Kebijakan', [
            'data' => $utils
        ]);
    }

    public function kebijakanPrivasiIndexStore(Request $request)
    {
        $request->validate([
            'kebijakan_privasi' => 'required'
        ]);

        try {
            $utils = Utils::find(1);
            if (!$utils) {
                Utils::create([
                    'kebijakan_privasi' => $request->kebijakan_privasi
                ]);
                $this->alert([
                    'type' => "success",
                    'message' => "Berhasil membuat kebijakan privasi!"
                ]);
            } else {
                $utils->kebijakan_privasi = $request->kebijakan_privsai;
                $utils->save();
                $this->alert([
                    'type' => "success",
                    'message' => "Gagal membuat kebijakan privasi!"
                ]);
            }
        } catch (\Exception $th) {
            $this->alert([
                'type' => "error",
                'message' => $th->getMessage()
            ]);
        }
    }

    public function bantuanIndex()
    {
        $utils = Utils::find(1);

        return Inertia::render('Pengaturan/Kebijakan-Bantuan/Bantuan', [
            'data' => $utils
        ]);
    }

    public function bantuanIndexStore(Request $request)
    {
        $request->validate([
            'bantuan' => 'required'
        ]);

        try {
            $utils = Utils::find(1);
            if (!$utils) {

                Utils::create([
                    'bantuan' => $request->bantuan
                ]);
                $this->alert([
                    'type' => "success",
                    'message' => "Berhasil membuat bantuan!"
                ]);
            } else {
                $utils->bantuan = $request->bantuan;
                $utils->save();
                $this->alert([
                    'type' => "success",
                    'message' => "Berhasil membuat bantuan!"
                ]);
            }
        } catch (\Exception $th) {
            $this->alert([
                'type' => "error",
                'message' => $th->getMessage()
            ]);
        }
    }

    public function syaratKetentuanIndex()
    {
        $utils = Utils::find(1);

        return Inertia::render('Pengaturan/SyaratKetentuan', [
            'data' => $utils
        ]);
    }

    public function syaratKetentuanIndexStore(Request $request)
    {
        $request->validate([
            'syarat_ketentuan' => 'required'
        ]);

        try {
            $utils = Utils::find(1);
            if (!$utils) {

                Utils::create([
                    'syarat_ketentuan' => $request->syarat_ketentuan
                ]);
                $this->alert([
                    'type' => "success",
                    'message' => "Berhasil membuat Syarat & Ketentuan!"
                ]);
            } else {
                $utils->syarat_ketentuan = $request->syarat_ketentuan;
                $utils->save();
                $this->alert([
                    'type' => "success",
                    'message' => "Berhasil membuat Syarat & Ketentuan!"
                ]);
            }
        } catch (\Exception $th) {
            $this->alert([
                'type' => "error",
                'message' => $th->getMessage()
            ]);
        }
    }
}
