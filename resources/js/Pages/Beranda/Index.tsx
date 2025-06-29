import { ChartBarInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import PaymentMethodPieChart from "@/components/PaymentMethodChart";
import { SectionCards } from "@/components/section-cards";
import UseToast from "@/Hooks/UseToast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import React from "react";
type PendapatanData = {
    bulan: string;
    total: number;
};
interface HomeIndexProps extends PageProps {
    totalPendapatan: number;
    totalPengguna: number;
    pendapatanPerBulan: PendapatanData[];
    payment_method_stat: {
        name: string;
        value: number;
        percentage: string;
    }[];
}
export default function Index({
    alert,
    totalPendapatan,
    totalPengguna,
    pendapatanPerBulan,
    payment_method_stat,
}: HomeIndexProps) {
    UseToast(alert);

    return (
        <AuthenticatedLayout>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards
                            totalPendapatan={totalPendapatan}
                            totalPengguna={totalPengguna}
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
                            <ChartBarInteractive data={pendapatanPerBulan} />

                            <PaymentMethodPieChart data={payment_method_stat} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
