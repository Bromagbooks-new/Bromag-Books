import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useLoaderData } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toastError } from "../../../helpers/helpers";
import { TotalSalesData } from "@/config/routeApi/owner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TotalSales = () => {
  // Dummy sales data
  const dummySalesData = [
    {
      _id: "1",
      date: "2024-10-01T10:30:00Z",
      billId: "BIL1001",
      Amount: 150.00,
      paymentMethod: "Credit Card",
      orderMode: "Online",
    },
    {
      _id: "2",
      date: "2024-10-02T14:15:00Z",
      billId: "BIL1002",
      Amount: 200.50,
      paymentMethod: "PayPal",
      orderMode: "Offline",
    },
    {
      _id: "3",
      date: "2024-10-03T09:45:00Z",
      billId: "BIL1003",
      Amount: 300.75,
      paymentMethod: "Debit Card",
      orderMode: "Online",
    },
    {
      _id: "4",
      date: "2024-10-04T12:00:00Z",
      billId: "BIL1004",
      Amount: 100.00,
      paymentMethod: "Bank Transfer",
      orderMode: "Offline",
    },
    {
      _id: "5",
      date: "2024-10-05T11:30:00Z",
      billId: "BIL1005",
      Amount: 50.25,
      paymentMethod: "Cash",
      orderMode: "Online",
    },
    {
      _id: "1",
      date: "2024-10-01T10:30:00Z",
      billId: "BIL1001",
      Amount: 150.00,
      paymentMethod: "Credit Card",
      orderMode: "Online",
    },
    {
      _id: "2",
      date: "2024-10-02T14:15:00Z",
      billId: "BIL1002",
      Amount: 200.50,
      paymentMethod: "PayPal",
      orderMode: "Offline",
    },
    {
      _id: "3",
      date: "2024-10-03T09:45:00Z",
      billId: "BIL1003",
      Amount: 300.75,
      paymentMethod: "Debit Card",
      orderMode: "Online",
    },
    {
      _id: "1",
      date: "2024-10-01T10:30:00Z",
      billId: "BIL1001",
      Amount: 150.00,
      paymentMethod: "Credit Card",
      orderMode: "Online",
    }, {
      _id: "1",
      date: "2024-10-01T10:30:00Z",
      billId: "BIL1001",
      Amount: 150.00,
      paymentMethod: "Credit Card",
      orderMode: "Online",
    },
    {
      _id: "1",
      date: "2024-10-01T10:30:00Z",
      billId: "BIL1001",
      Amount: 150.00,
      paymentMethod: "Credit Card",
      orderMode: "Online",
    },
  ];

  const loadedSalesData = useLoaderData();
  const [salesData, setSalesData] = useState(dummySalesData); //loadedSalesData (from api) Use dummy data if loadedSalesData is empty
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null); // Add start date filter
  const [endDate, setEndDate] = useState(null); // Add end date filter

  useEffect(() => {
    if (!loadedSalesData && dummySalesData.length === 0) {
      toastError("No sales data available");
    }
  }, [loadedSalesData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const filteredSalesData = salesData.filter((item) => {
    const formattedAmount = String(item.Amount);
    const matchesSearchQuery =
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ) || formattedAmount.includes(debouncedSearchQuery);

    const itemDate = new Date(item.date);
    const matchesDateRange =
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate);

    return matchesSearchQuery && matchesDateRange;
  });

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="text-3xl flex gap-4 mt-4 items-center font-semibold">
          <Link to="/dashboard/sales-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Total Sales Amount / Day</p>
        </div>
        <div className="mt-4" style={{ height: "100%", background: "white", padding: "2rem", borderRadius: '2rem' }}>
          <div className="page-header" >
            <div className="search-div">
              <div className="search-input-group">
                <IoSearchSharp className="search-icon" />
                <input
                  type="text"
                  placeholder="Search any date"
                  className="search-bar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" style={{ width: "127px", height: "40px", background: "#486072", borderRadius: "7px", marginLeft: "2rem", color: "white" }} onClick={(e) => setSearchQuery(e.target.value)}>Search</button>
              </div>
              <div className="date-picker-group">
                <p style={{ width: "33px", height: "16px", color: "#1F303C" }}>From</p>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="date-picker"
                />
                <p>To</p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="date-picker"
                />
              </div>
              <button className="search-button" style={{ width: "127px", height: "40px", background: "#486072", borderRadius: "7px", color: "white" }} onClick={() => setDebouncedSearchQuery(searchQuery)}>Search</button>
            </div>
          </div>
          <div className="pagination-div">
            <p>
              Showing <strong>{filteredSalesData.length}</strong> from <strong>{salesData.length}</strong> results
            </p>
            <div className="pagination-controls">
              <button>&lt;</button>
              <span>1 - 10</span>
              <button>&gt;</button>
            </div>
          </div>
          <div className="table-div">
            <Table striped bordered hover className="table">
              <thead>
                <tr style={{ background: "#F4FAFF" }}>
                  <th >S.No.</th>
                  <th>Bill Date</th>
                  <th>Time</th>
                  <th>Bill ID</th>
                  <th>Bill Amount</th>
                  <th>Mode of Payment</th>
                  <th>Mode of Order</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesData.map((item, i) => {
                  const dateObject = new Date(item.date);
                  const formattedDate = dateObject.toLocaleDateString();
                  const formattedTime = dateObject.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td>{item.billId}</td>
                      <td>{item.Amount.toFixed(2)}</td>
                      <td>{item.paymentMethod}</td>
                      <td>{item.orderMode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Wrapper >
  );
};

export const getTotalSalesDataFn = async () => {
  try {
    const response = await TotalSalesData();
    if (response.data.success) {
      return response.data.SalesData;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Failed to load total sales data:", error);
    throw error;
  }
};

export default TotalSales;
