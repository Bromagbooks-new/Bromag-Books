import { ChevronLeftIcon, ChevronRightIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
// import OpeningCashDenominationDialog from "./OpeningCashDenominationDialog";
// import ExpenseBillDialog from "./ExpenseBillDialog";

const AggregatorsTable = ({ aggregators }) => {
  console.log(aggregators);
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
              />
            </div>
            <Button className="bg-landing-secondary font-semibold h-8 px-8">
              Search
            </Button>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Label>From</Label>
            <div className="rounded border flex gap-2 bg-[#F4FAFF] border-[#758D9F] px-3 py-3 h-8 items-center">
              <Input
                // placeholder="Search by date"
                className="border-0 bg-transparent ring-0 h-6 w-16"
              />
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Label>To</Label>
            <div className="rounded border flex gap-2 bg-[#F4FAFF] border-[#758D9F] px-3 py-3 h-8 items-center">
              <Input
                // placeholder="Search by date"
                className="border-0 bg-transparent ring-0 h-6 w-16"
              />
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <Button className="bg-landing-secondary font-semibold h-8">
            Search
          </Button>
        </div>
      </div>
      <div className="rounded-lg flex flex-col gap-3 border py-3">
        <div className="flex justify-between items-center px-4">
          <p className="">
            Showing <span className="font-bold">10</span> from{" "}
            <span className="font-bold">95</span> results
          </p>

          <div className="flex gap-2 items-center text-white">
            <Button variant="icon" className="bg-[#1F303C] h-6 px-1">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <p className="text-teal-500">1-10</p>
            <Button variant="icon" className="bg-[#1F303C] h-6 px-1">
              <ChevronRightIcon className="h-4   w-4" />
            </Button>
          </div>
        </div>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow className="bg-[#1F303C] hover:bg-[#1F303C]">
              <TableHead className="text-white  rounded-tl-lg">S.no</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Description</TableHead>
              <TableHead className="text-center text-white w-[300px]">
                Id
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#F4FAFF]">
            {aggregators.map((aggregator, index) => (
              <TableRow key={aggregator._id}>
                <TableCell className="font-medium py-3">{index + 1}</TableCell>
                <TableCell className="py-3">{aggregator.name}</TableCell>
                <TableCell className="py-3">{aggregator.description}</TableCell>
                <TableCell className="py-3 text-center">
                  <div className="flex flex-col gap-2">{aggregator.id}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default AggregatorsTable;
