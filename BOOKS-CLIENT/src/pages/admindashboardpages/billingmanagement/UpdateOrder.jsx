
import Bill from "@/components/billingmanagement/Bill";
import ItemCard from "@/components/billingmanagement/ItemCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FetchBill, GetAllCuisines, GetAllMenuItems, MenuCategory, MenuData } from "@/config/routeApi/owner";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toastError, toastSuccess } from "@/helpers/helpers";

const UpdateOrder = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCusine, setSelectedCusine] = useState("All");
    const [menuItems, setMenuItems] = useState([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

    useEffect(() => {
        getAllCuisines();
    }, [])
    const getAllCuisines = async () => {
        try {
            const { data } = await GetAllCuisines();
            // console.log('data:', data)
            setCategories(data?.cuisines)
        } catch (error) {
            console.log('error:', error)
            toastError(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getAllMenuItems();
    }, [])
    const getAllMenuItems = async () => {
        try {
            const { data } = await GetAllMenuItems();
            console.log('data getAllMenuItems:', data)
            setMenuItems(data?.data)
            setFilteredMenuItems(data?.data);
        } catch (error) {
            console.log('error:', error)
            toastError(error?.response?.data?.message)
        }
    }

    const handleSelectCusine = (data) => {
        console.log('data:', data)
        setSelectedCusine(data?.name)
    }

    return (
        <div className="py-4 w-full h-full flex flex-col gap-3 font-roboto">
            <div className="text-3xl flex gap-4 items-center font-semibold border-1">
                <Link to="/dashboard/billing-management">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <p>Select Dishes</p>
            </div>
            <ScrollArea className="w-[82rem] border-1" scrollbars="horizontal" size="1">
                <div className="h-[60px] border-1 flex gap-2 py-2">
                    <div
                        className={cn(
                            "rounded-3xl w-32 border-3 flex items-center justify-center bg-white text-gray-500 p-1 cursor-pointer",
                            {
                                "bg-black text-white": selectedCusine === "All",
                            }
                        )}
                        onClick={(e) => handleSelectCusine({ name: "All" })}
                    >
                        All
                    </div>
                    {categories?.map((cusine, index) => (
                        <div
                            key={cusine?._id}
                            className={cn(
                                "rounded-3xl w-32 border-3 flex items-center justify-center bg-white text-gray-500 text-center p-1 cursor-pointer",
                                {
                                    "bg-black text-white": selectedCusine === cusine.name,
                                }
                            )}
                            onClick={(e) => handleSelectCusine(cusine)}
                        >
                            {cusine.name}
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="border-1 w-full h-[80%] flex gap-2">
                <div className="border-1 w-[65%]">

                </div>
                <div className="border-1 w-[35%]"></div>
            </div>
        </div>
    );
};

export default UpdateOrder;