
import AddTableForm from "@/components/tablemanagement/AddTableForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddTableForTableManagement = () => {
    // console.log("Rendering AddTableForTableManagement");

    return <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
        <div className="flex justify-between items-center">
            <div className="text-3xl flex gap-4 items-center font-semibold">
                <Link to="/dashboard/table-management">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <p>Add Table</p>
            </div>
        </div>
        <AddTableForm />
    </div>

};

export default AddTableForTableManagement;