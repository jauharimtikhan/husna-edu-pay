<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Utils extends Model
{
    protected $table = 'utils';
    protected $fillable = [
        'kebijakan_privasi',
        'bantuan',
    ];
}
