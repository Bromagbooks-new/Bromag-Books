//styled-component import
import Wrapper from "../../../assets/wrappers/adminwrappers/SalesManagement";
//component imports
import SalesManagementCard from "../../../components/admindashboardcomponents/SalesManagementCard";
//bootstrap imports
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
const data = {
  labels: Array.from({ length: 26 }, (_, i) => `Day ${i + 1}`),
  datasets: [
    {
      label: 'Sales Data',
      data: [20, 40, 30, 50, 40, 20, 90, 50, 30, 60, 22, 40, 30, 50, 80, 40, 30, 70, 60, 40, 20],
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
      max: 100,
      ticks: {
        stepSize: 20,
        callback: (value) => `${value}%`
      }
    },
    x: {
      beginAtZero: true,
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10
      }
    }
  }
};



const SalesManagement = () => {
  const [totalSalesPerDay, setTotalSalesPerDay] = useState({});
  const [hourlySalesPerDay, setHourlySalesPerDay] = useState({});
  const [highestBillingAmountPerHr, setHighestBillingAmountPerHr] =
    useState("");
  const [averageBillingAmountPerDay, setAverageBillingAmountPerDay] = useState(
    {}
  );
  const [onlineAggregatesPerDay, setOnlineAggregatesPerDay] = useState([]);
  const [takeAwayPerDay, setTakeAwayPerDay] = useState("");
  const [dineInPerDay, setDineInPerDay] = useState("");

  const [showToday, setShowToday] = useState(false);
  const [showYesterday, setShowYesterday] = useState(false);

  const [showTotal, setShowTotal] = useState(true);
  const [showFiltered, setShowFiltered] = useState(false);
  const [showLastWeek, setShowLastWeek] = useState(false);
  const [showLastMonth, setShowLastMonth] = useState(false);
  const [showLastYear, setShowLastYear] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSalesDashboard = async (dates) => {
    console.log("here");
    try {
      console.log("here");
      const response = await SalesDashboard(dates || {});
      console.log(response.data);

      if (response.data.success) {
        // data as cards

        console.log(response)
        setTotalSalesPerDay(response.data.TotalSalesPerDay);
        setHourlySalesPerDay(response.data.hourlySalesAmount);
        // console.log("hourlysalesamount",hourlySalesAmount)

        setHighestBillingAmountPerHr(response.data.HighestBillingAmountPerHr);
        setAverageBillingAmountPerDay(response.data.averageBillingAmountPerDay);
        if (response.data.TotalOnlineSales) {

          setOnlineAggregatesPerDay(response.data.TotalOnlineSales);
        }

        setTakeAwayPerDay(response.data.totalTakeAwayTotalAmount);
        setDineInPerDay(response.data.totalDineInPerDay);
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (dateRange) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const defaultDates = { start: todayDate, end: todayDate };
    console.log(defaultDates);

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayDates = yesterdayDate.toISOString().split("T")[0];
    console.log(dateRange, "dates");
    switch (dateRange) {
      case "today":
        setShowToday(true);
        setShowYesterday(false);
        setShowTotal(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        setShowFiltered(false);
        console.log("here");
        handleSalesDashboard(defaultDates);
        break;
      case "yesterday":
        setShowToday(false);
        setShowYesterday(true);
        setShowTotal(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        setShowFiltered(false);
        handleSalesDashboard({ start: yesterdayDates, end: todayDate });
        break;
      default:
        // Handle other cases based on dateRange
        // You can add more cases as needed
        break;
    }
  };


  useEffect(() => {
    handleButtonClick("today");
  }, []);

  const handleDateFilter = async (data) => {
    try {
      //   const response = await VendorDateFilter(data);

      if (response.data.success) {
        setFilteredData(response.data.data);
        setShowFiltered(true);
        setShowToday(false);
        setShowTotal(false);
        setShowLastWeek(false);
        setShowLastMonth(false);
        setShowLastYear(false);
        console.log("filtered");
      } else {
        toastError(response.data.filter);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const totalSales = [
    {
      title: " Total Sales Amount/Day",
      quantity:
        totalSalesPerDay && totalSalesPerDay.totalAmount
          ? totalSalesPerDay.totalAmount
          : 2341,
      borderColor: "#3357FF",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg"
    },
    {
      title: "Hourly Sales Amount",
      quantity:
        hourlySalesPerDay || 1230,
      borderColor: "#FF5733",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg"
    },
    {
      title: "Highest Billing Amount/hr",
      quantity:
        highestBillingAmountPerHr && highestBillingAmountPerHr
          ? highestBillingAmountPerHr
          : 3784,
      borderColor: "#33FF57",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg"

    },
    // {
    //   title: "Average Billing Amount per Day",
    //   quantity:
    //     averageBillingAmountPerDay &&
    //     averageBillingAmountPerDay.averageAmountPerDay
    //       ? averageBillingAmountPerDay.averageAmountPerDay
    //       : 0,
    // },
    {
      title: "Online Aggregator Sales/Day",
      quantity:
        onlineAggregatesPerDay &&
        onlineAggregatesPerDay,
      borderColor: "#A020F0",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg"
    },
    {
      title: "Take Away Sales Amount/Day",
      quantity: `${takeAwayPerDay || 2}`,
      borderColor: "#0000FF",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg"
    },
    {
      title: "Dining Sales Amount/Day",
      quantity: `${dineInPerDay || 269}`,
      borderColor: "#8B0000",
      image: "./../../../assets/images/billing-management/OnlineActivated.svg"
    },
  ];

  console.log("hourlySalesPerDay", highestBillingAmountPerHr)



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
