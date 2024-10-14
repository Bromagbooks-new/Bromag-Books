
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import TotalOrdersAndOnHoldOrderTableForTakeAway from "@/components/billingmanagement/TotalOrdersAndOnHoldOrderTableForTakeAway";
import { useLoaderData, useLocation } from "react-router-dom";
import { FetchHoldBills } from "@/config/routeApi/owner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetTotalBillsEitherForTakeAwayOrOnlineOrders } from "@/config/routeApi/owner";


const TotalOrdersForOnline = () => {
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    console.log('page:', page)
    const isInitialMount = useRef(true);
    const [loader, setLoader] = useState(false);
    const locations = useLocation();
    const queryParams = new URLSearchParams(locations.search);
    const totalOrders = queryParams.get("total-orders") || 0;
    const totalPage = Math.ceil(totalOrders / 10);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getTotalOrdersForOnlineFn();
        }
    }, [page])

    const getTotalOrdersForOnlineFn = async () => {
        if (loader) return;
        console.log("Here");
        setLoader(true);
        try {
            const { data } = await GetTotalBillsEitherForTakeAwayOrOnlineOrders(page, "online");
            console.log('data:', data)
            if (data?.success) {
                setReports(data?.totalOrdersBillData);
            }
        } catch (error) {
            console.log('error in getTotalOrdersForOnlineFn:', error)
        } finally {
            setLoader(false);
        }
    }

    return (
        // <ScrollArea className="h-screen pb-20 pr-10">
        <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
            <div className="flex justify-between items-center">
                <div className="text-3xl flex gap-4 items-center font-semibold">
                    <Link to="/dashboard/billing-management/online-order">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <p>Total Orders</p>
                </div>
            </div>
            <ScrollArea className="h-screen pb-20 pr-5">
                <div className="bg-white rounded-xl p-4">
                    <div className="rounded-lg flex flex-col gap-3 py-3">
                        <div className="flex justify-between items-center px-4">
                            <p className="">
                                Showing <span className="font-bold">{reports?.length}</span>{" "}
                                from <span className="font-bold">{totalOrders}</span> results
                            </p>

                            <div className="flex gap-2 items-center text-white">
                                <Button disabled={page === 1} onClick={() => setPage((prev) => prev > 1 ? --prev : prev)} variant="icon" className="bg-[#1F303C] h-6 px-1">
                                    <ChevronLeftIcon className="h-4 w-4" />
                                </Button>
                                <p className="text-teal-500">{page} - {totalPage}</p>
                                <Button disabled={page === totalPage} onClick={() => setPage((prev) => ++prev)} variant="icon" className="bg-[#1F303C] h-6 px-1">
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <TotalOrdersAndOnHoldOrderTableForTakeAway Bills={reports} />
                    </div>
                </div>
            </ScrollArea>
        </div >
        // </ScrollArea>
    );
};

export default TotalOrdersForOnline;