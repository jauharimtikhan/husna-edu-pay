<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpoPushToken extends Model
{
    protected $fillable = [
        'token',
        'device_id',
    ];
}
