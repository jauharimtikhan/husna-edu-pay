import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";

interface SectionCardProps {
    totalPendapatan: number;
    totalPengguna: number;
}

export function SectionCards({ ...props }: SectionCardProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Total Pendapatan</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {formatRupiah().format(props.totalPendapatan)}
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Total Pengguna</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {props.totalPengguna}
                    </CardTitle>
                </CardHeader>
            </Card>
        </div>
    );
}
