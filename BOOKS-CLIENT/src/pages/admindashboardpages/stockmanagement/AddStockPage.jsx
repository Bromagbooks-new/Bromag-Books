import AddStockForm from "@/components/stockmanagement/AddStockForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";

const AddStockPage = () => {
    // const { cuisines } = useLoaderData();

    return (
        <ScrollArea className="h-screen pb-20">
            <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
                <div className="flex justify-between items-center">
                    <div className="text-3xl flex gap-4 items-center font-semibold">
                        <Link to="/dashboard/stock-management">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <p>Add Stock</p>
                    </div>
                </div>
                <AddStockForm />
            </div>
        </ScrollArea>
    );
};

export default AddStockPage;
