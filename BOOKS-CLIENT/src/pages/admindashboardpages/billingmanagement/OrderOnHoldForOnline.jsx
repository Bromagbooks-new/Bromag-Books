
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TotalOrdersAndOnHoldOrderTableForTakeAway from "@/components/billingmanagement/TotalOrdersAndOnHoldOrderTableForTakeAway";
import { useLoaderData } from "react-router-dom";
import { FetchHoldBills } from "@/config/routeApi/owner";
import { ScrollArea } from "@/components/ui/scroll-area";

const OrderOnHoldForOnline = () => {
    const { holdBill } = useLoaderData();
    // console.log('holdBill:', holdBill)
    // console.log(reports);
    // console.log(isCreatedToday);

    return (
        // <ScrollArea className="h-screen pb-20 pr-10">
        <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
            <div className="flex justify-between items-center">
                <div className="text-3xl flex gap-4 items-center font-semibold">
                    <Link to="/dashboard/billing-management/online-order">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <p>Orders On Hold</p>
                </div>
            </div>
            <ScrollArea className="h-screen pb-20 pr-5">
                <div className="bg-white rounded-xl p-4">
                    <div className="rounded-lg gap-3">
                        <TotalOrdersAndOnHoldOrderTableForTakeAway Bills={holdBill} />
                    </div>
                </div>
            </ScrollArea>
        </div>
        // </ScrollArea>
    );
};

export default OrderOnHoldForOnline;

export const fetchHoldBillsForOnlineFn = async () => {
    try {
        const { data } = await FetchHoldBills("online");
        // console.log('data:', data)
        return { holdBill: data?.bill || [] }
    } catch (error) {
        console.log("error in fetchHoldBillsFn OrderOnHoldForOnline.jsx :", error);
    }
}