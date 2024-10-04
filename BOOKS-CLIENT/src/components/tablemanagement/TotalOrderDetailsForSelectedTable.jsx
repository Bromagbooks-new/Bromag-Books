
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import deleteTable from "@/assets/images/table-management/deleteTable.svg"
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Search } from "lucide-react";

const TotalOrderDetailsForSelectedTable = ({ reports }) => {
    // console.log("Rendering AddTableForTableManagement");
    // console.log('reports:', reports)
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [filteredReports, setFilteredReports] = useState(reports);
    console.log('filteredReports:', filteredReports)

    // Handle Filter
    const handleSearch = () => {
        let filtered = reports;

        // Filter by date range
        if (fromDate || toDate) {
            const from = fromDate ? new Date(fromDate) : new Date(-8640000000000000); // Earliest date possible
            const to = toDate ? new Date(toDate) : new Date(8640000000000000); // Latest date possible
            filtered = filtered.filter((report) => {
                const reportDate = new Date(report.createdAt);
                return reportDate >= from && reportDate <= to;
            });
        }

        // Filter by specific search date
        if (searchDate) {
            filtered = filtered.filter((report) => {
                const reportDate = new Date(report.createdAt).toLocaleDateString();
                return reportDate === new Date(searchDate).toLocaleDateString();
            });
        }

        setFilteredReports(filtered);
    };

    return (
        <>
            <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
                <div className="flex justify-between items-center">

                    <div className="text-3xl flex gap-4 items-center font-semibold">
                        <p>Table Order Details</p>
                    </div>
                    <div className="flex gap-4">
                        <Button className="bg-[#ED2B2B] gap-2">
                            <img src={deleteTable} className="w-[1.5rem] h-[1.5rem]" />
                            Clear Order History
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-10 bg-white rounded-xl p-4">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-semibold">Search by Date</p>
                        <div className="flex gap-4 items-center">
                            <div className="rounded border flex gap-2 bg-[#F4FAFF] border-[#758D9F] px-3 py-3 h-8 items-center">
                                <Search className="w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search by date"
                                    className="border-0 bg-transparent ring-0 h-6 w-64"
                                    value={searchDate}
                                    onChange={(e) => setSearchDate(e.target.value)}
                                    type="date"
                                />
                            </div>
                            <Button
                                className="bg-landing-secondary font-semibold h-8 px-8"
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2 items-center">
                            <Label>From</Label>
                            <div className="rounded border flex gap-2 bg-[#F4FAFF] border-[#758D9F] px-3 py-3 h-8 items-center">
                                <Input
                                    className="border-0 bg-transparent ring-0 h-6"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    type="date"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Label>To</Label>
                            <div className="rounded border flex gap-2 bg-[#F4FAFF] border-[#758D9F] px-3 py-3 h-8 items-center">
                                <Input
                                    className="border-0 bg-transparent ring-0 h-6"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    type="date"
                                />
                            </div>
                        </div>
                        <Button
                            className="bg-landing-secondary font-semibold h-8"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>
                </div>
                <div className="rounded-lg flex flex-col gap-3 border py-3">
                    <div className="flex justify-between items-center px-4">
                        <p className="">
                            Showing <span className="font-bold">{filteredReports.length}</span>{" "}
                            from <span className="font-bold">{reports.length}</span> results
                        </p>

                        <div className="flex gap-2 items-center text-white">
                            <Button variant="icon" className="bg-[#1F303C] h-6 px-1">
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                            <p className="text-teal-500">1-10</p>
                            <Button variant="icon" className="bg-[#1F303C] h-6 px-1">
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#1F303C] hover:bg-[#1F303C]">
                                <TableHead className="text-center text-white  rounded-tl-lg">S.no</TableHead>
                                <TableHead className="text-center text-white">Order details</TableHead>
                                <TableHead className="text-center text-white">Total Number</TableHead>
                                <TableHead className="text-center text-white">Bill Date</TableHead>
                                <TableHead className="text-center text-white">Time</TableHead>
                                <TableHead className="text-center text-white">Bill ID</TableHead>
                                <TableHead className="text-center text-white">Bill Amount</TableHead>
                                <TableHead className="text-center text-white">Mode Of Payment</TableHead>
                                <TableHead className="text-center text-white rounded-tr-lg">Mode Of Order</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-[#F4FAFF]">
                            {filteredReports.map((report, index) => (
                                <TableRow key={report._id}>
                                    <TableCell className="text-center font-medium py-3">{index + 1}</TableCell>
                                    <TableCell className="text-center font-medium py-3">{"Hyderabadi Chicken Biryani"}</TableCell>
                                    <TableCell className="text-center py-3">{"03"}</TableCell>
                                    <TableCell className="text-center py-3">{new Date().toLocaleDateString()}</TableCell>
                                    <TableCell className="text-center py-3">{new Date().getHours().toLocaleString()}</TableCell>
                                    <TableCell className="text-center py-3">{"1234567891"}</TableCell>
                                    <TableCell className="text-center py-3">{"999.00"}</TableCell>
                                    <TableCell className="text-center py-3">{"Card Payment"}</TableCell>
                                    <TableCell className="text-center py-3">{"Dine In"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
};

export default TotalOrderDetailsForSelectedTable;