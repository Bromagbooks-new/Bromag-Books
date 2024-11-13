import React, { useState, useEffect } from 'react';
import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
import Online from "@/assets/images/billing-management/Online.svg";
import OnlineActivated from "@/assets/images/billing-management/OnlineActivated.svg";
import Takeaway from "@/assets/images/billing-management/Takeaway.svg";
import TakeawayActivated from "@/assets/images/billing-management/TakeawayActivated.svg";

import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Link, useLoaderData, Outlet } from 'react-router-dom';
import AnalyticsCardDominant from '@/components/dominantmanagement/AnalyticCardDominant';
import { getCardInventoryHomePage, getPieChartDataInventory } from '@/config/routeApi/owner';

// Register Chart.js components for Doughnut charts
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const InventoryManagement = () => {
    const breakdown = useLoaderData();
    const [sortBy, setSortBy] = useState('Month');
    const [chartData, setChartData] = useState({
        totalQuantity: 0,
        leftOut: 0,
        totalQuantityColor: '#32CD32',
        leftOutColor: '#FFD700'
    });
    const isRoot = location.pathname === "/dashboard/inventory-management";

    // Fetch the inventory data based on the selected sortBy (Day, Week, Month)
    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const response = await getPieChartDataInventory();
                const responseData = response.data;
                console.log("loggggg", response.data)

                if (responseData && responseData[sortBy.toLowerCase()]) {
                    const { totalQuantity, leftOut, totalQuantityColor, leftOutColor } = responseData[sortBy.toLowerCase()];
                    setChartData({ totalQuantity, leftOut, totalQuantityColor, leftOutColor });
                }
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchInventoryData();
    }, [sortBy]);

    // Doughnut chart data
    const doughnutData = {
        labels: ['Available Inventory Items', 'Left Out Inventory Items'],
        datasets: [
            {
                data: [chartData.leftOut, chartData.totalQuantity],
                backgroundColor: [chartData.leftOutColor, chartData.totalQuantityColor],
                borderColor: [chartData.leftOutColor, chartData.totalQuantityColor],
                borderWidth: 1
            }
        ]
    };


    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    }
                }
            }
        }
    };

    return (
        <Wrapper className="page">
            {isRoot && (
                <div className="page-content">
                    <div className="page-header">
                        <p className="text-3xl mt-3 mb-2 ml-1 font-bold">Inventory Management</p>
                    </div>
                    <div className="flex gap-[0.7rem]">
                        {inventoryOptions.map((item) => (
                            <Link to={item.url} key={item.id}>
                                <AnalyticsCardDominant
                                    key={item.id}
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

                    {/* Main Doughnut Chart Section */}
                    <div className="flex justify-start items-start mt-5 p-5 bg-white rounded-2xl">
                        {/* Doughnut Chart Section */}
                        <div className="w-1/3">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>

                        {/* Left Side Information Section */}
                        <div className="ml-10 w-1/3">
                            <div className="flex flex-col items-start">
                                <div>
                                    <p className="text-3xl mt-3 mb-2 font-bold">Inventory Management</p>
                                </div>
                                <label className="text-gray-500 mb-2">Sort by</label>
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-select mb-4">
                                    <option value="Day">Day</option>
                                    <option value="Week">Week</option>
                                    <option value="Month">Month</option>
                                </select>
                                <div className="mt-4">
                                    <p className="font-semibold">Chart Legends</p>
                                    <div className="flex items-center mt-2">
                                        <span className="inline-block w-3 h-3 mr-2 bg-[#FFD700]"></span>
                                        <span>Left Out Inventory Items</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="inline-block w-3 h-3 mr-2 bg-[#32CD32]"></span>
                                        <span>Total Inventory Items</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Information Section */}
                        <div className="mr-10 w-1/3">
                            <div className="flex flex-col items-start">
                                <div className='mt-7'>
                                    <div className="mb-4">
                                        <p className="text-[#5C7A8F]">Total Inventory Items</p>
                                        <p className="text-5xl font-bold text-[#5C7A8F]">{chartData.totalQuantity}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-[#5C7A8F]">Left Out Inventory Items</p>
                                        <p className="text-5xl font-bold text-[#5C7A8F]">{chartData.leftOut}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            )}

            <div>
                <Outlet />
            </div>
        </Wrapper>
    );
};

export default InventoryManagement;


export const CardInventoryHomePageLoader = async () => {
    try {
        const response = await getCardInventoryHomePage();
        if (response.status === 200) {
            console.log("API Response:", response.data.totalInventory);
            return response.data.totalInventory;
        }
    } catch (error) {
        console.error("Failed to fetch sales summary:", error);
    }
    return null;
};
const inventoryOptions = [
    {
        id: "total-inventory-item",
        title: "Total Inventory Item",
        icon: Online,
        activatedIcon: OnlineActivated,
        url: "total-inventory",
        activatedClass: "bg-[#B5EAD7] border-2 border-[#4CAF50]",
    },
    {
        id: "available-inventory-item",
        title: "Available Inventory item",
        icon: Takeaway,
        activatedIcon: TakeawayActivated,
        url: "available-inventory",
        activatedClass: "bg-[#FFCCCB] border-2 border-[#FF5733]",
    },
];
