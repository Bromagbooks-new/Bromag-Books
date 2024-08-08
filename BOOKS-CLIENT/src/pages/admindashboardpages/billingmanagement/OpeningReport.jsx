import { Link, redirect, useLoaderData } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import OpeningTable from "@/components/billingmanagement/OpeningTable";
import {
  GetOpeningReports,
  IsOpeningReportCreatedToday,
} from "@/config/routeApi/owner";
import { Button } from "@/components/ui/button";

const OpeningReport = () => {
  const { reports, isCreatedToday } = useLoaderData();
  console.log(isCreatedToday);

  return (
    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="flex justify-between items-center">
        <div className="text-3xl flex gap-4 items-center font-semibold">
          <Link to="/dashboard/billing-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Opening Report</p>
        </div>
        <Link
          to={isCreatedToday ? "#" : "add-report"}
          className="bg-[#01A0A0] rounded-xl text-[14px] p-0 px-4 font-bold flex gap-2 text-white"
        >
          <Button disabled={isCreatedToday} className="p-0 bg-transparent flex gap-2">
            <CalendarPlus className="h-5 w-5" />
            Add Opening
          </Button>
        </Link>
      </div>
      <OpeningTable reports={reports} />
    </div>
  );
};

export default OpeningReport;

export const openingReportLoader = async () => {
  try {
    const response = await GetOpeningReports();
    const openingReportCreatedResponse = await IsOpeningReportCreatedToday();
    if (response.status === 200) {
      const reports = response.data.reports;
      console.log(openingReportCreatedResponse.data);
      const isCreatedToday = openingReportCreatedResponse.data.isCreatedToday;
      return { reports, isCreatedToday };
    }
  } catch (error) {
    console.error(error);
    return redirect("/dashboard/billing-management");
  }
};
