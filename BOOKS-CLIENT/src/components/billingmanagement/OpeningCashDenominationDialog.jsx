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

const OpeningCashDenominationDialog = ({ denomination, date }) => {
    console.log("HERER")
    console.log(denomination);
  return (
    <DialogContent className="p-0 border-0 max-w-none w-1/4" crossColor="text-white">
      <DialogHeader className="bg-[#1F303C] flex text-start p-4 h-16 text-white rounded-t-lg">
        <DialogTitle>Denomination - {new Date(date).toLocaleDateString()}</DialogTitle>
      </DialogHeader>
      <Table className="-mt-6">
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">Currency</TableCell>
            <TableCell className="font-bild">Count</TableCell>
          </TableRow>

          {Object.keys(denomination).map((key) => (
            <TableRow key={key}>
              <TableCell className="py-3">₹{key}</TableCell>
              <TableCell className="py-3">{denomination[key]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  );
};

export default OpeningCashDenominationDialog;
