import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { OnlineOrderData } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OnlineOrders = () => {
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
  ];

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
        const response = await OnlineOrderData();
        if (response.data.success) {
          // setOnlineSalesData(response.data.OnlineOrderData);
          setOnlineSalesData(dummySalesData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
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
    const dateObject = new Date(item.date);

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
                  <th>Mode of Order</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesOnlineData.map((item, i) => {
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
    </Wrapper>
  );
};

export default OnlineOrders;
