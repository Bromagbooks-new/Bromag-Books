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
    // console.log("HERER")
    // console.log(bill);
    // console.log(formatImageUrl(bill));
    // console.log(denomination);
  return (
    <DialogContent className="p-0 border-0 max-w-none w-1/3" crossColor="text-white"  >
      <DialogHeader className="bg-[#1F303C] flex text-start p-4 h-16 text-white rounded-t-lg">
        <DialogTitle>Bill</DialogTitle>
      </DialogHeader>
     <div className="w-full h-96 rounded-xl">
        <img src={formatImageUrl(bill)} className="w-full h-full" />
     </div>
    </DialogContent>
  );
};

export default ExpenseBillDialog;
