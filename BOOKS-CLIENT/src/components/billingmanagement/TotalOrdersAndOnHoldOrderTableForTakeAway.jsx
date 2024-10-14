
import React, { useState, useEffect, useRef } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

import { Dialog, DialogTrigger } from "../ui/dialog";
import ViewBill from "./ViewBill";
import { Link } from "react-router-dom";

const TotalOrdersAndOnHoldOrderTableForTakeAway = ({ Bills }) => {

    // console.log('Bills:', Bills)

    return (
        // <ScrollArea className="h-screen pb-20 pr-5">
            // <div className="bg-white rounded-xl p-4">
                // <div className="rounded-lg gap-3">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#1F303C] hover:bg-[#1F303C]">
                                <TableHead className="text-center text-white rounded-tl-lg">S.no</TableHead>
                                <TableHead className="text-center text-white">Items Ordered</TableHead>
                                <TableHead className="text-center text-white">Quantity</TableHead>
                                <TableHead className="text-center text-white">Date</TableHead>
                                <TableHead className="text-center text-white">Bill ID</TableHead>
                                <TableHead className="text-center text-white">Total Amount</TableHead>
                                <TableHead className="text-center text-white rounded-tr-lg">View Bill/Add Items</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-[#F4FAFF] border-1">
                            {Bills?.map((report, index) => {
                                const grossValue = report?.items?.reduce((total, item) => {
                                    return total + (item.quantity * item.actualPrice)
                                }, 0) || 0

                                const discount = report?.items?.reduce((total, item) => {
                                    return total + ((item.actualPrice - item.discountPrice) * item.quantity);
                                }, 0) || 0

                                const netValue = grossValue - discount;
                                const taxRate = 5;
                                const tax = (taxRate / 100) * netValue
                                const totalAmount = netValue + tax;

                                return (
                                    <TableRow key={report?._id}>
                                        <TableCell className="text-center font-medium py-3">{index + 1}</TableCell>
                                        <TableCell className="text-center py-3">
                                            {report?.items?.map((item, index) => {
                                                return (
                                                    <div key={item?._id} className="mb-[5px]">{item?.name}</div>
                                                )
                                            })}
                                        </TableCell>
                                        <TableCell className="text-center py-3">
                                            {report?.items?.map((item, index) => {
                                                return (
                                                    <div key={item?.itemId} className="mb-[5px]">{item?.quantity}</div>
                                                )
                                            })}
                                        </TableCell>
                                        <TableCell className="text-center py-3">{new Date(report?.date).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-center py-3">{report?.billNo}</TableCell>
                                        <TableCell className="text-center py-3">{totalAmount.toFixed(2)}</TableCell>
                                        <TableCell className="text-center flex flex-col gap-2 justify-center items-center py-3">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button className="rounded-[4px] w-[83px] h-[26px] text-[13px] px-6 py-2 bg-486072-color font-normal">View Bill</Button>
                                                </DialogTrigger>
                                                <ViewBill 
                                                    bill={report}
                                                    billItems={report.items}
                                                    paymentMode={report.paymentMode}
                                                    instructions={report.instructions}
                                                />
                                            </Dialog>
                                            <Link to={`/dashboard/billing-management/order?id=${report?._id}`} className="rounded-[4px] w-[83px] h-[26px] text-[13px] px-2 py-2 bg-486072-color flex items-center justify-center text-[#ffffff] font-normal">Add Items</Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                // </div>
            // </div>
        // </ScrollArea>
    );
};

export default TotalOrdersAndOnHoldOrderTableForTakeAway;