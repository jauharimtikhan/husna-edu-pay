<?php

namespace App\Services;

use ErrorException;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class ExpoPushTokenService
{
  protected $client;

  public function __construct()
  {
    $this->client = new Client(['base_uri' => 'https://exp.host/--/api/v2/push/send']);
  }

  public function send(array $tokens, string $title, string $body, mixed $data = null): array
  {
    $responses = [];

    foreach ($tokens as $token) {
      if (!$this->isValidExpoToken($token)) {
        Log::warning("Invalid Expo token: $token");
        throw new ErrorException("Invalid Expo token: $token");
      }

      try {
        $payload = [
          'to' => $token,
          'title' => $title,
          'body' => $body,
          'sound' => 'default',
        ];

        if ($data !== null) {
          $payload['data'] = $data;
        }

        $response = $this->client->post('', ['json' => $payload]);

        $responses[] = json_decode($response->getBody(), true);
      } catch (\Throwable $e) {
        Log::error("Gagal kirim push ke $token: " . $e->getMessage());
        throw $e;
      }
    }

    return $responses;
  }
  public function sendSingle($token, string $title, string $body, mixed $data = null, string $channelId = ""): array
  {
    $responses = [];

    if (!$this->isValidExpoToken($token)) {
      Log::warning("Invalid Expo token: $token");
      throw new ErrorException("Invalid Expo token: $token");
    }

    try {
      $payload = [
        'to' => $token,
        'title' => $title,
        'body' => $body,
        'sound' => 'default',
        'channelId' => $channelId
      ];

      if ($data !== null) {
        $payload['data'] = $data;
      }

      $response = $this->client->post('', ['json' => $payload]);
      $responses[] = json_decode($response->getBody(), true);
    } catch (\Throwable $e) {
      Log::error("Gagal kirim push ke $token: " . $e->getMessage());
      throw $e;
    }

    return $responses;
  }
  protected  function isValidExpoToken(string $token): bool
  {
    return str_starts_with($token, 'ExponentPushToken[');
  }
}
