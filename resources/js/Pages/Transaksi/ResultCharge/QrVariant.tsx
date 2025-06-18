import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatRupiah } from "@/lib/utils";
import { GoPayResponse, QrisResponse, ShopeepayResponse } from "@/types";

interface QRVariantProps {
    data: QrisResponse | GoPayResponse | ShopeepayResponse;
}

export default function QRVariant({ data }: QRVariantProps) {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Teks berhasil di salin!");
    };

    const qrUrl = data.actions?.find((action) =>
        ["generate-qr-code", "deeplink-redirect"].includes(action.name)
    )?.url;

    const actionName = data.actions?.find((action) =>
        ["generate-qr-code", "deeplink-redirect"].includes(action.name)
    )?.name;

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
                        <Label>Order ID</Label>
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

                {/* QR Code */}
                {data.payment_type !== "shopeepay" && qrUrl && (
                    <div>
                        <div className="text-center">
                            <Label className="block mb-2">
                                QR Code Pembayaran
                            </Label>
                            <div className="inline-block bg-white p-2 border rounded-md">
                                <img
                                    src={qrUrl}
                                    alt="QR Code"
                                    className="w-40 h-40 mx-auto object-contain"
                                />
                            </div>
                        </div>
                        <Label>{actionName}</Label>
                        <div className="flex items-center justify-between bg-muted rounded-md px-3 py-2 mt-1">
                            <span className=" font-medium">{qrUrl}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopy(qrUrl)}
                                type="button"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
                {data.payment_type === "shopeepay" && qrUrl && (
                    <div>
                        <Label>URL Pembayaran</Label>
                        <div className="flex items-center justify-between bg-muted rounded-md px-3 py-2 mt-1">
                            <span className=" font-medium">{qrUrl}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopy(qrUrl)}
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
                        <div className="capitalize">
                            {data.fraud_status ?? "-"}
                        </div>
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
