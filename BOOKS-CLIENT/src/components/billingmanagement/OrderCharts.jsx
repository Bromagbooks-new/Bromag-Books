"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
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
} from "../ui/select";
import { useState } from "react";
import { GetDashboardAnalytics } from "@/config/routeApi/owner";
import { useLoaderData } from "react-router-dom";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
 
};

export function Chart({data}) {
  // console.log('data:', data)
  let ordersData = [
      { mode: "Take Away", percent: 60, fill: "#3EE54F" },
    { mode: "Online", percent: 30, fill: "#FADF53" },
    { mode: "Dine In", percent: 10, fill: "#2AA4FC" },
  ];

  Object.keys(data).forEach(key=> {
    if(key==='online') ordersData[1].percent = data[key] || 10;
    if(key==='takeaway') ordersData[0].percent = data[key] || 20;
    if(key==='dinein') ordersData[2].percent = data[key] || 15;
  });

  // console.log(ordersData);

  return (
    <div className="flex flex-col w-1/3">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square min-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={ordersData}
            dataKey="percent"
            nameKey="mode"
            innerRadius={90}
            label
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

const OrderCharts = () => {

  const stats = useLoaderData();
  // console.log(stats);

  const [filter, setFilter] = useState("monthly");
  console.log('filter:', filter)

  let filtredStats = stats.monthlyStats;

  if(filter === 'today') {
    filtredStats = stats.dailyStats;
  }
  if(filter === 'weekly') {
    filtredStats = stats.weeklyStats;
  }
  if(filter === 'monthly') {
    filtredStats = stats.monthlyStats;
  }

  return (
    <div className="p-4 h-[90%] rounded-xl bg-white shadow-md w-full">
      <p className="text-2xl font-semibold">Total Orders</p>
      <div className="flex justify-start gap-32 px-10">
        <Chart data={filtredStats.orderTypeBreakdown} />
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">

          <p className="">Sory By</p>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
            </div>
          <div className="flex flex-col gap-3">
            <p className="">Chart Legends</p>
            <div className="flex gap-1 font-bold">
              <div className="rounded-full w-4 h-4 bg-[#FADF53]" />
              <p>Online Orders</p>
            </div>
            <div className="flex gap-1 font-bold">
              <div className="rounded-full w-4 h-4 bg-[#2AA4FC]" />
              <p>Dine In Orders</p>
            </div>
            <div className="flex gap-1 font-bold">
              <div className="rounded-full w-4 h-4 bg-[#3EE54F]" />
              <p>Takeaway Orders</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
            <div className="flex flex-col gap-2">
                <p className="text-xl">Total Orders</p>
                <p className="text-3xl font-bold">{filtredStats.totalBills}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-xl">New Orders</p>
                <p className="text-3xl font-bold">{filtredStats.billsWithSameItems}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-xl">Repeat Orders</p>
                <p className="text-3xl font-bold">{filtredStats.billsWithRepeatedItems}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-xl">Repeat Rate (%) </p>
                <p className="text-3xl font-bold">{filtredStats.repeatRate}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCharts;

export const orderChartsLoader = async ()=> {

  try {
    const response = await GetDashboardAnalytics({date: new Date()});
    console.log('response1:', response)

    if(response.status === 200) {
      // console.log(response.data);
      return response.data.stats;
    }
  } catch(error) {
    console.error(error);
  }
}