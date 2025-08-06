<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExpoPushToken;
use App\Models\Notifikasi;
use App\Models\User;
use App\Models\Utils;
use App\Services\ExpoPushTokenService;
use App\Traits\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    use JsonResponse;
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $request->username)
            ->orWhere('email', $request->username)
            ->first();
        if (!$user) {
            return self::toJson([], "Pengguna tidak ditemukan", 404);
        }
        $expoToken = ExpoPushToken::where('device_id', $user->device_id)->first();
        if (!$expoToken) {
            ExpoPushToken::updateOrCreate([
                'device_id' => $user->device_id
            ], [
                'token' => $request->token
            ]);
        }

        if (!Hash::check($request->password, $user->password)) {
            return self::toJson([], "Password salah", 401);
        }
        if (!Auth::attempt($request->only(['username', 'password']))) {
            return self::toJson([], "Kredensial tidak sah", 401);
        }
        Auth::login($user);

        return self::toJson([
            'data' => [
                'user' => $user,
                'token' => $user->createToken('AuthToken', ['*'])->plainTextToken
            ]
        ], "Berhasil login!", 200);
    }

    public function me()
    {
        return self::toJson([
            'data' => Auth::user()
        ], "Berhasil mendapatkan data pengguna", 200);
    }

    public function storeExpoToken(Request $request)
    {
        $token = ExpoPushToken::updateOrCreate([
            'device_id' => $request->device_id
        ], [
            'token' => $request->token
        ]);
        return self::toJson([
            'data' => $token->toArray()
        ], "Berhasil menyimpan expo token");
    }

    public function updateDeviceId(Request $request)
    {
        $user = User::where('username', $request->username)->first();
        $user->device_id = $request->device_id;
        $user->save();
        return self::toJson([
            'data' => $user->toArray()
        ], "Berhasil mengupdate device Id");
    }

    public function logout()
    {
        Auth::logout();

        return self::toJson([], "Berhasil logout", 200);
    }



    public function updateProfile(Request $request)
    {
        $request->validate([
            'email'        => ['required', 'exists:users,email'],
            'nama_lengkap' => ['required', 'string'],
            'alamat'       => ['nullable', 'string'],
            'avatar'       => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        try {
            $user = User::firstWhere('email', $request->email)
                ?? User::firstWhere('username', $request->email);

            if (!$user) {
                Log::warning("Update Profile: User tidak ditemukan dengan email/username: {$request->email}");
                return response()->json([
                    'message' => 'User tidak ditemukan.',
                ], 404);
            }

            // Proses avatar
            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $fileName = Str::random(16) . '-' . Str::uuid() . '.' . $avatar->getClientOriginalExtension();
                $filePath = "avatar/$fileName";

                // Hapus avatar lama
                $oldAvatarPath = str_replace('storage/', '', $user->avatar);
                if ($user->avatar && Storage::disk('public')->exists($oldAvatarPath)) {
                    Storage::disk('public')->delete($oldAvatarPath);
                    Log::info("Update Profile: Avatar lama dihapus untuk user ID {$user->id}");
                }

                // Simpan avatar baru
                $avatar->storeAs('avatar', $fileName, 'public');
                $user->avatar = "storage/avatar/$fileName";
                Log::info("Update Profile: Avatar baru disimpan untuk user ID {$user->id} di path $filePath");
            }

            // Update data user
            $user->nama_lengkap = $request->nama_lengkap;
            $user->alamat = $request->alamat;
            $user->save();

            Log::info("Update Profile: Data profil berhasil diupdate untuk user ID {$user->id}");

            return response()->json([
                'message' => 'Berhasil mengupdate profile user',
                'data'    => $user,
            ], 200);
        } catch (\Throwable $e) {
            Log::error("Gagal update profil user: " . $e->getMessage(), [
                'request' => $request->all(),
            ]);

            return response()->json([
                'message' => 'Terjadi kesalahan saat mengupdate profil',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }


    public function updatePassword(Request $request)
    {
        $request->validate([
            'password_lama' => 'required',
            'password_baru' => 'required',
            'konfirmasi_password_baru' => 'same:password_baru',
            'email' => 'required|exists:users,email'
        ]);

        $user = User::where('email', $request->email)
            ->orWhere('username', $request->email)
            ->first();

        if (!Hash::check($request->password_lama, $user->password)) {
            return self::toJson([], "Password lama salah!");
        }
        $user->password = Hash::make($request->password_baru);
        $user->save();

        return self::toJson([
            'data' => $user
        ], "Berhasil mengupdate kata sandi!");
    }

    public function getBantuanContent()
    {
        $utils = Utils::find(1);
        if ($utils) {
            return self::toJson([
                'content' => $utils->bantuan
            ], "berhasil mendapatkan konten bantuan");
        } else {
            return self::toJson([
                'content' => null
            ], "gagal mendapatkan konten bantuan");
        }
    }

    public function getKebijakanPrivasiContent()
    {
        $utils = Utils::find(1);
        if ($utils) {
            return self::toJson([
                'content' => $utils->kebijakan_privasi
            ], "berhasil mendapatkan konten kebijakan privasi");
        } else {
            return self::toJson([
                'content' => null
            ], "gagal mendapatkan konten kebijakan privasi");
        }
    }

    public function getSyaratKetentuanContent()
    {
        $utils = Utils::find(1);
        if ($utils) {
            return self::toJson([
                'content' => $utils->syarat_ketentuan
            ], "berhasil mendapatkan konten syarat ketentuan");
        } else {
            return self::toJson([
                'content' => null
            ], "gagal mendapatkan konten syarat ketentuan");
        }
    }
}
