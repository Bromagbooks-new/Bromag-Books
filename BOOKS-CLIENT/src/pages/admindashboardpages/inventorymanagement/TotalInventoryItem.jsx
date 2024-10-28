import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TotalInventoryManagement = () => {
    const [TotalInventoryData, setTotalInventoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

    useEffect(() => {
        // Dummy data for non-veg orders
        const dummyTotalInventoryData = [
            {
                _id: "1",
                itemImage: "image_url", // Replace with the actual image URL or path
                itemName: "Chicken",
                totalQuantity: 3,
                availableQuantity: 3,
                billDate: "14 July 2024",
                billNo: "234454",
                vendor: "SRS Enterprises",
            },
            {
                _id: "2",
                itemImage: "image_url", // Replace with the actual image URL or path
                itemName: "Chicken",
                totalQuantity: 3,
                availableQuantity: 3,
                billDate: "14 July 2024",
                billNo: "343434",
                vendor: "SRS Enterprises",
            },
            {
                _id: "3",
                itemImage: "image_url", // Replace with the actual image URL or path
                itemName: "Chicken",
                totalQuantity: 3,
                availableQuantity: 3,
                billDate: "14 July 2024",
                billNo: "4342",
                vendor: "SRS Enterprises",
            },
            {
                _id: "4",
                itemImage: "image_url", // Replace with the actual image URL or path
                itemName: "Chicken",
                totalQuantity: 3,
                availableQuantity: 3,
                billDate: "14 July 2024",
                billNo: "378494",
                vendor: "SRS Enterprises",
            },
            {
                _id: "5",
                itemImage: "image_url", // Replace with the actual image URL or path
                itemName: "Chicken",
                totalQuantity: 3,
                availableQuantity: 3,
                billDate: "14 July 2024",
                billNo: "565654",
                vendor: "SRS Enterprises",
            },
        ];

        setTotalInventoryData(dummyTotalInventoryData);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Filter the TotalInventoryData based on the search query and date range
    const filteredTotalInventoryData = TotalInventoryData?.filter((item) => {
        const matchesSearch = item.itemName
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

                <div className="mt-4" style={{ background: "white", padding: "2rem", borderRadius: '2rem' }}>
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

                    <div className="pagination-div mt-4 flex justify-between items-center">
                        <p>
                            Showing <strong>{filteredTotalInventoryData.length}</strong> from <strong>{TotalInventoryData.length}</strong> results
                        </p>
                        <div className="pagination-controls">
                            <button>&lt;</button>
                            <span>1 - 10</span>
                            <button>&gt;</button>
                        </div>
                    </div>

                    <div className="table-div mt-4">
                        <Table striped bordered hover className="table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Item Image</th>
                                    <th>Item Name</th>
                                    <th>Total Quantity</th>
                                    <th>Available Quantity</th>
                                    <th>Bill Date</th>
                                    <th>Bill No</th>
                                    <th>Vendor</th>
                                    <th>More Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTotalInventoryData.map((item, i) => (
                                    <tr key={item._id} className={item.availableQuantity === 0 ? 'bg-red-100' : ''}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <img src={item.itemImage} alt={item.itemName} className="w-10 h-10" />
                                        </td>
                                        <td>{item.itemName}</td>
                                        <td>{item.totalQuantity}</td>
                                        <td>{item.availableQuantity}</td>
                                        <td>{item.billDate}</td>
                                        <td>{item.billNo}</td>
                                        <td>{item.vendor}</td>
                                        <td>
                                            <button className="p-2 bg-[#486072] text-white rounded" style={{ backgroundColor: "#486072" }}>More Options</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default TotalInventoryManagement;
