"use client";

import { useState } from "react";
import { Pie, PieChart } from "recharts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export function Chart({ data, vegCount, nonVegCount }) {
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 w-full">
            <div className="w-full lg:w-1/2 flex justify-center">
                <PieChart width={450} height={350}>
                    <Pie
                        data={data}
                        dataKey="percent"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={90}
                        outerRadius={140}
                        label={({ percent }) => `${percent}%`}
                        isAnimationActive={false}
                    />
                </PieChart>
            </div>
            <div className="flex flex-row w-full lg:w-1/2 gap-5">
                <div className="text-gray-600">
                    <p className="text-lg lg:text-xl font-semibold">Chart Legends</p>
                    {data.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center gap-2">
                            <div
                                style={{ backgroundColor: entry.fill }}
                                className="w-4 h-4 rounded-full"
                            />
                            <p className="text-xl lg:text-md">{entry.name}</p>
                        </div>
                    ))}
                </div>
                <div className="text-gray-600">
                    <p className="text-lg lg:text-xl">Available Products</p>
                    <p className="text-2xl lg:text-3xl font-bold">0000</p>
                    <p className="text-lg lg:text-xl mt-4">Balance Products</p>
                    <p className="text-2xl lg:text-3xl font-bold">0000</p>
                    <p className="text-lg lg:text-xl mt-4">Veg Items</p>
                    <p className="text-2xl lg:text-3xl font-bold">{vegCount}</p>
                    <p className="text-lg lg:text-xl mt-4">Non Veg Items</p>
                    <p className="text-2xl lg:text-3xl font-bold">{nonVegCount}</p>
                </div>
            </div>
        </div>
    );
}

const PieChartComponent = ({ chartData }) => {
    const [filter, setFilter] = useState("month");
    console.log("component", chartData);

    // Select data based on filter
    const filteredData = chartData[filter]?.chartData.map(item => ({
        ...item,
        percent: parseFloat(item.percent),
    })) || [];

    const vegCount = chartData[filter]?.vegCount || 0;
    const nonVegCount = chartData[filter]?.nonVegCount || 0;

    return (
        <div className="p-4 h-[100%] rounded-xl bg-white shadow-md w-full">
            <p className="text-xl lg:text-2xl font-semibold">Inventory</p>
            <div className="flex flex-col lg:flex-row justify-start gap-8 lg:gap-10 px-4 lg:px-10">
                <Chart data={filteredData} vegCount={vegCount} nonVegCount={nonVegCount} />
                <div className="flex flex-col gap-2 mt-4 lg:mt-6">
                    <p className="text-md ml-2 lg:text-lg">Sort By</p>
                    <Select value={filter} onValueChange={setFilter} >
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Today</SelectItem>
                            <SelectItem value="week">Weekly</SelectItem>
                            <SelectItem value="month">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default PieChartComponent;
