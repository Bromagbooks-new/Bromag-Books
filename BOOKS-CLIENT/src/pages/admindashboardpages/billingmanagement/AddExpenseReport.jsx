import { Link } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import AddOpeningReportForm from "@/components/billingmanagement/AddOpeningReportForm";
import AddExpenseReportForm from "@/components/billingmanagement/AddExpenseReportForm";

const AddExpenseReport = () => {
  return (
    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="flex justify-between items-center">
        <div className="text-3xl flex gap-4 items-center font-semibold">
          <Link to="/dashboard/billing-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Add Expense</p>
        </div>
      </div>
      <AddExpenseReportForm />
    </div>
  );
};

export default AddExpenseReport;
