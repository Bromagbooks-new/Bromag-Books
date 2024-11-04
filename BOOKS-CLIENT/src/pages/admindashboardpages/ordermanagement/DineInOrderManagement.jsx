import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTotalDineInOrderData } from "../../../config/routeApi/owner";
import { toastError } from "../../../helpers/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DineInOrderManagement = () => {
    const [dineInData, setDineInData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const handleDineInData = async () => {
            try {
                const response = await getTotalDineInOrderData();
                console.log("response123", response.data.DineInOrderData)
                if (response.data.success) {
                    const flattenedData = response.data.DineInOrderData.flatMap((bill) =>
                        bill.items.map((item) => ({
                            billDate: bill.billDate,
                            time: bill.time,
                            billId: bill.billId,
                            billAmount: bill.billAmount,
                            modeOfPayment: bill.modeOfPayment,
                            tableNo: bill.tableNo,
                            itemName: item.itemName,
                            itemId: item.itemId,
                        }))
                    );
                    setDineInData(flattenedData);
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

    const filteredDineInData = dineInData.filter((item) => {
        const dateObject = new Date(item.billDate);
        const matchesSearch = item.billId.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            item.itemId.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        const isWithinDateRange =
            (!isDateSearchClicked ||
                ((!startDate || dateObject >= startDate) && (!endDate || dateObject <= endDate)));
        return matchesSearch && isWithinDateRange;
    });

    const totalPages = Math.ceil(filteredDineInData.length / itemsPerPage);
    const paginatedData = filteredDineInData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDateSearch = () => {
        setIsDateSearchClicked(true);
        setCurrentPage(1); // Reset to the first page when a new search is made
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
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
                                    placeholder="Search by Order ID or Bill ID"
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
                            Showing <strong>{paginatedData.length}</strong> from <strong>{filteredDineInData.length}</strong> results
                        </p>
                        <div className="pagination-controls">
                            <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
                            <span>{currentPage} / {totalPages}</span>
                            <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
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
                                    <th>Table No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item, i) => {
                                    const dateObject = new Date(item.billDate);
                                    const formattedDate = dateObject.toLocaleDateString();
                                    const formattedTime = dateObject.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });

                                    return (
                                        <tr key={`${item.billId}-${item.itemId}`}>
                                            <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.itemId}</td>
                                            <td>{formattedDate}</td>
                                            <td>{formattedTime}</td>
                                            <td>{item.billId}</td>
                                            <td>{item.billAmount}</td>
                                            <td>{item.modeOfPayment}</td>
                                            <td>{item.tableNo}</td>
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
