import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
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
}
export default function Index({
    alert,
    totalPendapatan,
    totalPengguna,
    pendapatanPerBulan,
}: HomeIndexProps) {
    UseToast(alert);
    console.log(pendapatanPerBulan);

    return (
        <AuthenticatedLayout>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards
                            totalPendapatan={totalPendapatan}
                            totalPengguna={totalPengguna}
                        />
                        <div className="px-4 lg:px-6">
                            <ChartAreaInteractive data={pendapatanPerBulan} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
