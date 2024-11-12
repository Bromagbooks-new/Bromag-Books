import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Link, useLoaderData } from "react-router-dom";
import AnalyticsCard from "@/components/ordermanagement/AnalyticsCard";
import Online from "@/assets/images/billing-management/Online.svg";
import OnlineActivated from "@/assets/images/billing-management/OnlineActivated.svg";
import Takeaway from "@/assets/images/billing-management/Takeaway.svg";
import TakeawayActivated from "@/assets/images/billing-management/TakeawayActivated.svg";
import Dinein from "@/assets/images/billing-management/Dinein.svg";
import DineinActivated from "@/assets/images/billing-management/DineinActivated.svg";
import NewOrderCharts from "@/components/ordermanagement/NewOrderCharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import AnalyticsCardDashboard from "@/components/dashboardmanagement/AnalyticCardDashboard";
import { GetDashboardAnalytics, getDashboardCard, getOrderSummary } from "@/config/routeApi/owner";



const OrderDashboard = () => {
    // const breakdown = useLoaderData()
    const [breakdown, setBreakdown] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDashboardCard({ date: new Date() });
                console.log("asa", response.data)
                if (response.status === 200) {
                    setBreakdown(response?.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="w-full h-full border py-4 px-2 sm:px-4 flex flex-col gap-4">
            <ScrollArea className="h-[45rem] w-full overflow-visible z-20" type="scroll">
                <div className="flex gap-4">
                    <p className="text-2xl sm:text-3xl font-bold">Dashboard</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {orderOptions.map((item) => (
                        <Link to={item.url} key={item.id} className="flex-1">
                            <AnalyticsCardDashboard
                                id={item.id}
                                title={item.title}
                                url={item.url}
                                icon={item.icon}
                                activatedIcon={item.activatedIcon}
                                activatedClass={item.activatedClass}
                                breakdown={breakdown?.[item.apiId] || {}}
                            />
                        </Link>
                    ))}
                </div>
                <NewOrderCharts />
            </ScrollArea>
        </div>
    );
};

export default OrderDashboard;

export const DashboardOrderLoader = async () => {

    try {
        const response = await getOrderSummary({ date: new Date() });
        console.log('response1:', response)

        if (response.status === 200) {
            // console.log(response.data);
            return response.data.stats;
        }
    } catch (error) {
        console.error(error);
    }
}

const orderOptions = [
    {
        id: "sales",
        title: "Sales",
        icon: Online,
        activatedIcon: OnlineActivated,
        url: "/dashboard/sale",
        activatedClass: "bg-[#FFE588] border-2 border-[#CF9710]",
        apiId: "totalSales"
    },
    {
        id: "orders",
        title: "Orders",
        icon: Takeaway,
        activatedIcon: TakeawayActivated,
        url: "/dashboard/order",
        activatedClass: "bg-[#FFD6B1] border-2 border-[#DD6031]",
        apiId: "totalOrder"
    },
    {
        id: "dominant",
        title: "Dominant",
        icon: Dinein,
        activatedIcon: DineinActivated,
        url: "/dashboard/dominant",
        activatedClass: "bg-[#CAC9FF] border-2 border-[#5A57D0]",
        apiId: "totalDominant"
    },
    {
        id: "inventory",
        title: "Inventory",
        icon: Dinein,
        activatedIcon: DineinActivated,
        url: "/dashboard/inventory",
        activatedClass: "bg-[#CAC9FF] border-2 border-[#5A57D0]",
        apiId: "totalInventory"
    },
];
