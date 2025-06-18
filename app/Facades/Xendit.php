<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Xendit extends Facade
{
  public static function getFacadeAccessor()
  {
    return 'xendit';
  }
}
