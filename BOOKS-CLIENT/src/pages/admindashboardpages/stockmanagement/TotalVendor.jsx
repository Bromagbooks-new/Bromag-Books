import Wrapper from "../../../assets/wrappers/adminwrappers/BasicDetails";
import Table from "react-bootstrap/Table";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TotalVendor = () => {
    const [vendorData, setVendorData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDateSearchClicked, setIsDateSearchClicked] = useState(false);

    useEffect(() => {
        const dummyVendorData = [
            {
                _id: "vendor-detail-1",
                vendorName: "SRS Enterprises",
                phoneNumber: "999-999-9999",
                emailId: "srs@example.com",
                typeOfVendor: "Vegetables",
                licenseNumber: "267479875893",
            },
            {
                _id: "vendor-detail-1",
                vendorName: "SRS Enterprises",
                phoneNumber: "999-999-9999",
                emailId: "srs@example.com",
                typeOfVendor: "Vegetables",
                licenseNumber: "267479875893",
            },
            {
                _id: "vendor-detail-1",
                vendorName: "SRS Enterprises",
                phoneNumber: "999-999-9999",
                emailId: "ses@example.com",
                typeOfVendor: "Vegetables",
                licenseNumber: "267479875893",
            },
            {
                _id: "vendor-detail-1",
                vendorName: "SRS Enterprises",
                phoneNumber: "999-999-9999",
                emailId: "affa@example.com",
                typeOfVendor: "Vegetables",
                licenseNumber: "267479875893",
            },
            {
                _id: "vendor-detail-1",
                vendorName: "SRS Enterprises",
                phoneNumber: "999-999-9999",
                emailId: "ad@example.com",
                typeOfVendor: "Vegetables",
                licenseNumber: "267479875893",
            },
        ];

        setVendorData(dummyVendorData);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const filteredVendorData = vendorData?.filter((vendor) =>
        vendor.vendorName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    return (
        <Wrapper className="page">
            <div className="page-content">
                <div className="text-3xl flex gap-4 mt-4 items-center font-semibold">
                    <Link to="/dashboard/stock-management">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h3>Total Vendors</h3>
                </div>

                <div className="mt-4" style={{ background: "white", padding: "2rem", borderRadius: '2rem' }}>
                    <div className="search-div flex w-full justify-normal items-center">
                        <div className="search-input-group w-full flex items-center">
                            <IoSearchSharp className="search-icon mr-2" />
                            <input
                                type="text"
                                placeholder="Search any vendor name"
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
                    </div>

                    <div className="pagination-div mt-4 flex justify-between items-center">
                        <p>
                            Showing <strong>{filteredVendorData.length}</strong> from <strong>{vendorData.length}</strong> results
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
                                    <th>Vendor Name</th>
                                    <th>Phone Number</th>
                                    <th>Email ID</th>
                                    <th>Type of Vendor</th>
                                    <th>License Number</th>
                                    <th>More Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVendorData.map((vendor, i) => (
                                    <tr key={vendor._id}>
                                        <td>{i + 1}</td>
                                        <td>{vendor.vendorName}</td>
                                        <td>{vendor.phoneNumber}</td>
                                        <td>{vendor.emailId}</td>
                                        <td>{vendor.typeOfVendor}</td>
                                        <td>{vendor.licenseNumber}</td>
                                        <td>
                                            <Link to={`/dashboard/stock-management/total-vendor/${vendor._id}`}>
                                                <button className="p-2 bg-[#486072] text-white rounded" style={{ backgroundColor: "#486072" }}>
                                                    More Options
                                                </button>
                                            </Link>
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

export default TotalVendor;
