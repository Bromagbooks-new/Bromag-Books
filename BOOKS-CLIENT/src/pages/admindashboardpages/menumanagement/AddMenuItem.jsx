import AddCusineForm from "@/components/menumanagement/AddCusineForm";
import AddMenuItemForm from "@/components/menumanagement/AddMenuForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetAllAggregators, GetAllCuisines } from "@/config/routeApi/owner";
import { ArrowLeft } from "lucide-react";
import { Link, redirect, useLoaderData } from "react-router-dom";

const AddMenuItem = () => {

  const {aggregators, cuisines} = useLoaderData();
  console.log(aggregators, cuisines);

  return (
    <ScrollArea className="h-screen pb-20">
      <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
        <div className="flex justify-between items-center">
          <div className="text-3xl flex gap-4 items-center font-semibold">
            <Link to="/dashboard/menu-management">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <p>Add Menu Item</p>
          </div>
        </div>
        <AddMenuItemForm aggregators={aggregators} cuisines={cuisines} />
      </div>
    </ScrollArea>
  );
};

export default AddMenuItem;

export const addMenuItemLoader = async () => {

  // console.log("HERERERERE");

  try {
    const aggregatorResponse = await GetAllAggregators();
    const cuisinesResponse = await GetAllCuisines();

    if (aggregatorResponse.status === 200 && cuisinesResponse.status === 200) {

      console.log(aggregatorResponse.data, cuisinesResponse.data);

      return {
        aggregators: aggregatorResponse.data.aggregators,
        cuisines: cuisinesResponse.data.cuisines,
      };
    }
  } catch (error) {
    console.error(error);

    return redirect("/dashboard/menu-management");
  }
};
