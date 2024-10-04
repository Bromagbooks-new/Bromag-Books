import React, { useState } from "react";
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
import ExpenseBillDialog from "./ExpenseBillDialog";

const ExpenseTable = ({ reports }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredReports, setFilteredReports] = useState(reports);
  // console.log('filteredReports:', filteredReports)

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
              <TableHead className="text-white  rounded-tl-lg">S.no</TableHead>
              <TableHead className="text-white">Date
              </TableHead>
              <TableHead className="text-white">Total Amount</TableHead>
              <TableHead className="text-center text-white w-[300px]">
                Description
              </TableHead>
              <TableHead className="text-center text-white w-[300px] rounded-tr-lg">
                Bill
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#F4FAFF]">
            {filteredReports.map((report, index) => (
              <TableRow key={report._id}>
                <TableCell className="font-medium py-3">{index + 1}</TableCell>
                <TableCell className="py-3">{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="py-3">₹{report.totalAmount}</TableCell>
                <TableCell className="py-3">{report.description}</TableCell>
                <TableCell className="text-center py-3">
                  <Dialog>
                    <DialogTrigger>
                      <Button className="bg-secondary h-8">View</Button>
                    </DialogTrigger>
                    <ExpenseBillDialog bill={report.bill} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExpenseTable;
