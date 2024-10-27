"use client";

import { Pie, PieChart } from "recharts";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const chartData = [
    { name: "Product Name 1", percent: 33, fill: "#339AF0" },
    { name: "Product Name 2", percent: 12, fill: "#FFA94D" },
    { name: "Product Name 3", percent: 12, fill: "#FCC419" },
    { name: "Product Name 4", percent: 13, fill: "#51CF66" },
    { name: "Product Name 5", percent: 12, fill: "#94D82D" },
    { name: "Product Name 6", percent: 25, fill: "#FCC2C3" },
    { name: "Product Name 7", percent: 25, fill: "#D9480F" },
    { name: "Product Name 8", percent: 25, fill: "#38D9A9" },
    { name: "Product Name 9", percent: 25, fill: "#845EF7" },
    { name: "Product Name 11", percent: 25, fill: "#F03E3E" },
];

export function Chart({ data = chartData }) {
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 w-full">
            <div className="w-full lg:w-1/2 flex justify-center">
                <PieChart width={250} height={250}>
                    <Pie
                        data={data}
                        dataKey="percent"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        label={({ percent }) => `${percent}%`}
                        isAnimationActive={false}
                    />
                </PieChart>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 gap-4">
                <div className="text-gray-600">
                    <p className="text-lg lg:text-xl font-semibold">Chart Legends</p>
                    {data.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center gap-2">
                            <div
                                style={{ backgroundColor: entry.fill }}
                                className="w-4 h-4 rounded-full"
                            />
                            <p className="text-sm lg:text-md">{entry.name}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-gray-600">
                    <p className="text-lg lg:text-xl">Available Products</p>
                    <p className="text-2xl lg:text-3xl font-bold">0000</p>
                    <p className="text-lg lg:text-xl mt-4">Balance Products</p>
                    <p className="text-2xl lg:text-3xl font-bold">0000</p>
                    <p className="text-lg lg:text-xl mt-4">Veg Items</p>
                    <p className="text-2xl lg:text-3xl font-bold">0000</p>
                    <p className="text-lg lg:text-xl mt-4">Non Veg Items</p>
                    <p className="text-2xl lg:text-3xl font-bold">0000</p>
                </div>
            </div>
        </div>
    );
}

const PieChartComponent = () => {
    const [filter, setFilter] = useState("monthly");

    return (
        <div className="p-4 h-[90%] rounded-xl bg-white shadow-md w-full">
            <p className="text-xl lg:text-2xl font-semibold">Inventory</p>
            <div className="flex flex-col lg:flex-row justify-start gap-8 lg:gap-10 px-4 lg:px-10">
                <Chart data={chartData} />
                <div className="flex flex-col gap-4 mt-4 lg:mt-6">
                    <p className="text-md lg:text-lg">Sort By</p>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default PieChartComponent;
