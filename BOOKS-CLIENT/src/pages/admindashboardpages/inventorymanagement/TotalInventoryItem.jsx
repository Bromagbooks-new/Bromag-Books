import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTotalInventory } from "@/config/routeApi/owner";

const TotalInventoryManagement = () => {
    const [TotalInventoryData, setTotalInventoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTotalInventory();
                console.log("totalinventory", response.data);
                if (response.status === 200) {
                    setTotalInventoryData(response.data?.itemData);
                }
            } catch (error) {
                console.log("error fetching total inventory", error)
            }
        }
        fetchData();

    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Filter the TotalInventoryData based on the search query and date range
    const filteredTotalInventoryData = TotalInventoryData?.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase());

        return matchesSearch;
    });

    return (
        <Wrapper className="page">
            <div className="page-content">
                <div className="text-3xl flex gap-4 mt-4 items-center font-semibold">
                    <Link to="/dashboard/inventory-management">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h3>Inventory Items List</h3>
                </div>

                <div className="mt-3" style={{ background: "white", padding: "2rem", borderRadius: '2rem' }}>
                    <div className="search-div flex justify-normal items-center">
                        <div className="search-input-group flex items-center">
                            <IoSearchSharp className="search-icon mr-2" />
                            <input
                                type="text"
                                placeholder="Search any item name"
                                className="search-bar p-2 border rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                className="ml-4 p-2 bg-gray-800 text-white rounded"
                                style={{ backgroundColor: "#486072" }}
                                onClick={() => setDebouncedSearchQuery(searchQuery)}
                            >
                                Search
                            </button>
                        </div>

                        <div className="date-picker-group flex items-center">
                            <p>From</p>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="ml-2 mr-4 p-2 border rounded"
                            />
                            <p>To</p>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className="ml-2 p-2 border rounded"
                            />
                            <button
                                className="ml-4 p-2 bg-gray-800 text-white rounded"
                                style={{ backgroundColor: "#486072" }}
                                onClick={() => setIsDateSearchClicked(true)}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="pagination-div mt-3 flex justify-between items-center">
                        <p>
                            Showing <strong>{filteredTotalInventoryData.length}</strong> from <strong>{TotalInventoryData.length}</strong> results
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
                                    <th>S.No</th>
                                    <th>Item Image</th>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                    <th>Item Type</th>
                                    <th>Total Quantity</th>
                                    <th>Left Out</th>
                                    <th>Created At</th>
                                    <th>Price Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTotalInventoryData.map((item, i) => {
                                    // Format createdAt to "MM/DD/YYYY, hh:mm AM/PM" format
                                    const formattedDate = new Date(item.createdAt).toLocaleString("en-US", {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    });

                                    return (
                                        <tr key={item.itemId} className={item.availableQuantity === 0 ? 'bg-red-100' : ''}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <img src={item.image} alt={item.name} className="w-10 h-10" />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.type}</td>
                                            <td>{item.totalQuantity}</td>
                                            <td>{item.leftOut}</td>
                                            <td>{formattedDate}</td>
                                            <td>{item.priceValue}</td>
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

export default TotalInventoryManagement;
