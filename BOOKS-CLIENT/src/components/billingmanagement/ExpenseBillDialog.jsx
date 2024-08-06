import { formatImageUrl } from "@/helpers/helpers";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

const ExpenseBillDialog = ({ bill }) => {
    console.log("HERER")
    console.log(bill);
    // console.log(denomination);
  return (
    <DialogContent className="p-0 border-0 max-w-none w-1/4">
      <DialogHeader className="bg-[#1F303C] flex text-start p-4 h-16 text-white rounded-t-lg">
        <DialogTitle>Bill</DialogTitle>
      </DialogHeader>
     <div className="w-3/4 h-96 rounded-xl">
        <img sec={formatImageUrl(bill)} className="w-64 h-64" />
     </div>
    </DialogContent>
  );
};

export default ExpenseBillDialog;
