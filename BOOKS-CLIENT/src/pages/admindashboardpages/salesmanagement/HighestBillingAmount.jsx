import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toastError } from "../../../helpers/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HighestBillingAmountDataForAdmin } from "@/config/routeApi/owner";

const HighestBillingAmount = () => {
    const [highestBillingData, setHighestBillingData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

    const restaurantId = "670d0ac4ccb7b9e2452e4d1d"; // Replace with actual restaurant ID or get from props/context

    useEffect(() => {
        const handleHighestBillingData = async () => {
            try {
                const response = await HighestBillingAmountDataForAdmin(restaurantId); // Pass restaurant ID here
                if (response.data.success) {
                    setHighestBillingData(response.data.HighestBillingAmountData); // Adjust according to the API response structure
                } else {
                    toastError(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toastError("Failed to load highest billing data."); // Display error toast
            }
        };
        handleHighestBillingData();
    }, [restaurantId]); // Only run when restaurantId changes

    // Debouncing for search input
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Filter the highest billing data based on the search query and date range
    const filteredHighestBillingData = highestBillingData.filter((item) => {
        const dateObject = new Date(item.billDate); // Assuming `billDate` is the field containing the date

        // Filter by search query (Bill ID)
        const matchesSearch = item.billID
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
                                    const dateObject = new Date(item.billDate); // Assuming billDate is a property in item
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
                                            <td>{item.billAmount.toFixed(2)}</td> {/* Ensure correct property name */}
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

export default HighestBillingAmount;
