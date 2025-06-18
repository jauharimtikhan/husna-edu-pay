import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import { formatRupiah } from "@/lib/utils";
import { Link, router } from "@inertiajs/react";

interface PaymentSuccessProps {
    response: {
        orderId: string;
        transactionStatus: string;
        grossAmount: number;
        paymentType: string;
    };
}

export default function PaymentSuccessPage({ response }: PaymentSuccessProps) {
    return (
        <GuestLayout>
            <div className="flex min-h-screen items-center justify-center px-4 py-12">
                <Card className="max-w-md w-full rounded-2xl shadow-lg">
                    <CardHeader className="flex flex-col items-center text-center">
                        <CheckCircle2 className="text-green-500 w-12 h-12 mb-2" />
                        <CardTitle className="text-xl font-semibold text-green-600">
                            Pembayaran Berhasil
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                            Terima kasih! Pembayaran kamu telah diterima.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-gray-700">
                        <Button
                            className="w-full mt-6"
                            variant="default"
                            asChild
                        >
                            <Link href={route("home.index")}>
                                Kembali ke Beranda
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
