<?php

namespace App\Http\Controllers;

use App\Models\Tagihan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TagihanController extends Controller
{
    public function index(Request $request)
    {
        $query = Tagihan::with('user');
        // Filter berdasarkan Nama Pengguna (relasi ke tabel user)
        if ($request->filled('nama_pengguna')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('username', 'like', '%' . $request->nama_pengguna . '%');
            });
        }

        // Filter berdasarkan Kode Tagihan
        if ($request->filled('kode_tagihan')) {
            $query->where('kode_tagihan', 'like', '%' . $request->kode_tagihan . '%');
        }

        // Filter berdasarkan Tanggal
        if ($request->filled('tanggal')) {
            try {
                $decoded = urldecode($request->tanggal); // 2025-06-27T00:00
                $tanggal = \Carbon\Carbon::parse($decoded)->timezone('Asia/Jakarta')->toDateString();
                $query->whereDate('tanggal', 'like', "%$tanggal%");
            } catch (\Exception $e) {
                // Kalau gagal parsing (misal format aneh), bisa log atau abaikan
                Log::warning('Tanggal filter invalid: ' . $request->tanggal);
            }
        }

        // Filter berdasarkan Status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Ambil data paginasi dan tetap sertakan query string pencarian
        $tagihans = $query->latest()->paginate(25)->withQueryString();

        return Inertia::render('Tagihan/Index', [
            'tagihans' => $tagihans
        ]);
    }

    public function edit(string $id)
    {
        return Inertia::render('Tagihan/Update', [
            'tagihan' => Tagihan::with('user')
                ->orderBy('tanggal', 'ASC')
                ->where('id', $id)->first(),
            'users' => User::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Tagihan/Create',  [
            'users' => User::all()
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'nama_tagihan' => 'required',
            'kode_tagihan' => 'required|unique:tagihans,kode_tagihan',
            'user_id' => 'required|exists:users,id',
            'tanggal' => 'required',
            'status' => 'required',
            'nominal' => 'required',
        ]);

        try {
            Tagihan::create($request->all());
            $user = User::where('id', $request->user_id)->first();
            return $this->redirectWithAlert([
                'type' => 'success',
                'message' => "Berhasil membuat tagihan baru untuk pengguna {$user->username}"
            ], 'tagihan.create');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function storeMultiple(Request $request)
    {
        $request->validate([
            'nama_tagihan' => 'required',
            'user_id' => 'required|exists:users,id',
            'tanggal' => 'required',
            'status' => 'required',
            'nominal' => 'required',
            'generate' => "required|numeric|min:1"
        ]);

        for ($i = 0; $i < $request->generate; $i++) {
            Tagihan::create([
                'nama_tagihan' => $request->nama_tagihan . '-' . Str::random(6),
                'kode_tagihan' => $this->generateInvoiceCodeNew(),
                'user_id' => $request->user_id,
                'tanggal' => $request->tanggal,
                'status' => 'capture',
                'nominal' => $request->nominal,
            ]);
        }
        $user = User::where('id', $request->user_id)->first();
        return $this->redirectWithAlert([
            'type' => 'success',
            'message' => "Berhasil membuat tagihan baru untuk pengguna {$user->username} sebanayak {$request->generate}"
        ], 'tagihan.create');
    }

    public function update(string $id, Request $request)
    {

        $request->validate([
            'nama_tagihan' => 'required',
            'user_id' => 'required|exists:users,id',
            'tanggal' => 'required',
            'status' => 'required',
            'nominal' => 'required',
        ]);

        try {
            $tagihan = Tagihan::find($id);
            $tagihan->update([
                'nama_tagihan' => $request->nama_tagihan,
                'user_id' => $request->user_id,
                'tanggal' => $request->tanggal,
                'status' => $request->status,
                'nominal' => $request->nominal,
            ]);
            $user = User::where('id', $request->user_id)->first();
            return $this->redirectWithAlert([
                'type' => 'success',
                'message' => "Berhasil update data tagihan milik pengguna {$user->username}"
            ], 'tagihan.edit', ['id' => $id]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function destroy(string $id)
    {
        try {
            $tagihan = Tagihan::find($id);

            if ($tagihan) {
                $tagihan->delete();
                return $this->redirectWithAlert([
                    'type' => 'success',
                    'message' => "Berhasil menghapus data tagihan dengan ID: {$tagihan->id}!"
                ], 'tagihan.index');
            } else {
                return $this->redirectWithAlert([
                    'type' => 'error',
                    'message' => "Data tagihan dengan ID: {$tagihan->id} tidak ditemukan!"
                ], 'tagihan.index');
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function search(Request $request)
    {
        $query = Tagihan::with('user')
            // Hanya tampilkan tagihan yang tidak berstatus 'pending'
            // Jangan tampilkan jika sudah ada transaksi dengan tagihan_id = id
            ->whereDoesntHave('transaksi');

        // Jika ada pencarian
        if ($request->filled('q')) {
            $search = $request->q;

            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('username', 'like', '%' . $search . '%');
                })
                    ->orWhere('kode_tagihan', 'like', '%' . $search . '%')
                    ->orWhere('status', 'like', '%' . $search . '%');
            });
        }

        $tagihans = $query->latest()->get();

        if ($tagihans->isNotEmpty()) {
            return $this->json([
                'success' => true,
                'data' => $tagihans,
                'message' => 'Data tagihan ditemukan!'
            ]);
        }

        return $this->json([
            'success' => false,
            'message' => 'Data tagihan tidak ditemukan!',
            'data' => null
        ], 404);
    }
}
