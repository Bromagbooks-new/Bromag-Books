import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
import SalesManagementCard from "../../../components/admindashboardcomponents/SalesManagementCard";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SalesDashboard } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesManagement = () => {
  const [totalSalesPerDay, setTotalSalesPerDay] = useState({});
  const [hourlySalesPerDay, setHourlySalesPerDay] = useState({});
  const [highestBillingAmountPerHr, setHighestBillingAmountPerHr] = useState({});
  const [averageBillingAmountPerDay, setAverageBillingAmountPerDay] = useState({});
  const [onlineAggregatesPerDay, setOnlineAggregatesPerDay] = useState(0);
  const [takeAwayPerDay, setTakeAwayPerDay] = useState(0);
  const [dineInPerDay, setDineInPerDay] = useState(0);

  const [salesChartData, setSalesChartData] = useState({ labels: [], data: [] });
  const [chartPeriod, setChartPeriod] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSalesDashboard = async (dates) => {
    try {
      const response = await SalesDashboard(dates);
      console.log("aaa", response.data)
      if (response.data.success) {
        setTotalSalesPerDay(response.data.TotalSalesPerDay.toFixed(2));
        setHourlySalesPerDay(response.data.totalSalesAmountForLastHour.toFixed(2));
        setHighestBillingAmountPerHr(response.data.HighestBillingAmountForCurrentHour.toFixed(2));
        setAverageBillingAmountPerDay(response.data.averageBillingAmountPerDay);
        setOnlineAggregatesPerDay(response.data.onlineAggregatorSalesPerDay.toFixed(2));
        setTakeAwayPerDay(response.data.takeAwaySalesPerDay.toFixed(2));
        setDineInPerDay(response.data.totalDineInPerDay.toFixed(2));

        // Set chart data from API response
        const salesLabels = response.data.highestDailyChartData.map(item => new Date(item.date).getDate());
        const salesValues = response.data.highestDailyChartData.map(item => item.amount);
        setSalesChartData({ labels: salesLabels, data: salesValues });

        // Set the chart period for displaying month and year
        const month = new Date(response.data.highestDailyChartData[0].date).toLocaleString('default', { month: 'long' });
        const year = new Date(response.data.highestDailyChartData[0].date).getFullYear();
        setChartPeriod(`${month} ${year}`);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (dateRange) => {
    const now = new Date();
    const offset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + offset);
    const formattedTodayDate = istDate.toISOString().split("T")[0];
    const defaultDates = { start: formattedTodayDate, end: formattedTodayDate };

    const yesterdayDate = new Date(istDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const formattedYesterdayDate = yesterdayDate.toISOString().split("T")[0];

    switch (dateRange) {
      case "today":
        handleSalesDashboard(defaultDates);
        break;
      case "yesterday":
        handleSalesDashboard({ start: formattedYesterdayDate, end: formattedTodayDate });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleButtonClick("today");
  }, []);

  const totalSales = [
    {
      title: "Total Sales Amount/Day",
      quantity: totalSalesPerDay,
      borderColor: "#3357FF",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg",
      url: "total-sales"
    },
    {
      title: "Hourly Sales Amount",
      quantity: hourlySalesPerDay,
      borderColor: "#FF5733",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg",
      url: "hourly-sales"
    },
    {
      title: "Highest Billing Amount/hr",
      quantity: highestBillingAmountPerHr,
      borderColor: "#33FF57",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg",
      url: "highest-billing"
    },
    {
      title: "Online Aggregator Sales/Day",
      quantity: onlineAggregatesPerDay,
      borderColor: "#A020F0",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg",
      url: "online-sales"
    },
    {
      title: "Take Away Sales Amount/Day",
      quantity: takeAwayPerDay,
      borderColor: "#0000FF",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg",
      url: "take-away"
    },
    {
      title: "Dining Sales Amount/Day",
      quantity: dineInPerDay,
      borderColor: "#8B0000",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg",
      url: "dining-sales"
    }
  ];

  const data = {
    labels: salesChartData.labels.length > 0 ? salesChartData.labels : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Sales Data',
        data: salesChartData.data.length > 0 ? salesChartData.data : [60, 40, 20],
        fill: true,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgba(0, 123, 255, 1)',
        pointBackgroundColor: 'rgba(0, 123, 255, 1)',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`
        }
      },
      x: {
        title: {
          display: true,
          text: `Sales Data for ${chartPeriod}`
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    }
  };

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="page-header">
          <div>
            <p className="text-3xl mt-3 mb-2 ml-9 font-bold">Sales Management</p>
          </div>
        </div>
        <section className="sales-card-deck">
          <SalesManagementCard arrayOfObjects={totalSales} />
        </section>
        <div style={{ height: '345px', width: "85%", marginTop: '0rem', marginLeft: "30px", backgroundColor: '#fff', borderRadius: '1rem', padding: '0.5rem' }}>
          <div style={{ height: '95%', backgroundColor: '#e0f0ff', borderRadius: '1rem', padding: '1rem' }}>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SalesManagement;
