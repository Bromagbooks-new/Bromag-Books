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
import { Link, useLoaderData, Outlet } from 'react-router-dom';
import AnalyticsCardDominant from '@/components/dominantmanagement/AnalyticCardDominant';
import { GetDominantCardAnalytics } from '@/config/routeApi/owner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DominantManagement = () => {
    const isRoot = location.pathname === "/dashboard/dominant-management";
    const [breakdown, setBreakdown] = useState({
        dailyBreakdown: { veg: 0, nonVeg: 0, total: 0 },
        weeklyBreakdown: { veg: 0, nonVeg: 0, total: 0 },
        monthlyBreakdown: { veg: 0, nonVeg: 0, total: 0 }
    });
    const monthlyBreakdown = breakdown.monthlyBreakdown;
    console.log("breakdownnn", breakdown)
    const [sortBy, setSortBy] = useState('Today');

    useEffect(() => {
        const fetchData = async () => {
            const data = await dominantManagementLoader();
            console.log("object", data)
            if (data) setBreakdown(data);
        };
        fetchData();
    }, []);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // Bar chart data based on `sortBy` selection
    const selectedBreakdown = sortBy === 'Today' ? breakdown.dailyBreakdown
        : sortBy === 'This Week' ? breakdown.weeklyBreakdown
            : breakdown.monthlyBreakdown;

    const barData = {
        labels: Array.from({ length: 15 }, (_, i) => `Day ${i + 1}`),
        datasets: [
            {
                label: 'Non Veg Orders',
                data: [selectedBreakdown.nonVeg], // Sample data for Non Veg orders
                backgroundColor: 'rgba(255, 130, 85, 1)',
                borderColor: 'rgba(255, 130, 85, 1)',
                borderWidth: 1
            },
            {
                label: 'Veg Orders',
                data: [selectedBreakdown.veg], // Sample data for Veg orders
                backgroundColor: 'rgba(255, 199, 66, 1)',
                borderColor: 'rgba(255, 199, 66, 1)',
                borderWidth: 1
            }
        ]
    };


    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 30 }
            }
        }
    };

    return (
        <Wrapper className="page">
            <div className="page-content">
                {isRoot && (<>
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

                    {/* Bar Chart Section */}
                    <div
                        style={{
                            height: '66vh',
                            width: '95%',
                            marginTop: '1rem',
                            backgroundColor: '#fff',
                            borderRadius: '1rem',
                            padding: '1rem',
                            position: 'relative'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <p className="text-2xl font-semibold">Total Orders</p>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        width: '15px',
                                        height: '15px',
                                        backgroundColor: 'rgba(255, 130, 85, 1)',
                                        borderRadius: '50%',
                                        marginRight: '0.5rem'
                                    }}></span>
                                    <span>Non Veg Orders</span>

                                    <span style={{
                                        display: 'inline-block',
                                        width: '15px',
                                        height: '15px',
                                        backgroundColor: 'rgba(255, 199, 66, 1)',
                                        borderRadius: '50%',
                                        marginRight: '0.5rem'
                                    }}></span>
                                    <span>Veg Orders</span>
                                </div>
                            </div>

                            {/* Sort by Dropdown */}
                            <div style={{ position: 'absolute', top: '1rem', right: '2rem' }}>
                                <Form.Group controlId="sortBySelect">
                                    <Form.Label>Sort by</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={sortBy}
                                        onChange={handleSortChange}
                                    >
                                        <option value="Today">Today</option>
                                        <option value="This Week">This Week</option>
                                        <option value="This Month">This Month</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>

                        {/* Bar chart */}
                        <div
                            style={{
                                height: '80%',
                                backgroundColor: '#e0f0ff',
                                borderRadius: '1rem',
                                padding: '1rem',
                                marginTop: '2rem'
                            }}
                        >
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>


                </>
                )}
                <div>
                    <Outlet />
                </div>
            </div>
        </Wrapper>
    );
};

export default DominantManagement;

export const dominantManagementLoader = async () => {
    try {
        const response = await GetDominantCardAnalytics();
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
