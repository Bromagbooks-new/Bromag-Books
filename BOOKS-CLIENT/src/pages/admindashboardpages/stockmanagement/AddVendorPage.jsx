import AddVendorForm from "@/components/stockmanagement/AddVendorForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetAllCuisines } from "@/config/routeApi/owner";
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";

const AddVendorPage = () => {
    // const { cuisines } = useLoaderData();

    return (
        <ScrollArea className="h-screen pb-20">
            <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
                <div className="flex justify-between items-center">
                    <div className="text-3xl flex gap-4 items-center font-semibold">
                        <Link to="/dashboard/stock-management">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <p>Add Vendor</p>
                    </div>
                </div>
                <AddVendorForm />
            </div>
        </ScrollArea>
    );
};

export default AddVendorPage;
