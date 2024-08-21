import { Link, redirect, useLoaderData } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import AddOpeningReportForm from "@/components/billingmanagement/AddOpeningReportForm";
import { GetPassbookData, IsClosingReportCreatedToday, IsOpeningReportCreatedToday, PassBookData } from "@/config/routeApi/owner";
import AddClosingReportForm from "@/components/billingmanagement/AddClosingReportForm";
import { ScrollArea } from "@/components/ui/scroll-area";

const AddClosingReport = () => {

  const passbookData = useLoaderData();
  console.log(passbookData);

  return (
    <ScrollArea className="h-screen pb-20">

    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="flex justify-between items-center">
        <div className="text-3xl flex gap-4 items-center font-semibold">
          <Link to="/dashboard/billing-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Add Closing Report</p>
        </div>
      </div>
      <AddClosingReportForm netAmount={passbookData.netAmount} />
    </div>
    </ScrollArea>
  );
};

export default AddClosingReport;

export const addClosingReportLoader = async () => {
  try {
    const response = await IsClosingReportCreatedToday();
    
    
    if (response.status === 200) {
      console.log(response.data);
      const {isCreatedToday} = response.data;
      
      if(isCreatedToday) return redirect("/dashboard/billing-management/passbook");
      
      const passbookDataResponse = await GetPassbookData({date: new Date()});

      if(passbookDataResponse.status === 200) {
        const {passbookData} = passbookDataResponse.data;
        console.log(passbookDataResponse.data);
        return passbookData;

      }
      
    }
  } catch (error) {
    console.error(error);
    return redirect("/dashboard/billing-management/passbook");
  }
};
