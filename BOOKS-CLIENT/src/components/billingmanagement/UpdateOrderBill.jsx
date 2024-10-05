
import {
    CheckIcon,
    CrossIcon,
    DownloadIcon,
    EyeIcon,
    Share2Icon,
    X,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { useState, useMemo } from "react";
import { Input } from "../ui/input";
import { DeleteBill, GenerateKOT, UpdateBill } from "@/config/routeApi/owner";
import { toastError, toastSuccess } from "@/helpers/helpers";
import { redirect, useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger } from "../ui/dialog";
// import ViewBill from "./ViewBill";
// import DownloadBill from "./DownloadBill";
// import ViewKOT from "./ViewKOT";

const UpdateOrderBill = ({ bill, billItems, addItem, subtractItem }) => {
    console.log('billItems:', billItems)
    // console.log('bill:', bill)
    const [instructions, setInstructions] = useState([]);
    const [sentToKot, setSentToKot] = useState(false);
    const navigate = useNavigate();
    const [paymentMode, setPaymentMode] = useState("cash");
    const [inputInstruction, setInputInstruction] = useState("");
    const [showInstruction, setShowIntruction] = useState(false);

    const address = bill.restrauntAddress[0];
    const printAddress = `${address.building}, ${address.district}, ${address.city}, ${address.state}`;

    const valueCalculator = useMemo(() => {
        // const object = {
        //     grossValueTotal : 0,
        //     discountTotal : 0,
        //     netValue : 0
        // }
        // const grossValueTotal = billItems.reduce((total, item) => {
        //     total += item.quantity * item.actualPrice
        //     return total;
        // },0)
        // console.log('grossValueTotal:', grossValueTotal)
        // object.grossValueTotal = grossValueTotal;
        // const discountTotal = billItems.reduce((total, item) => {
        //     total += (item.discountPrice * item.quantity);
        //     return total
        // },0)
        // console.log('discountTotal:', discountTotal);
        // object.discountTotal = discountTotal;
        // object.netValue = grossValueTotal - discountTotal;
        // console.log('object:', object)
        const valueObject = billItems.reduce((value, item) => {
            value.grossValueTotal += item.quantity * item.actualPrice;
            value.discountTotal += item.discountPrice * item.quantity;
            return value;
        }, { 
            grossValueTotal: 0, 
            discountTotal: 0, 
            netValue: 0, 
            tax : 0, 
            totalPayValValue : 0 ,
            roundOff : 0
        })
        // console.log('valueObject:', valueObject)
        valueObject.netValue = valueObject.grossValueTotal - valueObject.discountTotal
        let taxRate = 5;
        valueObject.tax = ( taxRate / 100 ) * valueObject.netValue;
        valueObject.totalPayValValue = valueObject.netValue + valueObject.tax
        console.log('valueObject:', valueObject)
        if(paymentMode === "cash") {
            valueObject.roundOff = valueObject.totalPayValValue - Math.round(valueObject.totalPayValValue);
            if(valueObject.roundOff < 0) { 
                valueObject.roundOff = valueObject.roundOff * -1
            }
            // console.log('valueObject.roundOff:', valueObject.roundOff)
            valueObject.totalPayValValue = Math.round(valueObject.totalPayValValue);
            console.log('valueObject.totalPayValValue:', valueObject.totalPayValValue)
        }
        return valueObject;
    }, [billItems, paymentMode])
    console.log('valueCalculator:', valueCalculator)

    return (
        <div className="rounded-2xl w-full px-0 py-4 flex flex-col justify-between gap-3 bg-white shadow">
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl font-semibold">{bill.restrauntName}</p>
                    <p className="text-xs text-gray-500 w-1/2 text-center">
                        {printAddress}
                    </p>
                    <p className="text-sm text-gray-500">{"address.phone"}</p>
                </div>
                <div className="flex items-end gap-0 px-3 justify-between">
                    <div className="flex gap-1 text-[10px] w-1/3">
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
                    <div className="w-1/3 flex gap-2 p-2 justify-end text-gray-600">
                        <Dialog>
                            <DialogTrigger>
                                <EyeIcon className="w-5 h- cursor-pointer" />
                            </DialogTrigger>
                            {/* <ViewBill
                                bill={"bill"}
                                billItems={"billItems"}
                                paymentMode={"paymentMode"}
                                instructions={"instructions"}
                            /> */}
                        </Dialog>
                        <Dialog>
                            <DialogTrigger>
                                <DownloadIcon className="w-5 h-5 cursor-pointer" />
                            </DialogTrigger>
                            {/* <DownloadBill
                                bill={"bill"}
                                billItems={"billItems"}
                                paymentMode={"paymentMode"}
                                instructions={"instructions"}
                            /> */}
                        </Dialog>
                        <Share2Icon className="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
                <div className="border-0 w-full">
                    <div className="w-full grid grid-cols-7 text-[12px] text-color-1F303C font-bold border-gray-500">
                        <div className="border-dashed w-[3rem]  border-1 border-r-0 h-6 uppercase text-center flex items-center justify-center">
                            S.NO
                        </div>
                        <div className="border-dashed relative w-[9.5rem] left-[-17px] border-1 border-x-0 h-6 uppercase col-span-2 text-center flex items-center justify-center">
                            Menu Name
                        </div>
                        <div className="border-dashed relative w-[5.5rem] left-[8.4px]  border-1 border-x-0 h-6 uppercase col-span-2 text-center flex items-center justify-center">
                            Portion
                        </div>
                        <div className="border-dashed relative border-1 w-[5rem] left-[-32px] flex items-center justify-center border-x-0 h-6 uppercase text-center">
                            Quantity
                        </div>
                        <div className="border-dashed relative w-[5rem] left-[-16px] border-1 border-l-0 h-6 uppercase flex items-center justify-center text-center">
                            Price
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-7 text-[12px] text-color-1F303C font-normal">
                        {billItems?.map((item, index) => (
                            <>
                                <div className="border-dashed border-1 w-[3rem] border-r-0 py-2 text-center flex items-center justify-center">
                                    {index + 1}
                                </div>
                                <div className="border-dashed relative w-[9.5rem] left-[-17px] border-1 border-x-0 py-2 col-span-2 text-center flex items-center justify-center">
                                    {item.name}
                                </div>
                                <div className="border-dashed relative w-[5.5rem] left-[8.4px] border-1 border-x-0 py-2 col-span-2 text-center flex items-center justify-center">
                                    {item.portion}
                                </div>
                                <div className="border-dashed relative left-[-32px] w-[5rem] border-1 flex py-2 items-center justify-center border-x-0  text-center gap-2">
                                    <span
                                        className="text-base cursor-pointer"
                                        onClick={() => subtractItem(item)}
                                    >
                                        -
                                    </span>
                                    {item.quantity}
                                    <span
                                        className="cursor-pointer text-base"
                                        onClick={() => addItem(item)}
                                    >
                                        +
                                    </span>
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
                    <span
                        className="text-xl cursor-pointer"
                        onClick={"() => setShowIntruction(true)"}
                    >
                        +
                    </span>
                </p>
                <ul className="list-disc text-xs px-3">
                    {["", ""].map((instruction, index) => (
                        <li
                            className="group flex gap-2 items-center h-4 cursor-pointer"
                            onClick={"() => removeInstruction(index)"}
                            key={index}
                        >
                            <span className="hidden group-hover:block text-2xl cursor-pointer -ml-5">
                                <X className="h-3 w-3" />
                            </span>
                            {instruction}
                        </li>
                    ))}
                    {"showInstruction" && (
                        <div className="flex gap-1 mt-1 items-center">
                            <Input
                                className="text-sm h-6"
                                onChange={"(e) => handleInstructionInput(e.target.value)"}
                            />
                            <Button
                                onClick={"() => addInstruction()"}
                                className="h-6 w-auto px-2"
                            >
                                <CheckIcon />
                            </Button>
                        </div>
                    )}
                </ul>
            </div>

            <div className="flex items-end gap-10 border-gray-500 pb-2 border-dashed border-b text-sm px-3 justify-between">
                {"bill.mode" === "online" ? (
                    <div className="flex gap-2 ">
                        <div className="flex flex-col">
                            <p className="">Order Mode</p>
                            <p className="">Aggregator</p>
                            <p className="">Order Id</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="">: {"bill.mode"}</p>
                            <p className="">: {"bill.aggregator"}</p>
                            <p className="">: {"bill.aggregatorOrderId"}</p>
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
                            <p className="">: {"bill.customerName"}</p>
                            <p className="">: {"bill.customerPhone"}</p>
                            <p className="">: {"bill.mode"}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="text-sm px-3 pb-2 flex flex-col gap-2">
                <p className="uppercase">Mode of Payment</p>
                <RadioGroup
                    className="flex flex-col gap-1"
                    value={"paymentMode"}
                    onValueChange={"setPaymentMode"}
                >
                    <div className="flex gap-1">
                        <RadioGroupItem value="card" />
                        <Label className="">Credit/Debit Card</Label>
                    </div>
                    <div className="flex gap-1">
                        <RadioGroupItem value="upi" />
                        <Label className="">UPI Payment</Label>
                    </div>
                    <div className="flex gap-1">
                        <RadioGroupItem value="cash" />
                        <Label className="">Cash</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex gap-0 justify-between text-sm border-dashed border-b pb-2 border-gray-500 p-2">
                    <Button
                        onClick={"handleCancelBill"}
                        className="text-center px-2 h-8 flex justify-center items-center rounded-3xl border-2 bg-white text-black"
                    >
                        CANCEL BILL
                    </Button>
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                type="button"
                                className="text-center px-4 h-8 flex justify-center items-center rounded-3xl border-2 bg-white text-black"
                            >
                                KOT
                            </Button>
                        </DialogTrigger>
                        {/* <ViewKOT
                            bill={"bill"}
                            billItems={"billItems"}
                            instructions={"instructions"}
                            paymentMode={"paymentMode"}
                            sentToKot={"sentToKot"}
                            handleKOT={"handleKOT"}
                        /> */}
                    </Dialog>
                    <Button
                        onClick={"handleHoldBill"}
                        className="text-center px-2 h-8 flex justify-center items-center rounded-3xl border-2 bg-white text-black"
                    >
                        HOLD ORDER
                    </Button>
                </div>
                <div className="flex justify-center">
                    <Button
                        disabled={!"sentToKot"}
                        onClick={"handlePrintBill"}
                        className="bg-[#486072] rounded-3xl w-5/6  flex justify-center items-center text-white py-1 h-8 "
                    >
                        PRINT BILL
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderBill;