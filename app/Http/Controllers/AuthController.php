<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required|min:3'
        ]);

        $user = User::where('username', $request->username)
            ->orWhere('email', $request->username)
            ->first();
        if (!$user) {
            $this->alert([
                'type' => 'error',
                'message' => 'User tidak ditemukan!'
            ]);
        } else {

            if (!Hash::check($request->password, $user->password)) {
                $this->alert([
                    'type' => 'error',
                    'message' => 'Password salah!'
                ]);
            } else {
                if (!Auth::attempt($request->only(['username', 'password']))) {
                    $this->alert([
                        'type' => 'error',
                        'message' => 'Kredensial anda tidak sah!'
                    ]);
                } else {
                    return to_route('home.index')->with('alert', [
                        'type' => 'success',
                        'message' => "Selamat datang {$user->username}"
                    ]);
                }
            }
        }
    }

    public function logout()
    {
        Auth::logout();
        return to_route('login');
    }
}
