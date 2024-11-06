import React, { useState, useEffect } from 'react';
import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
import { Form } from "react-bootstrap";
import Online from "@/assets/images/billing-management/Online.svg";
import OnlineActivated from "@/assets/images/billing-management/OnlineActivated.svg";
import Takeaway from "@/assets/images/billing-management/Takeaway.svg";
import TakeawayActivated from "@/assets/images/billing-management/TakeawayActivated.svg";
import Dinein from "@/assets/images/billing-management/Dinein.svg";
import DineinActivated from "@/assets/images/billing-management/DineinActivated.svg";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Link, useLoaderData, Outlet, useLocation } from 'react-router-dom';
import AnalyticsCardDominant from '@/components/dominantmanagement/AnalyticCardDominant';
import { GetDominantCardAnalytics } from '@/config/routeApi/owner';
import BarGraph from '@/components/dominantmanagement/BarGraph';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DominantManagement = () => {
    const location = useLocation();
    const isRoot = location.pathname === "/dashboard/dominant-management";
    const [breakdown, setBreakdown] = useState({
        dailyBreakdown: { veg: 0, nonVeg: 0, total: 0 },
        weeklyBreakdown: { veg: 0, nonVeg: 0, total: 0 },
        monthlyBreakdown: { veg: 0, nonVeg: 0, total: 0 }
    });
    const monthlyBreakdown = breakdown.monthlyBreakdown;
    console.log("breakdownnn", breakdown)
    console.log("breakdownnn", isRoot)

    useEffect(() => {
        const fetchData = async () => {
            const data = await dominantManagementLoader();
            console.log("object", data)
            if (data) setBreakdown(data);
        };
        fetchData();
    }, []);



    return (
        <Wrapper className="page">
            <div className="page-content">
                {isRoot && (
                    <>
                        <div className="page-header">
                            <p className="text-3xl mt-3 mb-2 ml-1 font-bold">Dominant Management</p>
                        </div>
                        <div className="flex gap-[0.7rem]">
                            {billingOptions.map((item) => (
                                <Link to={item.url} key={item.id}>
                                    <AnalyticsCardDominant
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        url={item.url}
                                        icon={item.icon}
                                        activatedIcon={item.activatedIcon}
                                        activatedClass={item.activatedClass}
                                        breakdown={monthlyBreakdown}
                                    />
                                </Link>
                            ))}
                        </div>

                        <BarGraph />

                    </>
                )}
                <Outlet />
            </div>
        </Wrapper>
    );
};

export default DominantManagement;

export const dominantManagementLoader = async () => {
    try {
        const response = await GetDominantCardAnalytics();
        console.log("dominantManagment", response.data)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

const billingOptions = [
    {
        id: "total-order-veg",
        title: "Total Orders-Veg",
        icon: Online,
        activatedIcon: OnlineActivated,
        url: "veg-order",
        activatedClass: "bg-[#FFE588] border-2 border-[#CF9710]",
    },
    {
        id: "total-order-nonveg",
        title: "Total Orders-Non Veg",
        icon: Takeaway,
        activatedIcon: TakeawayActivated,
        url: "nonveg-order",
        activatedClass: "bg-[#FFD6B1] border-2 border-[#DD6031]",
    },
    {
        id: "repear-order",
        title: "Repeat Orders",
        icon: Dinein,
        activatedIcon: DineinActivated,
        url: "repeat-order",
        activatedClass: "bg-[#CAC9FF] border-2 border-[#5A57D0]",
    },
];