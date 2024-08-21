import { Link, redirect, useLoaderData } from "react-router-dom";
import { ArrowLeft, CalendarCheck, CalendarPlus } from "lucide-react";
import OpeningTable from "@/components/billingmanagement/OpeningTable";
import {
  GetClosingReports,
  GetExpenses,
  GetOpeningReports,
  GetPassbookData,
  IsClosingReportCreatedToday,
  IsOpeningReportCreatedToday,
} from "@/config/routeApi/owner";
import { Button } from "@/components/ui/button";
import ExpenseTable from "@/components/billingmanagement/ExpenseTable";
import PassbookAnalyticsCard from "@/components/billingmanagement/PassbookAnalyticsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClosingReportTable from "@/components/billingmanagement/ClosingReportTable";

const Passbook = () => {
  const { reports, isCreatedToday, passbookData } = useLoaderData();
  // console.log(passbookData);
  const {openingBalance, salesAmount, totalExpenses, closingBalance, netAmount} = passbookData;
  // console.log(reports);
  // console.log(isCreatedToday);

  return (
    <ScrollArea className="h-screen pb-20 pr-10">
      <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
        <div className="flex justify-between items-center">
          <div className="text-3xl flex gap-4 items-center font-semibold">
            <Link to="/dashboard/billing-management">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <p>Passbook</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <PassbookAnalyticsCard
            id="opening-amount"
            title="Opening Amount"
            borderClass="border-3 border-yellow-500"
            amount={openingBalance}
          />
          <PassbookAnalyticsCard
            id="sales-amount"
            title="Sales Amount"
            borderClass="border-3 border-red-500"
            amount={salesAmount}
          />
          <PassbookAnalyticsCard
            id="expense-amount"
            title="Expense Amount"
            borderClass="border-3 border-violet-500"
            amount={totalExpenses}
          />
          <PassbookAnalyticsCard
            id="closing-amount"
            title="Closing Amount"
            borderClass="border-3 border-green-500"
            amount={closingBalance}
          />
          <PassbookAnalyticsCard
            id="total-sales"
            title="Available Balance"
            borderClass="border-3 border-sky-500"
            amount={netAmount}
          />
        </div>
        <div className="flex justify-between pt-4">
          <p className="text-3xl font-semibold">Closing Report</p>
          <Link to={isCreatedToday ? "#" : "closing-report"}>
            <Button
              className="bg-[#01A0A0] gap-2 px-3"
              disabled={isCreatedToday}
            >
              <CalendarCheck />
              Add Closing Report
            </Button>
          </Link>
        </div>
        <ClosingReportTable reports={reports} />
      </div>
    </ScrollArea>
  );
};

export default Passbook;

export const passbookReportLoader = async () => {
  try {
    const response = await GetClosingReports();
    const closingReportCreatedResponse = await IsClosingReportCreatedToday();
    const passbookResonse = await GetPassbookData({date: new Date()})
    if (response.status === 200) {
      const reports = response.data.reports;
      const passbookData = passbookResonse.data.passbookData;
      console.log(closingReportCreatedResponse.data);
      const isCreatedToday = closingReportCreatedResponse.data.isCreatedToday;
      return { reports, isCreatedToday, passbookData };
    }
  } catch (error) {
    console.error(error);
    return redirect("/dashboard/billing-management");
  }
};
