
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Link } from "react-router-dom";
import Diagram2Seater from "@/assets/images/table-management/Diagram2Seater.svg"
import Diagram4Seater from "@/assets/images/table-management/Diagram4Seater.svg"
import Diagram6Seater from "@/assets/images/table-management/Diagram6Seater.svg"
import Diagram8Seater from "@/assets/images/table-management/Diagram8Seater.svg"
import downArrow from "@/assets/images/table-management/downArrow.svg"
import { GetNewTableData } from "@/config/routeApi/owner";

const TotalAddedTable = ({ totalAddedTableCount }) => {
    const [reports, setReports] = useState([]);
    // console.log('reports:', reports)
    const [page, setPage] = useState(1);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [filteredReports, setFilteredReports] = useState(reports);
    // console.log('filteredReports:', filteredReports);
    const totalPage = Math.ceil(totalAddedTableCount / 10);
    const isInitialMount = useRef(true);
    const [loader, setLoader] = useState(false);
    const [sortBy, setSortBy] = useState("createdAt");

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getDataOfTotalAddedTable();
        }
    }, [page, sortBy])

    const getDataOfTotalAddedTable = async () => {
        if (loader) return;
        setLoader(true);
        try {
            const { data } = await GetNewTableData(page, sortBy);
            // console.log('data:', data)
            if (data?.success) {
                setReports(data?.newAddedTableData);
                setFilteredReports(data?.newAddedTableData);
            }
        } catch (error) {
            console.error('error in getDataOfTotalAddedTable:', error)
        } finally {
            setLoader(false);
        }
    }

    // Handle Filter
    const handleSearch = () => {
        let filtered = reports;

        // Filter by date range
        if (fromDate || toDate) {
            const from = fromDate ? new Date(fromDate) : new Date(-8640000000000000); // Earliest date possible
            // console.log('from:', from)
            // Set the `toDate` to the last millisecond of the day (23:59:59.999)
            const to = toDate ? new Date(new Date(toDate).setHours(23, 59, 59, 999)) : new Date(8640000000000000); // Latest date possible
            // console.log('to:', to)
            filtered = filtered.filter((report) => {
                const reportDate = new Date(report.createdAt);
                // console.log('reportDate:', reportDate)
                // console.log('reportDate >= from:', reportDate >= from)
                // console.log('reportDate <= to:', reportDate <= to)
                return reportDate >= from && reportDate <= to;
            });
        }
        // console.log('filtered:', filtered)

        // Filter by specific search date
        if (searchDate) {
            filtered = filtered.filter((report) => {
                const reportDate = new Date(report.createdAt).toLocaleDateString();
                return reportDate === new Date(searchDate).toLocaleDateString();
            });
        }

        // console.log('filtered:', filtered)
        setFilteredReports(filtered);
    };

    return (
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
                        <Button disabled={page === 1} onClick={() => setPage((prev) => prev > 1 ? --prev : prev)} variant="icon" className="bg-[#1F303C] h-6 px-1">
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <p className="text-teal-500">{page}-{totalPage}</p>
                        <Button disabled={page === totalPage} onClick={() => setPage((prev) => ++prev)} variant="icon" className="bg-[#1F303C] h-6 px-1">
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#1F303C] hover:bg-[#1F303C]">
                            <TableHead className="text-center text-white  rounded-tl-lg w-[80px]">S.no</TableHead>
                            <TableHead className="text-center text-white w-[220px]">Diagrammatic Representation</TableHead>
                            <TableHead className="text-center text-white w-[180px]">
                                Table Number
                                <img src={downArrow} alt="sortByTableNumber" onClick={() => setSortBy("tableNumber")} className="inline ml-2 cursor-pointer" />
                            </TableHead>
                            <TableHead className="text-center text-white w-[180px]">
                                Seating Type
                                <img src={downArrow} alt="sortBySeatingType" onClick={() => setSortBy("numberOfSeats")} className="inline ml-2 cursor-pointer" />
                            </TableHead>
                            <TableHead className="text-center text-white w-[200px]">
                                Date Added
                                <img src={downArrow} alt="sortByDateAdded" onClick={() => setSortBy("createdAt")} className="inline ml-2 cursor-pointer" />
                            </TableHead>
                            <TableHead className="text-center text-white rounded-tr-lg w-[200px]">
                                Edit Table
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-[#F4FAFF]">
                        {filteredReports.map((report, index) => (
                            <TableRow key={report._id}>
                                <TableCell className="text-center font-medium py-3">{index + 1}</TableCell>
                                <TableCell className="flex justify-center py-3">
                                    {/* {console.log(report.numberOfSeats, report.numberOfSeats === 8)} */}
                                    <img src={report.numberOfSeats === 2 ? Diagram2Seater : report.numberOfSeats === 4 ? Diagram4Seater : report.numberOfSeats === 6 ? Diagram6Seater : report.numberOfSeats === 8 ? Diagram8Seater : null} className="w-14 h-14" alt="" />
                                </TableCell>
                                <TableCell className="text-center py-3">{report.tableNumber}</TableCell>
                                <TableCell className="text-center py-3">{report.numberOfSeats == 2 ? 2 : report.numberOfSeats == 4 ? 4 : report.numberOfSeats == 6 ? 6 : report.numberOfSeats === 8 ? 8 : null}</TableCell>
                                <TableCell className="text-center py-3">{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-center py-3">
                                    <Link to={`update-table/${report._id}`}>
                                        <Button className="bg-secondary h-8">More Options</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TotalAddedTable;