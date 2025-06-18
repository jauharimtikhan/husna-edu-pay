import {
    isBankTransfer,
    isCstore,
    isGopay,
    isQrCharge,
    isShopeepay,
} from "@/lib/utils";
import { MidtransChargeResponse, MidtransErrorResponseType } from "@/types";
import React from "react";
import VaVariant from "./VaVariant";
import ErrorChargeAlert from "./ErrorChargeAlert";
import QRVariant from "./QrVariant";

interface ResultChargeWrapper {
    data: MidtransChargeResponse | null;
    status_code: number | null;
    error: MidtransErrorResponseType | null;
}

export default function ResultChargeWrapper({
    data,
    status_code,
    error,
}: ResultChargeWrapper) {
    if (status_code && status_code !== 201 && error) {
        return <ErrorChargeAlert error={error} />;
    }
    if (data && isBankTransfer(data)) return <VaVariant data={data} />;
    if (data && isQrCharge(data)) return <QRVariant data={data} />;
    if (data && isGopay(data)) return <QRVariant data={data} />;
    if (data && isShopeepay(data)) return <QRVariant data={data} />;
    if (data && isCstore(data)) return <VaVariant data={data} />;
}
