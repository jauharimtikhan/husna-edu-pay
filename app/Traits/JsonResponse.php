<?php

namespace App\Traits;

trait JsonResponse
{
    public static function toJson(array $data, string $message = "", int $code = 200)
    {
        $response = array_merge($data, [
            'message' => $message
        ]);

        return response()->json($response, $code);
    }
}
