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

const DineInOrderManagement = () => {
    const [dineInData, setDineInData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null); // Start date filter
    const [endDate, setEndDate] = useState(null); // End date filter
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

    useEffect(() => {
        const dummyDineInData = [
            {
                _id: "1",
                orderDetail: "Paneer Tikka",
                date: "2024-10-01T12:00:00Z",
                orderId: "DIN1001",
                billId: "BIL2001",
                Amount: 250.00,
                paymentMethod: "Debit Card",
                orderMode: "Dine In",
            },
            {
                _id: "2",
                orderDetail: "Butter Chicken",
                date: "2024-10-05T13:30:00Z",
                orderId: "DIN1002",
                billId: "BIL2002",
                Amount: 300.00,
                paymentMethod: "Cash",
                orderMode: "Dine In",
            },
            {
                _id: "3",
                orderDetail: "Biryani",
                date: "2024-10-07T14:15:00Z",
                orderId: "DIN1003",
                billId: "BIL2003",
                Amount: 400.00,
                paymentMethod: "Credit Card",
                orderMode: "Dine In",
            },

        ];

        const handleDineInData = async () => {
            try {
                const response = await DineInDataForAdmin();
                if (response.data.success) {
                    console.log("Dine In Data: ", response.data);
                    //setDineInData(response.data.dineInData);
                    setDineInData(dummyDineInData);
                } else {
                    toastError(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        };
        handleDineInData();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Filter the dineInData based on the search query and date range
    const filteredDineInData = dineInData.filter((item) => {
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
                    <h3>Dine In Orders</h3>
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
                            Showing <strong>{filteredDineInData.length}</strong> from <strong>{dineInData.length}</strong> results
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
                                {filteredDineInData.map((item, i) => {
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

export default DineInOrderManagement;
