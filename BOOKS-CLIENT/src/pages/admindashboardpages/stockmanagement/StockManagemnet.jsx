import React, { useState } from 'react';
import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
import Online from "@/assets/images/billing-management/Online.svg";
import OnlineActivated from "@/assets/images/billing-management/OnlineActivated.svg";
import Takeaway from "@/assets/images/billing-management/Takeaway.svg";
import TakeawayActivated from "@/assets/images/billing-management/TakeawayActivated.svg";
import { Button } from "@/components/ui/button";
import { CalendarPlus, StoreIcon } from "lucide-react";

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Link, useLoaderData, Outlet } from 'react-router-dom';
import AnalyticsCardDominant from '@/components/dominantmanagement/AnalyticCardDominant';

// Register Chart.js components for Doughnut charts
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const StockManagement = () => {
  const breakdown = useLoaderData();
  const [sortBy, setSortBy] = useState('Month');
  //const isRoot = location.pathname === "/dashboard/stock-management";

  // Doughnut chart data
  const doughnutData = {
    labels: ['Available Inventory Items', 'Total Inventory Items'],
    datasets: [
      {
        data: [40, 60], // Sample percentage values
        backgroundColor: ['#FFD700', '#32CD32'], // Yellow for Available Inventory, Green for Total Inventory
        borderColor: ['#FFD700', '#32CD32'],
        borderWidth: 1
      }
    ]
  };

  // Doughnut chart options
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false // Hide the default legend to create a custom one
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
      {/* {isRoot && ( */}
      <div className="page-content">
        <div className="page-header">
          <p className="text-3xl mt-3 mb-2 ml-1 font-bold">Inventory Management</p>
          <div className="flex gap-4">
            <Link to="add-vendor">
              <Button className="bg-[#01A0A0] gap-2">
                <CalendarPlus />
                Add Vendor
              </Button>
            </Link>
            <Link to="add-stock">
              <Button className="bg-landing-secondary gap-2">
                <StoreIcon />
                Add Stock
              </Button>
            </Link>
          </div>
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
          <div className="w-1/3"> {/* Adjust the width as needed */}
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
          {/* Left Side Information Section - Column 1 */}
          <div className="ml-10 w-1/3"> {/* Adjust the width as needed */}
            <div className="flex flex-col items-start">
              <div>
                <p className="text-3xl mt-3 mb-2  font-bold">Inventory Management</p>
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
                  <span>Available Stock</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="inline-block w-3 h-3 mr-2 bg-[#32CD32]"></span>
                  <span>Total Stock</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side Information Section - Column 2 */}
          <div className="mr-10 w-1/3"> {/* Adjust the width as needed */}
            <div className="flex flex-col items-start">
              <div className='mt-7'>
                <div className="mb-4">
                  <p className="text-[#5C7A8F]">Total Stock</p>
                  <p className="text-5xl font-bold text-[#5C7A8F]">0000</p>
                </div>
                <div className="mb-4">
                  <p className="text-[#5C7A8F]">Available Stock</p>
                  <p className="text-5xl font-bold text-[#5C7A8F]">0000</p>
                </div>
                <div className="mb-4">
                  <p className="text-[#5C7A8F]">Total Vendor</p>
                  <p className="text-5xl font-bold text-[#5C7A8F]">0000</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      {/* )} */}

      <div>
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default StockManagement;

const inventoryOptions = [
  {
    id: "total-stock",
    title: "Total Stock",
    icon: Online,
    activatedIcon: OnlineActivated,
    url: "total-stock",
    activatedClass: "bg-[#B5EAD7] border-2 border-[#4CAF50]",
  },
  {
    id: "available-stock",
    title: "Available Stock",
    icon: Takeaway,
    activatedIcon: TakeawayActivated,
    url: "available-stock",
    activatedClass: "bg-[#FFCCCB] border-2 border-[#FF5733]",
  },
  {
    id: "total-vendor",
    title: "Total Vendors",
    icon: Takeaway,
    activatedIcon: TakeawayActivated,
    url: "total-vendor",
    activatedClass: "bg-[#FFCCCB] border-2 border-[#FF5733]",
  },
];
