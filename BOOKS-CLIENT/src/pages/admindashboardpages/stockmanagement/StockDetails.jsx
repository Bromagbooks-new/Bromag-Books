import AddStockForm from "@/components/stockmanagement/AddStockForm";
import StockDetailForm from "@/components/stockmanagement/StockDetailForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarPlus, StoreIcon } from "lucide-react";
const StockDetails = () => {
    // const { cuisines } = useLoaderData();

    return (
        <ScrollArea className="h-screen pb-20">
            <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
                <div className="flex justify-between items-center">
                    <div className="text-3xl flex gap-4 items-center font-semibold">
                        <Link to="/dashboard/stock-management/total-stock">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <p>Stock Details</p>
                    </div>
                    <div className="mr-3">
                        <Link to="edit-stock">
                            <Button className="bg-[#01A0A0] gap-3">
                                <CalendarPlus />
                                Edit Stock
                            </Button>
                        </Link>
                    </div>
                </div>

                <StockDetailForm />
            </div>
        </ScrollArea>
    );
};

export default StockDetails;
