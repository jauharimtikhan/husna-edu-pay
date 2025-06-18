"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/Hooks/use-mobile";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatRupiah } from "@/lib/utils";
type PendapatanData = {
    bulan: string;
    total: number;
};

export function ChartAreaInteractive({ data }: { data: PendapatanData[] }) {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("30d");
    const formatted = data.map((item) => ({
        date: item.bulan + "-01", // supaya cocok dengan format date di XAxis
        total: item.total,
    }));
    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const filteredData = formatted.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date("2024-06-30");
        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card className="@container/card">
            <CardHeader className="relative">
                <CardTitle>Total Pendapatan Per Bulan</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <div className="aspect-auto h-[250px] w-full">
                    <AreaChart
                        width={isMobile ? 350 : 800}
                        height={300}
                        data={formatted}
                    >
                        <defs>
                            <linearGradient
                                id="colorTotal"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="hsl(var(--chart-1))"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="hsl(var(--chart-1))"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="date" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <ChartTooltip />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="hsl(var(--chart-1))"
                            fillOpacity={1}
                            fill="url(#colorTotal)"
                        />
                    </AreaChart>
                </div>
            </CardContent>
        </Card>
    );
}
