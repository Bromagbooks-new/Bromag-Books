import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAvailaibleInventory } from "@/config/routeApi/owner";

const AvailaibleInventoryManagement = () => {
    const [AvailaibleInventoryData, setAvailaibleInventoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await getAvailaibleInventory();
                console.log("total avialaible", response.data);
                if (response.status === 200) {
                    setAvailaibleInventoryData(response.data?.itemData);
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

    // Filter the AvailaibleInventoryData based on the search query and date range
    const filteredAvailaibleInventoryData = AvailaibleInventoryData?.filter((item) => {
        const matchesSearch = item?.name
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
                    <h3>Available Items List</h3>
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
                            Showing <strong>{filteredAvailaibleInventoryData.length}</strong> from <strong>{AvailaibleInventoryData.length}</strong> results
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
                                    <th>Total Quantity</th>
                                    <th>Available Quantity</th>
                                    <th>Bill Date</th>
                                    <th>Bill No</th>
                                    {/* <th>Vendor</th> */}
                                    <th>More Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAvailaibleInventoryData.map((item, i) => (
                                    <tr key={item.itemId} className={item.availableQuantity === 0 ? 'bg-red-100' : ''}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <img src={item.image} alt={item.name} className="w-10 h-10" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.totalQuantity}</td>
                                        <td>{item.availableQuantity}</td>
                                        <td>{item.billDate}</td>
                                        <td>{item.billNumber}</td>
                                        {/* <td>{item.vendor}</td> */}
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

export default AvailaibleInventoryManagement;
