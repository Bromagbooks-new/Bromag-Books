import { Link } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import OpeningTable from "@/components/billingmanagement/OpeningTable";

const OpeningReport = () => {
  return (
    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="flex justify-between items-center">
        <div className="text-3xl flex gap-4 items-center font-semibold">
          <Link to="/dashboard/billing-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Opening Report</p>
        </div>
        <Link to="add-report" className="bg-[#01A0A0] rounded-xl text-[14px] p-3 px-4 font-bold flex gap-2 text-white">
          <CalendarPlus className="h-5 w-5"/>
          Add Opening
        </Link>
      </div>
      <OpeningTable />
    </div>
  );
};

export default OpeningReport;
