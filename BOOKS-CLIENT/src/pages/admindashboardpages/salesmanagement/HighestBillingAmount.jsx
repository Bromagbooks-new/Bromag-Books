import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
// import { HighestBillingAmountDataForAdmin } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HighestBillingAmount = () => {
    const [highestBillingData, setHighestBillingData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

    useEffect(() => {
        const dummyHighestBillingData = [
            {
                _id: "1",
                date: "2024-10-01T12:30:00Z",
                billId: "HBIL1001",
                Amount: 500.00,
                paymentMethod: "Credit Card",
                orderMode: "Online",
            },
            {
                _id: "2",
                date: "2024-10-02T14:45:00Z",
                billId: "HBIL1002",
                Amount: 650.25,
                paymentMethod: "PayPal",
                orderMode: "Offline",
            },
            {
                _id: "3",
                date: "2024-10-03T09:30:00Z",
                billId: "HBIL1003",
                Amount: 750.50,
                paymentMethod: "Cash",
                orderMode: "Online",
            },
            {
                _id: "4",
                date: "2024-10-04T16:00:00Z",
                billId: "HBIL1004",
                Amount: 900.00,
                paymentMethod: "Debit Card",
                orderMode: "Offline",
            },
            {
                _id: "5",
                date: "2024-10-05T11:15:00Z",
                billId: "HBIL1005",
                Amount: 1200.99,
                paymentMethod: "Bank Transfer",
                orderMode: "Online",
            },
        ];

        // const handleHighestBillingData = async () => {
        //     try {
        //         const response = await HighestBillingAmountDataForAdmin();
        //         if (response.data.success) {
        //             // setHighestBillingData(response.data.highestBillingData);
        //             setHighestBillingData(dummyHighestBillingData);
        //         } else {
        //             toastError(response.data.message);
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // };
        // handleHighestBillingData();
        setHighestBillingData(dummyHighestBillingData);
    }, []);

    // Debouncing for search input
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Filter the highest billing data based on the search query and date range
    const filteredHighestBillingData = highestBillingData.filter((item) => {
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
                    <h3>Highest Billing Amount</h3>
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
                            Showing <strong>{filteredHighestBillingData.length}</strong> from <strong>{highestBillingData.length}</strong> results
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
                                {filteredHighestBillingData.map((item, i) => {
                                    const dateObject = new Date(item.date);
                                    const formattedDate = dateObject.toLocaleDateString();
                                    const formattedTime = dateObject.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });
                                    return (
                                        <tr key={item.id}>
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

export default HighestBillingAmount;
