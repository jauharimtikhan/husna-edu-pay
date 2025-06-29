import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";

interface PaymentData {
    name: string;
    value: number;
    percentage: string;
}

interface PaymentMethodPieChartProps {
    data: PaymentData[];
}

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82ca9d",
];

const PaymentMethodPieChart: React.FC<PaymentMethodPieChartProps> = ({
    data,
}) => {
    // Render custom label
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                className="text-xs font-medium"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background p-4 shadow-md rounded-md border border-foreground">
                    <p className="font-bold text-foreground">
                        {payload[0].name.replace("_", " ")}
                    </p>
                    <p className="text-sm">Jumlah: {payload[0].value}</p>
                    <p className="text-sm">
                        Persentase: {payload[0].payload.percentage}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[400px] bg-background p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
                Metode Pembayaran Favorit
            </h2>

            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                stroke="#f8fafc"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        formatter={(value, entry, index) => (
                            <span className="text-sm text-foreground">
                                {value.replace("_", " ")} -{" "}
                                {data[index]?.percentage}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PaymentMethodPieChart;
