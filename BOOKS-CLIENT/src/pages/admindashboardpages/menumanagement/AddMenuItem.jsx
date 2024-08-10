

import AddCusineForm from "@/components/menumanagement/AddCusineForm";
import AddMenuItemForm from "@/components/menumanagement/AddMenuForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";





const AddMenuItem = ()=> {


    return <ScrollArea className="h-screen pb-20">

    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
    <div className="flex justify-between items-center">
      <div className="text-3xl flex gap-4 items-center font-semibold">
        <Link to="/dashboard/menu-management">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <p>Add Menu Item</p>
      </div>
    </div>
        <AddMenuItemForm />
    </div>
    </ScrollArea>

};

export default AddMenuItem;