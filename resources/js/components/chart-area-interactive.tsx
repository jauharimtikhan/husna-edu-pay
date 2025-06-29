"use client";

import * as React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Cell,
} from "recharts";

import { useIsMobile } from "@/Hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltip } from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatRupiah } from "@/lib/utils";

import { format } from "date-fns";
import { id } from "date-fns/locale";

type PendapatanData = {
    bulan: string;
    total: number;
};

export function ChartBarInteractive({ data }: { data: PendapatanData[] }) {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("30d");

    const formatted = data.map((item) => ({
        bulan: item.bulan,
        total: item.total,
    }));

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const filteredData = formatted.filter((_, index) => {
        if (timeRange === "30d") return index < 12; // 12 bulan terakhir
        if (timeRange === "7d") return index < 6; // 6 bulan terakhir
        return index < 24; // Semua data (maks 24 bulan)
    });

    // Warna gradient untuk bar chart
    const getBarColor = (value: number) => {
        const maxValue = Math.max(...filteredData.map((item) => item.total), 1); // Hindari pembagi 0
        const ratio = value / maxValue;
        const hue = 200 + Math.floor(60 * ratio); // Biru ke hijau (200-260)
        return `hsl(${hue}, 70%, 50%)`;
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
                    <p className="font-bold text-gray-800">
                        {format(payload[0].payload.bulan, "MMMM yyyy", {
                            locale: id,
                        })}
                    </p>
                    <p className="text-sm text-gray-600">
                        Total: {formatRupiah().format(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Format label untuk sumbu X (mobile vs desktop)
    const formatXAxisLabel = (value: string) => {
        if (isMobile) {
            // Jika format "MMM-YYYY", ambil bulan saja? Tergantung data
            // Asumsi data bulan dalam format "Jan-2024"
            return value.split("-")[0]; // Hanya bulan di mobile
        }
        return value;
    };

    return (
        <Card className="@container/card">
            <CardHeader className="relative">
                <CardTitle>Total Pendapatan Per Bulan</CardTitle>
                <div className="absolute top-6 right-6">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Rentang" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">6 Bulan</SelectItem>
                            <SelectItem value="30d">12 Bulan</SelectItem>
                            <SelectItem value="all">Semua</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={filteredData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: isMobile ? 60 : 50, // Perbesar bottom margin untuk label yang diputar
                            }}
                        >
                            <XAxis
                                dataKey="bulan"
                                angle={isMobile ? -45 : 0}
                                textAnchor={isMobile ? "end" : "middle"}
                                height={isMobile ? 80 : 40} // Tinggi lebih untuk mobile karena rotasi
                                tick={{ fontSize: 12 }}
                                tickFormatter={formatXAxisLabel}
                            />
                            <YAxis
                                tickFormatter={(value) =>
                                    formatRupiah().format(value).trim()
                                }
                                width={isMobile ? 60 : 80}
                                tick={{ fontSize: 12 }}
                            />
                            <ChartTooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="total"
                                name="Total Pendapatan"
                                radius={[4, 4, 0, 0]}
                            >
                                {/* PERBAIKAN DI SINI: Gunakan Cell untuk warna */}
                                {filteredData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={getBarColor(entry.total)}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
