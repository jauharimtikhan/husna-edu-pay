<?php

namespace App\Enums;

enum StatusTransaksi: string
{
    case PENDING = 'pending';
    case AUTHORIZE = 'authorize';
    case FAILED = 'failed';
    case CAPTURE = 'capture';
    case SETTLEMENT = 'settlement';
    case DENY = 'deny';
    case CANCEL = 'cancel';
    case REFUND = 'refund';
    case PARTIAL_REFUND = 'partial_refund';
    case PARTIAL_CHARGEBACK = 'partial_chargeback';
    case EXPIRE = 'expire';
    case FAILURE = 'failure';
}
