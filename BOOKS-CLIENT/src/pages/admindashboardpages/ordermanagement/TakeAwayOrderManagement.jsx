import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TakeAwayDataForAdmin } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TakeAwayOrderManagement = () => {
    const [takeAwayData, setTakeAwayData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null); // Add start date filter
    const [endDate, setEndDate] = useState(null); // Add end date filter
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

    useEffect(() => {
        const dummyTakeAwayData = [
            {
                _id: "1",
                orderDetail: "hyderabadi biryani",
                date: "2024-10-01T10:30:00Z",
                orderId: "ORD1001",
                billId: "BIL1001",
                Amount: 150.00,
                paymentMethod: "Credit Card",
                orderMode: "Online",
            },
            {
                _id: "2",
                orderDetail: "delhi biryani",
                date: "2024-10-06T11:15:00Z",
                orderId: "ORD1002",
                billId: "BIL1002",
                Amount: 200.50,
                paymentMethod: "Cash",
                orderMode: "Online",
            },
            {
                _id: "3",
                orderDetail: "hyderabadi chicken",
                date: "2024-10-10T11:15:00Z",
                orderId: "ORD1003",
                billId: "BIL1004",
                Amount: 200.50,
                paymentMethod: "Cash",
                orderMode: "Online",
            },
            {
                _id: "4",
                orderDetail: "kanpur biryani",
                date: "2024-10-02T11:15:00Z",
                orderId: "ORD1004",
                billId: "BIL1004",
                Amount: 200.50,
                paymentMethod: "Cash",
                orderMode: "Online",
            },
        ];

        const handleTakeAwayData = async () => {
            try {
                const response = await TakeAwayDataForAdmin();
                if (response.data.success) {
                    console.log("hhhh", response.data)
                    //setTakeAwayData(response.data.takeAwayData);
                    setTakeAwayData(dummyTakeAwayData);
                } else {
                    toastError(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        };
        handleTakeAwayData();
    }, []);

    // Debouncing for search input
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Filter the takeAwayData based on the search query and date range
    const filteredTakeAwayData = takeAwayData.filter((item) => {
        const dateObject = new Date(item.date);

        // Filter by search query (Order ID)
        const matchesSearch = item.orderId
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase());

        const isWithinDateRange =
            (!isDateSearchClicked ||
                ((!startDate || dateObject >= startDate) && (!endDate || dateObject <= endDate)));

        return matchesSearch && isWithinDateRange;
    });

    const handleDateSearch = () => {
        setIsDateSearchClicked(true);
    };

    return (
        <Wrapper className="page">
            <div className="page-content">
                <div className="text-3xl flex gap-4 mt-4 items-center font-semibold">
                    <Link to="/dashboard/order-management">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h3>Take Away Orders</h3>
                </div>

                <div className="mt-4" style={{ height: "100%", background: "white", padding: "2rem", borderRadius: '2rem' }}>
                    <div className="page-header">
                        <div className="search-div">
                            <div className="search-input-group">
                                <IoSearchSharp className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search by Order ID"
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
                            Showing <strong>{filteredTakeAwayData.length}</strong> from <strong>{takeAwayData.length}</strong> results
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
                                    <th>Order Details</th>
                                    <th>Order ID</th>
                                    <th>Bill Date</th>
                                    <th>Time</th>
                                    <th>Bill ID</th>
                                    <th>Bill Amount</th>
                                    <th>Mode of Payment</th>
                                    <th>Mode of Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTakeAwayData.map((item, i) => {
                                    const dateObject = new Date(item.date);
                                    const formattedDate = dateObject.toLocaleDateString();
                                    const formattedTime = dateObject.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });

                                    return (
                                        <tr key={item._id}>
                                            <td>{i + 1}</td>
                                            <td>{item.orderDetail}</td>
                                            <td>{item.orderId}</td>
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

export default TakeAwayOrderManagement;
