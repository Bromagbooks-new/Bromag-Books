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
import { getDashboardCard, getVegNonVegSummary } from "@/config/routeApi/owner";

const TotalSales = () => {
    const [selectedProduct, setSelectedProduct] = useState("Veg");
    const [sortOption, setSortOption] = useState("Month");
    const [salesData, setSalesData] = useState({
        labels: Array(30).fill(0).map((_, i) => i + 1),
        datasets: [
            {
                label: "Sales",
                data: Array(30).fill(0).map(() => Math.random() * 100),
                fill: true,
                backgroundColor: "rgba(92, 122, 143, 1)",
                borderColor: "#16A34A",
                pointBackgroundColor: "#16A34A",
                tension: 0.4
            }
        ]
    });

    // Fetch data based on selected product and sort option
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getVegNonVegSummary();
                if (response.status === 200) {
                    const data = response.data.chartData;
                    let chartData = [];
                    let labels = [];

                    if (selectedProduct === "Both") {
                        chartData = [
                            {
                                label: "Veg Sales",
                                data:
                                    sortOption === "Month"
                                        ? data.month.veg
                                        : sortOption === "Week"
                                            ? data.week.veg
                                            : data.day.veg,
                                fill: true,
                                backgroundColor: "rgba(92, 122, 143, 1)",
                                borderColor: "#16A34A",
                                pointBackgroundColor: "#16A34A",
                                tension: 0.4
                            },
                            {
                                label: "Non-Veg Sales",
                                data:
                                    sortOption === "Month"
                                        ? data.month.nonVeg
                                        : sortOption === "Week"
                                            ? data.week.nonVeg
                                            : data.day.nonVeg,
                                fill: true,
                                backgroundColor: "rgba(247, 103, 103, 0.3)",
                                borderColor: "#F44336",
                                pointBackgroundColor: "#F44336",
                                tension: 0.4
                            }
                        ];
                    } else {
                        // Handle individual product selection
                        chartData = selectedProduct === "Veg"
                            ? (sortOption === "Month"
                                ? data.month.veg
                                : sortOption === "Week"
                                    ? data.week.veg
                                    : data.day.veg)
                            : (sortOption === "Month"
                                ? data.month.nonVeg
                                : sortOption === "Week"
                                    ? data.week.nonVeg
                                    : data.day.nonVeg);

                        chartData = [{
                            label: `${selectedProduct} Sales`,
                            data: chartData,
                            fill: true,
                            backgroundColor: "rgba(92, 122, 143, 1)",
                            borderColor: "#16A34A",
                            pointBackgroundColor: "#16A34A",
                            tension: 0.4
                        }];
                    }

                    // Adjust labels based on the selected sorting
                    if (sortOption === "Month") {
                        labels = Array(30).fill(0).map((_, i) => i + 1);
                    } else if (sortOption === "Week") {
                        labels = Array(7).fill(0).map((_, i) => `Day ${i + 1}`);
                    } else if (sortOption === "Day") {
                        labels = Array(24).fill(0).map((_, i) => `Hour ${i + 1}`);
                    }

                    setSalesData({
                        labels: labels,
                        datasets: chartData
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedProduct, sortOption]);

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div className="w-full border py-4 px-2 sm:px-4 flex flex-col gap-2 bg-white rounded-2xl mt-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Dominant</h2>
            <div className="flex flex-col sm:flex-row gap-5 mb-4">
                <div className="w-full sm:w-auto">
                    <label className="block text-sm font-medium mb-1 ml-2 sm:ml-4 text-slate-500">Select Product</label>
                    <select
                        value={selectedProduct}
                        onChange={handleProductChange}
                        className="w-full sm:w-56 border border-gray-300 p-2 rounded ml-2 sm:ml-4"
                        style={{
                            height: '6vh',
                            background: 'rgba(245, 246, 250, 1)',
                        }}
                    >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                        <option value="Both">Both</option>
                    </select>
                </div>
                <div className="w-full sm:w-auto sm:mt-0">
                    <label className="block text-sm font-medium mb-1 ml-2 sm:ml-4 text-slate-500">Sort by</label>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="w-full sm:w-56 border border-gray-300 p-2 rounded ml-2 sm:ml-4"
                        style={{
                            height: '6vh',
                            background: 'rgba(245, 246, 250, 1)',
                        }}
                    >
                        <option value="Month">Month</option>
                        <option value="Day">Day</option>
                        <option value="Week">Week</option>
                    </select>
                </div>

                <div className="flex justify-between sm:justify-start sm:gap-4 w-full sm:w-auto">
                    <div className="flex flex-col items-center sm:items-start">
                        <span className="block text-sm font-medium mb-1 text-slate-500">Avg. Sales</span>
                        <span className="text-3xl sm:text-5xl font-bold text-slate-500">0000</span>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                        <span className="block text-sm font-medium mb-1 text-slate-500">Total Avg. Sales</span>
                        <span className="text-3xl sm:text-5xl font-bold text-slate-500">0000</span>
                    </div>
                </div>
            </div>
            <div className="relative w-ful h-48 sm:h-64 md:h-80">
                <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
};


const DominantDashboard = () => {
    const breakdown = useLoaderData();
    return (
        <div className="w-full h-full border py-4 px-2 sm:px-4 flex flex-col gap-4">
            <ScrollArea className="h-[70rem] w-full overflow-visible z-20" type="scroll">
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
                                breakdown={breakdown}
                            />
                        </Link>
                    ))}
                </div>
                <TotalSales />
            </ScrollArea>
        </div>
    );
};

export default DominantDashboard;

export const DashboardDominantLoader = async () => {
    try {
        const response = await getDashboardCard({ date: new Date() });
        if (response.status === 200) {
            console.log("API Response:", response.data);
            return response.data.totalOrder;
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
    }
];
