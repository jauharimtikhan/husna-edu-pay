import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MidtransErrorResponseType } from "@/types";
import { TriangleAlert } from "lucide-react";

interface ErrorChargeAlertProps {
    error: MidtransErrorResponseType;
}

export default function ErrorChargeAlert({ error }: ErrorChargeAlertProps) {
    return (
        <Alert
            variant="destructive"
            className="max-w-2xl mx-auto mt-6 border-red-500 shadow-md"
        >
            <TriangleAlert className="h-5 w-5 text-red-500" />
            <AlertTitle className="font-bold text-red-700">
                Transaksi Gagal
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground space-y-4 mt-2">
                <div>
                    <span className="font-medium">Status Code:</span>{" "}
                    <Badge variant="destructive">{error.midtrans_code}</Badge>
                </div>

                <div>
                    <span className="font-medium">Pesan Error:</span>
                    <p className="text-destructive mt-1">{error.message}</p>
                </div>

                <Separator />
                {error.transaction_id && (
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mt-2">
                        {error.transaction_id && (
                            <div>
                                <span className="font-medium">
                                    Transaction ID:
                                </span>
                                <div className="break-all">
                                    {error.transaction_id}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </AlertDescription>
        </Alert>
    );
}
