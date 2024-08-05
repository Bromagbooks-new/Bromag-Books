import { DownloadIcon, EyeIcon, Share2Icon, X } from "lucide-react";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";

const ViewBill = ({ bill, billItems, instructions, paymentMode }) => {


  const grossValue = billItems.reduce(
    (total, item) => (total += item.quantity * item.actualPrice),
    0
  );
  const discount = billItems.reduce(
    (total, item) =>
      (total += (item.actualPrice - item.discountPrice) * item.quantity),
    0
  );
  // console.log(discount);

  const netValue = billItems.reduce(
    (total, item) => (total += item.quantity * item.discountPrice),
    0
  );

  const taxRate = 5;
  const tax = (taxRate / 100) * netValue;

  let totalValue = netValue + tax;
  let roundOff = 0;

  if (paymentMode === "cash") {
    roundOff = totalValue - Math.round(totalValue);
    totalValue = Math.round(totalValue);
  }

  const address = bill.restrauntAddress[0];
  // console.log(address);

  const printAddress = `${address.building}, ${address.district}, ${address.city}, ${address.state}`;

  return (
    <DialogContent className="max-w-none rounded-2xl w-[24rem] px-0 py-4 flex flex-col justify-between gap-3 bg-white shadow">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-semibold">{bill.restrauntName}</p>
          <p className="text-xs text-gray-500 w-1/2 text-center">
            {printAddress}
          </p>
          <p className="text-sm text-gray-500">{address.phone}</p>
        </div>
        <div className="flex items-end gap-0 px-3 justify-between">
          <div className="flex gap-1 text-[12px] w-1/3">
            <div className="flex flex-col">
              <p className="">Date</p>
              <p className="">Time</p>
              <p className="">Bill No</p>
            </div>
            <div className="flex flex-col">
              <p className="">: {new Date(bill.date).toLocaleDateString()}</p>
              <p className="">: {new Date(bill.date).toLocaleTimeString()}</p>
              <p className="">: {bill.billNo}</p>
            </div>
          </div>
          <p className="text-2xl text-center font-semibold">INVOICE</p>
          <div className="w-1/3 flex gap-2 p-2 justify-end text-gray-600 opacity-0">
            <EyeIcon className="w-5 h- cursor-pointer" />
            <DownloadIcon className="w-5 h-5 cursor-pointer" />
            <Share2Icon className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-5 text-xs border-gray-500">
            <div className="border-dashed border-1 border-r-0 h-6 uppercase text-center flex items-center justify-center">
              S.NO
            </div>
            <div className="border-dashed border-1 border-x-0 h-6 uppercase col-span-2 text-center flex items-center justify-center">
              Menu Name
            </div>
            <div className="border-dashed border-1 flex items-center justify-center border-x-0 h-6 uppercase text-center">
              Quantity
            </div>
            <div className="border-dashed border-1 border-l-0 h-6 uppercase flex items-center justify-center text-center">
              Price
            </div>
          </div>

          <div className="grid grid-cols-5 text-xs ">
            {billItems.map((item, index) => (
              <>
                <div className="border-dashed border-1 border-r-0 py-2 text-center flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="border-dashed border-1 border-x-0 py-2 col-span-2 text-center flex items-center justify-center">
                  {item.name}
                </div>
                <div className="border-dashed border-1 flex py-2 items-center justify-center border-x-0  text-center gap-2">
                  {item.quantity}
                </div>
                <div className="border-dashed border-1 border-l-0 py-2  flex items-center justify-center text-center">
                  {item.actualPrice * item.quantity}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between px-3 uppercase text-xs">
        <div className="flex flex-col gap-1">
          <p>Gross Value</p>
          <p>Discount</p>
          <p>Net Value</p>
          <p>Taxes</p>
          <p>Round Off</p>
        </div>
        <div className="flex flex-col gap-1">
          <p>{grossValue}</p>
          <p>{discount}</p>
          <p>{netValue}</p>
          <p>{tax}</p>
          <p>{roundOff}</p>
        </div>
      </div>
      <div className="flex justify-between px-3 uppercase text-sm font-bold border-dashed border-y border-gray-500">
        <div className="flex flex-col gap-1 py-2">
          <p>Total Amount</p>
        </div>
        <div className="flex flex-col gap-1 py-2">
          <p>{totalValue}</p>
        </div>
      </div>

      <div className="text-sm px-3 border-dashed border-b pb-2 border-gray-500">
        <p className="uppercase">
          Instructions{" "}
        </p>
        <ul className="list-disc text-xs px-3">
          {instructions.map((instruction, index) => (
            <li
              className="group flex gap-2 items-center h-4 cursor-pointer"
              key={index}
            >
              <span className="hidden group-hover:block text-2xl cursor-pointer -ml-5">
                <X className="h-3 w-3" />
              </span>
              {instruction}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-end gap-10 border-gray-500 pb-2 border-dashed border-b text-sm px-3 justify-between">
        {bill.mode === "online" ? (
          <div className="flex gap-2 ">
            <div className="flex flex-col">
              <p className="">Order Mode</p>
              <p className="">Aggregator</p>
              <p className="">Order Id</p>
            </div>
            <div className="flex flex-col">
              <p className="">: {bill.mode}</p>
              <p className="">: {bill.aggregator}</p>
              <p className="">: {bill.aggregatorOrderId}</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 ">
            <div className="flex flex-col">
              <p className="">Customer Name</p>
              <p className="">Customer Number</p>
              <p className="">Order Mode</p>
            </div>
            <div className="flex flex-col">
              <p className="">: {bill.customerName}</p>
              <p className="">: {bill.customerPhone}</p>
              <p className="capitalize">: {bill.mode}</p>
            </div>
          </div>
        )}
      </div>
      <div className="text-sm px-3 pb-2 flex gap-2">
        <p className="uppercase">Mode of Payment</p>
        <div className="flex gap-1 items-center uppercase">
          <Label className="">{paymentMode}</Label>
        </div>
      </div>
    </DialogContent>
  );
};

export default ViewBill;
