<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->filled('nama_pengguna')) {
            $query->where('username', 'like', "%{$request->nama_pengguna}%");
        }

        $users = $query->latest()->paginate(25)->withQueryString();
        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_pengguna' => 'required|unique:users,username',
            'password' => 'required',
        ]);

        try {
            User::create([
                'username' => $request->nama_pengguna,
                'password' => Hash::make($request->password),
                'email' => $request->nama_pengguna . "@al-husna.my.id"
            ]);
            $this->alert([
                'type' => 'success',
                'message' => "Berhasil membuat pengguna baru!"
            ]);
        } catch (\Exception $th) {
            dd($th->getMessage());
            $this->alert([
                'type' => 'error',
                'message' => "Gagal membuat pengguna baru!"
            ]);
        }
    }

    public function update(string $id, Request $request)
    {
        try {
            $user = User::find($id);
            $user->username = $request->nama_pengguna;
            $user->password = $request->password;
            $user->save();
            $this->alert([
                'type' => 'success',
                'message' => "Berhasil mengupdate data pengguna!"
            ]);
        } catch (\Exception $th) {
            $this->alert([
                'type' => 'error',
                'message' => "Gagal mengupdate data pengguna!"
            ]);
        }
    }

    public function destroy(string $id)
    {
        try {
            $user = User::find($id);
            if ($user->id === Auth::id()) {
                $this->alert([
                    'type' => 'error',
                    'message' => "Gagal menghapus data pengguna!, Anda sedang login tidak bisa menghapus data sendiri 😜"
                ]);
                return;
            }
            $user->delete();
            $this->alert([
                'type' => 'success',
                'message' => "Berhasil menghapus data pengguna!"
            ]);
        } catch (\Exception $th) {
            $this->alert([
                'type' => 'error',
                'message' => "Gagal menghapus data pengguna!"
            ]);
        }
    }
}
