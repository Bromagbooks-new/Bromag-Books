import { Link, redirect } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import AddOpeningReportForm from "@/components/billingmanagement/AddOpeningReportForm";
import { IsOpeningReportCreatedToday } from "@/config/routeApi/owner";

const AddOpeningReport = () => {
  return (
    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="flex justify-between items-center">
        <div className="text-3xl flex gap-4 items-center font-semibold">
          <Link to="/dashboard/billing-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Add Opening Report</p>
        </div>
      </div>
      <AddOpeningReportForm />
    </div>
  );
};

export default AddOpeningReport;

export const addOpeningReportLoader = async () => {
  try {
    const response = await IsOpeningReportCreatedToday();

    if (response.status === 200) {
      console.log(response.data);
      const {isCreatedToday} = response.data;
      if (!isCreatedToday) {
        return true;
      }

      return redirect("/dashboard/billing-management/opening-report");
    }
  } catch (error) {
    console.error(error);
    return redirect("/dashboard/billing-management/opening-report");
  }
};
