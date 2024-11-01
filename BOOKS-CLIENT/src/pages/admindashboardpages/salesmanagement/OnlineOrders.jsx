import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { OnlineOrderData } from "../../../config/routeApi/owner"; // Ensure this points to the correct API function
import { toastError } from "../../../helpers/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OnlineOrders = () => {
  const [salesOnlineData, setOnlineSalesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

  // UseEffect for fetching the data
  useEffect(() => {
    const handleSalesData = async () => {
      try {
        const response = await OnlineOrderData(); // Call your API to fetch online orders
        if (response.data.success) {
          console.log("Fetched online sales data:", response.data.OnlineOrderData);
          setOnlineSalesData(response.data.OnlineOrderData); // Set the state with the fetched data
        } else {
          toastError(response.data.message); // Show error message if the fetch was unsuccessful
        }
      } catch (error) {
        console.log("Error fetching online sales data:", error);
        toastError("Failed to fetch online sales data."); // Notify about the error
      }
    };
    handleSalesData();
  }, []);

  // Debouncing for search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Function to filter the data based on Bill ID and date range
  const filteredSalesOnlineData = salesOnlineData.filter((item) => {
    const dateObject = new Date(item.billDate); // Use billDate for filtering

    // Filter by search query (Bill ID)
    const matchesSearch = item.billId.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

    // Filter by date range only if the date search button is clicked
    const isWithinDateRange =
      (!isDateSearchClicked ||
        ((!startDate || dateObject >= startDate) && (!endDate || dateObject <= endDate)));

    return matchesSearch && isWithinDateRange;
  });

  // Handler for the date range search button
  const handleDateSearch = () => {
    setIsDateSearchClicked(true);
  };

  return (
    <Wrapper className="page">
      <div className="page-content">
        <div className="text-3xl flex gap-4 mt-4 items-center font-semibold">
          <Link to="/dashboard/sales-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Online Aggregator Sales / Day</p>
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
                <button
                  className="search-button"
                  style={{ width: "127px", height: "40px", background: "#486072", borderRadius: "7px", marginLeft: "2rem", color: "white" }}
                  onClick={() => setDebouncedSearchQuery(searchQuery)}
                >
                  Search
                </button>
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
                <button
                  className="search-button"
                  style={{ width: "127px", height: "40px", background: "#486072", borderRadius: "7px", marginLeft: "1rem", color: "white" }}
                  onClick={handleDateSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="pagination-div">
            <p>
              Showing <strong>{filteredSalesOnlineData.length}</strong> from <strong>{salesOnlineData.length}</strong> results
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
                <tr>
                  <th>S.No.</th>
                  <th>Bill Date</th>
                  <th>Time</th>
                  <th>Bill ID</th>
                  <th>Bill Amount</th>
                  <th>Mode of Payment</th>
                  <th>Aggregator</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesOnlineData.map((item, i) => {
                  const dateObject = new Date(item.billDate); // Accessing billDate from the response
                  const formattedDate = dateObject.toLocaleDateString();
                  const formattedTime = dateObject.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={item.billId}> {/* Using billId as the key */}
                      <td>{i + 1}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td>{item.billId}</td>
                      <td>{item.billAmount.toFixed(2)}</td> {/* Accessing billAmount */}
                      <td>{item.modeOfPayment}</td> {/* Accessing modeOfPayment */}
                      <td>{item.aggregator}</td> {/* Accessing modeOfOrder */}
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

export default OnlineOrders;
