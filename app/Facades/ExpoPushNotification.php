<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ExpoPushNotification extends Facade
{
  public static function getFacadeAccessor()
  {
    return 'expopushnotification';
  }
}
