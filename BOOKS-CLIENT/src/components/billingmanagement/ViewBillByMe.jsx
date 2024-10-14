
import { DownloadIcon, EyeIcon, Share2Icon, X } from "lucide-react";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { useMemo } from "react";
import { ScrollArea } from "../ui/scroll-area";

const ViewBillByMe = ({ bill }) => {
    console.log('bill:', bill)
    // console.log(discount);

    const valueCalculator = useMemo(() => {
        
        const valueObject = bill?.items?.reduce((value, item) => {
            value.grossValueTotal += item.quantity * item.actualPrice;
            value.discountTotal += item.discountPrice * item.quantity;
            return value;
        }, {
            grossValueTotal: 0,
            discountTotal: 0,
            netValue: 0,
            tax: 0,
            totalPayValValue: 0,
            roundOff: 0
        })
        // console.log('valueObject:', valueObject)
        valueObject.netValue = valueObject.grossValueTotal - valueObject.discountTotal
        let taxRate = 5;
        valueObject.tax = (taxRate / 100) * valueObject.netValue;
        valueObject.totalPayValValue = valueObject.netValue + valueObject.tax
        // console.log('valueObject:', valueObject)
        if (bill?.paymentMode === "cash") {
            valueObject.roundOff = valueObject.totalPayValValue - Math.round(valueObject.totalPayValValue);
            valueObject.roundOff = valueObject.roundOff * -1
            // console.log('valueObject.roundOff:', valueObject.roundOff)
            valueObject.totalPayValValue = Math.round(valueObject.totalPayValValue);
            // console.log('valueObject.totalPayValValue:', valueObject.totalPayValValue)
        }
        return valueObject;
    }, [bill])

    const address = bill?.restrauntAddress[0];
    // console.log(address);

    const printAddress = `${address.building}, ${address.district}, ${address.city}, ${address.state}`;

    return (
        <DialogContent className="max-w-none rounded-2xl w-[29rem] h-[45rem] px-0 py-4 flex flex-col justify-between gap-3 bg-white shadow">
            <div className="flex flex-col justify-between border-0 h-[42.5rem] gap-3">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-xl font-semibold">{bill?.restrauntName}</p>
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
                                <p className="">: {new Date(bill?.date).toLocaleDateString()}</p>
                                <p className="">: {new Date(bill?.date).toLocaleTimeString()}</p>
                                <p className="">: {bill?.billNo}</p>
                            </div>
                        </div>
                        <p className="text-2xl text-center font-semibold">INVOICE</p>
                        <div className="w-1/3 flex gap-2 p-2 justify-end text-gray-600">
                            <EyeIcon className="w-5 h- cursor-pointer" />
                            <DownloadIcon className="w-5 h-5 cursor-pointer" />
                            <Share2Icon className="w-5 h-5 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between border-0 border-blue h-[32rem] gap-3">
                    <ScrollArea className="h-screen pb-[2rem] pr-2">
                        <div className="flex flex-col justify-between border-0 gap-3">
                            <div className="flex flex-col gap-6">
                                <div className="border-0 w-full">
                                    <div className="w-full grid grid-cols-7 text-[12px] text-color-1F303C font-bold border-gray-500">
                                        <div className="border-dashed w-[3rem]  border-1 border-r-0 h-6 uppercase text-center flex items-center justify-center">
                                            S.NO
                                        </div>
                                        <div className="border-dashed relative w-[9.7rem] left-[-17px] border-1 border-x-0 h-6 uppercase col-span-2 text-center flex items-center justify-center">
                                            Menu Name
                                        </div>
                                        <div className="border-dashed relative w-[5.7rem] left-[8.2px]  border-1 border-x-0 h-6 uppercase col-span-2 text-center flex items-center justify-center">
                                            Portion
                                        </div>
                                        <div className="border-dashed relative border-1 w-[5.1rem] left-[-32px] flex items-center justify-center border-x-0 h-6 uppercase text-center">
                                            Quantity
                                        </div>
                                        <div className="border-dashed relative w-[5rem] left-[-16px] border-1 border-l-0 h-6 uppercase flex items-center justify-center text-center">
                                            Price
                                        </div>
                                    </div>

                                    <div className="w-full grid grid-cols-7 text-[12px] text-color-1F303C font-normal">
                                        {bill?.items?.map((item, index) => (
                                            <>
                                                <div className="border-dashed border-1 w-[3rem] border-r-0 py-2 text-center flex items-center justify-center">
                                                    {index + 1}
                                                </div>
                                                <div className="border-dashed relative w-[9.7rem] left-[-17px] border-1 border-x-0 py-2 col-span-2 text-center flex items-center justify-center">
                                                    {item.name}
                                                </div>
                                                <div className="border-dashed relative w-[5.7rem] left-[8.2px] border-1 border-x-0 py-2 col-span-2 text-center flex items-center justify-center">
                                                    {item.portion}
                                                </div>
                                                <div className="border-dashed relative left-[-32px] w-[5.1rem] border-1 flex py-2 items-center justify-center border-x-0  text-center gap-2">
                                                    {item.quantity}
                                                </div>
                                                <div className="border-dashed relative w-[5rem] left-[-16px] border-1 border-l-0 py-2  flex items-center justify-center text-center">
                                                    {(item.actualPrice - item.discountPrice) * item.quantity}
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
                                    <p>{valueCalculator?.grossValueTotal}</p>
                                    <p>{valueCalculator?.discountTotal}</p>
                                    <p>{valueCalculator?.netValue}</p>
                                    <p>{valueCalculator?.tax}</p>
                                    <p>{valueCalculator?.roundOff}</p>
                                </div>
                            </div>
                            <div className="flex justify-between px-3 uppercase text-sm font-bold border-dashed border-y border-gray-500">
                                <div className="flex flex-col gap-1 py-2">
                                    <p>Total Amount</p>
                                </div>
                                <div className="flex flex-col gap-1 py-2">
                                    <p>{valueCalculator?.totalPayValValue}</p>
                                </div>
                            </div>

                            <div className="text-sm px-3 border-dashed border-b pb-2 border-gray-500">
                                <p className="uppercase">
                                    Instructions{" "}
                                </p>
                                <ul className="list-disc text-xs px-3">
                                    {bill?.instructions?.map((instruction, index) => (
                                        <li
                                            className="group flex gap-2 items-center h-4 cursor-pointer"
                                            key={index}
                                        >
                                            {index + 1} : {instruction}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-end gap-10 border-gray-500 pb-2 border-dashed border-b text-sm px-3 justify-between">
                                {bill?.mode === "online" ? (
                                    <div className="flex gap-2 ">
                                        <div className="flex flex-col">
                                            <p className="">Order Mode</p>
                                            <p className="">Aggregator</p>
                                            <p className="">Order Id</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="">: {bill?.mode}</p>
                                            <p className="">: {bill?.aggregator}</p>
                                            <p className="">: {bill?.aggregatorOrderId}</p>
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
                                            <p className="">: {bill?.customerName}</p>
                                            <p className="">: {bill?.customerPhone}</p>
                                            <p className="capitalize">: {bill?.mode}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="text-sm px-3 pb-2 flex gap-2">
                                <p className="uppercase">Mode of Payment</p>
                                <div className="flex gap-1 items-center uppercase">
                                    <Label className="">{bill?.paymentMode}</Label>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </DialogContent >
    );
};

export default ViewBillByMe;