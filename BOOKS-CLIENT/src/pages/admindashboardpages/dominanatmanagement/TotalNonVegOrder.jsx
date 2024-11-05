import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTotalNonVegOrderData } from "../../../config/routeApi/owner"; // API for orders
import { toastError } from "../../../helpers/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NonVegOrderManagement = () => {
    const [nonVegOrdersData, setNonVegOrdersData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

    useEffect(() => {
        const handleNonVegOrdersData = async () => {
            try {
                const response = await getTotalNonVegOrderData();
                if (response.data.success) {
                    setNonVegOrdersData(response.data.NonVegOrderData); // Assuming API provides a similar structure
                } else {
                    toastError(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toastError("An error occurred while fetching data.");
            }
        };

        handleNonVegOrdersData();
    }, []);

    // Debouncing for search input
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Filter the nonVegOrdersData based on the search query and date range
    const filteredNonVegOrdersData = nonVegOrdersData.filter((item) => {
        const dateObject = new Date(item.billDate);

        // Filter by search query (Order ID)
        const matchesSearch = item.billId.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

        // Filter by date range only if the date search button is clicked
        const isWithinDateRange =
            (!isDateSearchClicked ||
                (!startDate || dateObject >= startDate) && (!endDate || dateObject <= endDate));

        return matchesSearch && isWithinDateRange;
    });

    const handleDateSearch = () => {
        setIsDateSearchClicked(true);
    };

    return (
        <Wrapper className="page">
            <div className="page-content">
                <div className="text-3xl flex gap-4 mt-4 items-center font-semibold">
                    <Link to="/dashboard/dominant-management">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h3>Total Non-Veg Orders</h3>
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
                            Showing <strong>{filteredNonVegOrdersData.length}</strong> from <strong>{nonVegOrdersData.length}</strong> results
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
                                    <th>Bill ID</th>
                                    <th>Bill Date</th>
                                    <th>Time</th>
                                    <th>Bill Amount</th>
                                    <th>Mode of Payment</th>
                                    <th>Mode of Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredNonVegOrdersData.map((item, i) => {
                                    const dateObject = new Date(item.billDate);
                                    const formattedDate = dateObject.toLocaleDateString();
                                    const formattedTime = dateObject.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });

                                    return (
                                        <tr key={item.billId}>
                                            <td>{i + 1}</td>
                                            <td>{item.items.map(i => i.itemName).join(", ")}</td> {/* Displaying item names */}
                                            <td>{item.billId}</td>
                                            <td>{formattedDate}</td>
                                            <td>{formattedTime}</td>
                                            <td>{item.billAmount.toFixed(2)}</td>
                                            <td>{item.modeOfPayment}</td>
                                            <td>{item.mode}</td>
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

export default NonVegOrderManagement;
