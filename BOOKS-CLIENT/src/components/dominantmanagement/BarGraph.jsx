import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import { useLoaderData } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

const BarGraph = () => {
    const breakdown = useLoaderData();
    const [sortBy, setSortBy] = useState('Today');

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // Bar chart data based on sortBy selection
    const selectedBreakdown = sortBy === 'Today' ? breakdown.dailyBreakdown
        : sortBy === 'This Week' ? breakdown.weeklyBreakdown
            : breakdown.monthlyBreakdown;

    const barData = {
        labels: ['Orders'],
        datasets: [
            {
                label: 'Non Veg Orders',
                data: [selectedBreakdown.nonVeg],
                backgroundColor: 'rgba(255, 130, 85, 1)',
                borderColor: 'rgba(255, 130, 85, 1)',
                borderWidth: 1
            },
            {
                label: 'Veg Orders',
                data: [selectedBreakdown.veg],
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
    );
};

export default BarGraph;
