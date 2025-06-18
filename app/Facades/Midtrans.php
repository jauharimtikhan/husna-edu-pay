<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Midtrans extends Facade
{
  public static function getFacadeAccessor()
  {
    return 'midtrans';
  }
}
