import React, { useState } from 'react';
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
import { useLoaderData } from 'react-router-dom';
import AnalyticsCardDominant from '@/components/dominantmanagement/AnalyticCardDominant';

// Register Chart.js components for Bar charts
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DominantManagement = () => {
    const breakdown = useLoaderData();
    console.log("objectww", breakdown)
    const [sortBy, setSortBy] = useState('Today');

    // Handle change in sorting option
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // Bar chart data
    const barData = {
        labels: Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`),
        datasets: [
            {
                label: 'Non Veg Orders',
                data: [80, 70, 60, 40, 50, 30, 90, 70, 80, 40], // Sample data for Non Veg orders
                backgroundColor: 'rgba(255, 130, 85, 1)',
                borderColor: 'rgba(255, 130, 85, 1)',
                borderWidth: 1
            },
            {
                label: 'Veg Orders',
                data: [70, 60, 50, 30, 40, 20, 80, 60, 70, 30], // Sample data for Veg orders
                backgroundColor: 'rgba(255, 199, 66, 1)',
                borderColor: 'rgba(255, 199, 66, 1)',
                borderWidth: 1
            }
        ]
    };

    // Bar chart options
    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10, // Increment by 10 for each tick
                    callback: (value) => `${value}%` // Display percentage
                }
            }
        }
    };

    return (
        <Wrapper className="page" >
            <div className="page-content" >
                <div className="page-header">
                    <div>
                        <p className="text-3xl mt-3 mb-2 ml-9 font-bold">Dominant Management</p>
                    </div>
                </div>
                <div className="flex gap-[0.7rem]">
                    {billingOptions.map((item) => (
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
                    ))}
                </div>
                {/* Bar Chart Section */}
                <div
                    style={{
                        height: '66vh',
                        width: '95%',
                        marginTop: '1rem',
                        marginLeft: '0',
                        marginBottom: '0',
                        backgroundColor: '#fff',
                        borderRadius: '1rem',
                        padding: '1rem',
                        position: 'relative'
                    }}
                >
                    {/* Title and Labels (Veg and Non-Veg Orders) */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p className="text-2xl font-semibold">Total Orders</p>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: '15px',
                                            height: '15px',
                                            backgroundColor: 'rgba(255, 130, 85, 1)',
                                            borderRadius: '50%',
                                            marginRight: '0.5rem'
                                        }}
                                    ></span>
                                    <span>Non Veg Orders</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: '15px',
                                            height: '15px',
                                            backgroundColor: 'rgba(255, 199, 66, 1)',
                                            borderRadius: '50%',
                                            marginRight: '0.5rem'
                                        }}
                                    ></span>
                                    <span>Veg Orders</span>
                                </div>
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
            </div>
        </Wrapper>
    );
};

export default DominantManagement;
const billingOptions = [
    {
        id: "total-order-veg",
        title: "Total Orders-Veg",
        icon: Online,
        activatedIcon: OnlineActivated,
        url: "veg-orders",
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