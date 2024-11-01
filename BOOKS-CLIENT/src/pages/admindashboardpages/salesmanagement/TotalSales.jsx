import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toastError } from "../../../helpers/helpers";
import { TotalSalesData } from "@/config/routeApi/owner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TotalSales = () => {
  const [salesData, setSalesData] = useState([]); // Initialize with an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null); // Start date filter
  const [endDate, setEndDate] = useState(null); // End date filter
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch total sales data from the API
  const fetchTotalSalesData = async () => {
    try {
      setLoading(true); // Set loading to true
      const response = await TotalSalesData();
      if (response.data.success) {
        setSalesData(response.data.SalesData); // Set sales data from API response
      } else {
        toastError(response.data.message); // Show error message if not successful
      }
    } catch (error) {
      console.error("Failed to load total sales data:", error);
      setError("Failed to load total sales data."); // Set error state
      toastError(error.message); // Show error message
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchTotalSalesData(); // Fetch data on component mount
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const filteredSalesData = salesData.filter((item) => {
    const formattedAmount = String(item.billAmount); // Adjusted for API response

    // Ensure item.billID exists before accessing toLowerCase
    const matchesSearchQuery =
      (item.billID?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        formattedAmount.includes(debouncedSearchQuery));

    const itemDate = new Date(item.billDate); // Adjusted for API response
    const matchesDateRange =
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate);

    return matchesSearchQuery && matchesDateRange;
  });

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

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
          <div className="page-header">
            <div className="search-div">
              <div className="search-input-group">
                <IoSearchSharp className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by Bill ID"
                  className="search-bar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" style={{ width: "127px", height: "40px", background: "#486072", borderRadius: "7px", marginLeft: "2rem", color: "white" }} onClick={() => setDebouncedSearchQuery(searchQuery)}>Search</button>
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
                  <th>S.No.</th>
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
                  const dateObject = new Date(item.billDate); // Adjusted for API response
                  const formattedDate = dateObject.toLocaleDateString();
                  const formattedTime = dateObject.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={item.billID}>
                      <td>{i + 1}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td>{item.billID}</td>
                      <td>{item.billAmount.toFixed(2)}</td>
                      <td>{item.modeOfPayment}</td>
                      <td>{item.modeOfOrder}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Wrapper>
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
