import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BankTransferResponse, OtcResponse } from "@/types";
import { formatRupiah, isBankTransfer, isCstore } from "@/lib/utils";

interface VaVariantProps {
    data: BankTransferResponse | OtcResponse;
}
export default function VaVariant({ data }: VaVariantProps) {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Teks berhasil di salin!");
    };

    return (
        <Card className="max-w-3xl mx-auto mt-10 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-bold">
                    Detail Transaksi
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
                {/* Order & Payment */}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="text-muted-foreground">
                            Order ID
                        </Label>
                        <div className="flex items-center justify-between bg-muted rounded-md px-3 py-2 text-sm">
                            <span>{data.order_id}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopy(data.order_id)}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Label>Payment Type</Label>
                        <div className="capitalize">{data.payment_type}</div>
                    </div>
                    <div>
                        <Label>Total</Label>
                        <div className="text-green-600 font-medium">
                            {formatRupiah().format(Number(data.gross_amount))}
                        </div>
                    </div>
                    <div>
                        <Label>Status Transaksi</Label>
                        <Badge variant="outline" className="capitalize ml-3">
                            {data.transaction_status}
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Virtual Account */}
                {isBankTransfer(data) &&
                    data.va_numbers &&
                    data.va_numbers?.length > 0 && (
                        <div>
                            <Label>Virtual Account</Label>
                            {data.va_numbers.map((va, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-muted rounded-md px-3 py-2 mt-1"
                                >
                                    <span className="capitalize font-medium">
                                        {va.bank} - {va.va_number}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleCopy(va.va_number)}
                                        type="button"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                {isCstore(data) && data.payment_code && (
                    <div>
                        <Label>Kode Bayar</Label>
                        <div className="flex items-center justify-between bg-muted rounded-md px-3 py-2 mt-1">
                            <span className="capitalize font-medium">
                                {data.store} - {data.payment_code}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopy(data.payment_code)}
                                type="button"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                <Separator />

                {/* Waktu & ID Transaksi */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Waktu Transaksi</Label>
                        <div>{data.transaction_time}</div>
                    </div>
                    <div>
                        <Label>ID Transaksi</Label>
                        <div className="text-xs break-all">
                            {data.transaction_id}
                        </div>
                    </div>
                    <div>
                        <Label>Status Kode</Label>
                        <div>{data.status_code}</div>
                    </div>
                    <div>
                        <Label>Status Fraud</Label>
                        <div className="capitalize">{data.fraud_status}</div>
                    </div>
                    <div>
                        <Label>Merchant Id</Label>
                        <div className="capitalize">{data.merchant_id}</div>
                    </div>
                </div>

                <Separator />

                {/* Signature Key */}
                {data.signature_key && (
                    <div>
                        <Label>Signature Key</Label>
                        <div className="bg-muted text-xs p-3 rounded-md break-all relative">
                            <span>{data.signature_key}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => handleCopy(data.signature_key)}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* Status Message */}
                <div>
                    <Label>Status Message</Label>
                    <div>{data.status_message}</div>
                </div>
            </CardContent>
        </Card>
    );
}
