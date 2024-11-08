import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Link, useLoaderData } from "react-router-dom";
import AnalyticsCard from "@/components/ordermanagement/AnalyticsCard";
import Online from "@/assets/images/billing-management/Online.svg";
import OnlineActivated from "@/assets/images/billing-management/OnlineActivated.svg";
import Takeaway from "@/assets/images/billing-management/Takeaway.svg";
import TakeawayActivated from "@/assets/images/billing-management/TakeawayActivated.svg";
import Dinein from "@/assets/images/billing-management/Dinein.svg";
import DineinActivated from "@/assets/images/billing-management/DineinActivated.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnalyticsCardDashboard from "@/components/dashboardmanagement/AnalyticCardDashboard";
import { getDashboardCard, getSalesSummary } from "@/config/routeApi/owner";

const TotalSales = () => {
    const [sortOption, setSortOption] = useState("Month");
    const [salesSummary, setSalesSummary] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSalesSummary();
                console.log("asa", response.data)
                if (response.status === 200) {
                    setSalesSummary(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    // Dynamically set data based on selected sort option
    const salesData = {
        labels: Array.from({ length: salesSummary?.graphData?.[sortOption.toLowerCase()]?.length || 30 }, (_, i) => i + 1),
        datasets: [
            {
                label: "Sales",
                data: salesSummary?.graphData?.[sortOption.toLowerCase()] || [],
                fill: true,
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                borderColor: "#16A34A",
                pointBackgroundColor: "#16A34A",
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="w-full mt-4 border py-4 px-2 sm:px-4 flex flex-col gap-2 bg-white rounded-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold">Total Sales</h2>
            <div className="flex flex-col sm:flex-row gap-5 mb-4">
                <div className="w-full sm:w-auto">
                    <label className="block text-sm font-medium mb-1 ml-2 sm:ml-4 text-slate-500">Select Product</label>
                    <select
                        className="w-full sm:w-56 border border-gray-300 p-2 rounded ml-2 sm:ml-4"
                        style={{ height: '6vh', background: 'rgba(245, 246, 250, 1)' }}
                    >
                        <option value="All Products">All Products</option>
                        <option value="Product A">Product A</option>
                        <option value="Product B">Product B</option>
                    </select>
                </div>
                <div className="w-full sm:w-auto sm:mt-0">
                    <label className="block text-sm font-medium mb-1 ml-2 sm:ml-4 text-slate-500">Sort by</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-full sm:w-56 border border-gray-300 p-2 rounded ml-2 sm:ml-4"
                        style={{ height: '6vh' }}
                    >
                        <option value="Month">Month</option>
                        <option value="Day">Day</option>
                        <option value="Week">Week</option>
                    </select>
                </div>
                <div className="flex justify-between sm:justify-start sm:gap-4 w-full sm:w-auto">
                    <div className="flex flex-col items-center sm:items-start">
                        <span className="block text-sm font-medium mb-1 text-slate-500">Avg. Sales</span>
                        <span className="text-5xl font-bold text-slate-500">{salesSummary?.totalSales?.today || 0}</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                        <span className="block text-sm font-medium mb-1 text-slate-500">Total Avg. Sales</span>
                        <span className="text-5xl font-bold text-slate-500">{salesSummary?.totalSales?.lastMonth || 0}</span>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-64 sm:h-80 bg-[#E9FFF4]">
                <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

const DashboardMain = () => {
    const salesSummary = useLoaderData();
    console.log("summa", salesSummary)
    return (
        <div className="w-full h-full border py-4 px-2 sm:px-4 flex flex-col gap-4">
            <ScrollArea className="h-[45rem] w-full overflow-visible z-20" type="scroll">
                <div className="flex gap-4">
                    <p className="text-2xl sm:text-3xl font-bold">Dashboard</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap">
                    {orderOptions.map((item) => (
                        <Link to={item.url} key={item.id} className="flex-1">
                            <AnalyticsCardDashboard
                                id={item.id}
                                title={item.title}
                                url={item.url}
                                icon={item.icon}
                                activatedIcon={item.activatedIcon}
                                activatedClass={item.activatedClass}
                                breakdown={salesSummary || {}}
                            />
                        </Link>
                    ))}
                </div>
                <TotalSales />
            </ScrollArea>
        </div>
    );
};

export default DashboardMain;

export const DashboardSaleLoader = async () => {
    try {
        const response = await getDashboardCard({ date: new Date() });
        if (response.status === 200) {
            console.log("API Response:", response.data);
            return response.data.totalSales;
        }
    } catch (error) {
        console.error("Failed to fetch sales summary:", error);
    }
    return null;
};

const orderOptions = [
    {
        id: "sales",
        title: "Sales",
        icon: Online,
        activatedIcon: OnlineActivated,
        url: "/dashboard/sale",
        activatedClass: "bg-[#FFE588] border-2 border-[#CF9710]",
    },
    {
        id: "orders",
        title: "Orders",
        icon: Takeaway,
        activatedIcon: TakeawayActivated,
        url: "/dashboard/order",
        activatedClass: "bg-[#FFD6B1] border-2 border-[#DD6031]",
    },
    {
        id: "dominant",
        title: "Dominant",
        icon: Dinein,
        activatedIcon: DineinActivated,
        url: "/dashboard/dominant",
        activatedClass: "bg-[#CAC9FF] border-2 border-[#5A57D0]",
    },
    {
        id: "inventory",
        title: "Inventory",
        icon: Dinein,
        activatedIcon: DineinActivated,
        url: "/dashboard/inventory",
        activatedClass: "bg-[#CAC9FF] border-2 border-[#5A57D0]",
    },
];
