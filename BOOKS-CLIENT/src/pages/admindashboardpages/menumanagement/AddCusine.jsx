

import AddCusineForm from "@/components/menumanagement/AddCusineForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";





const AddCusine = ()=> {


    return <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
    <div className="flex justify-between items-center">
      <div className="text-3xl flex gap-4 items-center font-semibold">
        <Link to="/dashboard/menu-management">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <p>Add Cusine</p>
      </div>
    </div>
        <AddCusineForm />
    </div>

};

export default AddCusine;