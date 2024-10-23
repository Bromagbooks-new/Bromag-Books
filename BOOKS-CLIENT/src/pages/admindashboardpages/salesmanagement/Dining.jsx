import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DineInDataForAdmin } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Dummy data for dine-in orders
const dummyDineInData = [
  {
    _id: "1",
    date: "2024-10-01T10:30:00Z",
    billId: "BIL3001",
    Amount: 200.00,
    tableNumber: "A1",
  },
  {
    _id: "2",
    date: "2024-10-02T11:15:00Z",
    billId: "BIL3002",
    Amount: 150.50,
    tableNumber: "B2",
  },
  {
    _id: "3",
    date: "2024-10-03T12:45:00Z",
    billId: "BIL3003",
    Amount: 300.75,
    tableNumber: "C3",
  },
  {
    _id: "4",
    date: "2024-10-04T13:30:00Z",
    billId: "BIL3004",
    Amount: 90.00,
    tableNumber: "D4",
  },
  {
    _id: "5",
    date: "2024-10-05T14:00:00Z",
    billId: "BIL3005",
    Amount: 60.25,
    tableNumber: "E5",
  },
];

const Dining = () => {
  const [dineIn, setDineIn] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null); // Add start date filter
  const [endDate, setEndDate] = useState(null); // Add end date filter
  const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

  useEffect(() => {
    const handleDineInData = async () => {
      try {
        const response = await DineInDataForAdmin();
        if (response.data.success) {
          // Uncomment the line below to use the fetched data
          console.log("dine-in", response.data.DineInDetails)
          setDineIn(response.data.DineInDetails);

          // For demo purposes, using dummy data
          // setDineIn(dummyDineInData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleDineInData();
  }, []);

  // Filter the dineIn based on the search query
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Filter the dineIn based on the debounced search query
  const filteredDineIn = dineIn.filter((item) => {
    const dateObject = new Date(item.date);

    // Filter by search query (Bill ID)
    const matchesSearch = item.billId
      .toLowerCase()
      .includes(debouncedSearchQuery.toLowerCase());

    // Filter by date range only if the date search button is clicked
    const isWithinDateRange =
      (!isDateSearchClicked ||
        ((!startDate || dateObject >= startDate) && (!endDate || dateObject <= endDate)));

    return matchesSearch && isWithinDateRange;
  });
  // Handler for date range search button
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
          <h3>Dine In Sales Amount / Day</h3>
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
              Showing <strong>{filteredDineIn.length}</strong> from <strong>{filteredDineIn.length}</strong> results
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
                  <th>Table Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredDineIn.map((item, i) => {
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
                      <td>{item.tableNumber}</td>
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

export default Dining;
