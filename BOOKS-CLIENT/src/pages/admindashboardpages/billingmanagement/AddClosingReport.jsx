import { Link, redirect } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import AddOpeningReportForm from "@/components/billingmanagement/AddOpeningReportForm";
import { IsClosingReportCreatedToday, IsOpeningReportCreatedToday } from "@/config/routeApi/owner";
import AddClosingReportForm from "@/components/billingmanagement/AddClosingReportForm";

const AddClosingReport = () => {
  return (
    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="flex justify-between items-center">
        <div className="text-3xl flex gap-4 items-center font-semibold">
          <Link to="/dashboard/billing-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Add Closing Report</p>
        </div>
      </div>
      <AddClosingReportForm />
    </div>
  );
};

export default AddClosingReport;

export const addClosingReportLoader = async () => {
  try {
    const response = await IsClosingReportCreatedToday();

    if (response.status === 200) {
      console.log(response.data);
      const {isCreatedToday} = response.data;
      if (!isCreatedToday) {
        return true;
      }

      return redirect("/dashboard/billing-management/passbook");
    }
  } catch (error) {
    console.error(error);
    return redirect("/dashboard/billing-management/passbook");
  }
};
