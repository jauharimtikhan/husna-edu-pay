<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notifikasi;
use App\Models\Transaksi;
use App\Services\ExpoPushTokenService;
use App\Traits\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotifikasiController extends Controller
{
    use JsonResponse;

    public function index(Request $request)
    {
        $notifikasis = Notifikasi::with(['user', 'tagihan', 'transaksi'])
            ->where('user_id', Auth::id())
            ->where('status', 'belum_dibaca')
            ->get();

        return self::toJson([
            'data' => $notifikasis,
            'total' => $notifikasis->count()
        ], "berhasil mendapatkan data notifikasi");
    }
    public function sendNotification(Request $request)
    {
        try {
            $datas = Notifikasi::where('status', 'belum_dibaca')
                ->where('user_id', Auth::id())
                ->get();

            // dd($datas->detail_charge);
            $push = new ExpoPushTokenService();
            $notification = [
                'body' => $request->body_pesan,
                'title' => $request->title_pesan,
                'data' => json_encode([
                    'total' => $datas->count(),
                    'message' => "Ada pesan baru masuk",
                    'channelId' => 'notifikasi_pembayaran'
                ])
            ];
            $push->sendSingle($request->token_user, $notification['title'], $notification['body'], $notification['data'], 'notifikasi_pembayaran');
            return self::toJson([], "Berhasil mengirim pesan");
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function updateAll()
    {
        $notifikasi = Notifikasi::where('user_id', Auth::id())
            ->where('status', 'belum_dibaca')
            ->get();

        foreach ($notifikasi as $notif) {
            $notif->status = 'dibaca';
            $notif->save();
        }

        return self::toJson([], "berhasil mengupdate status notifikasi");
    }
}
