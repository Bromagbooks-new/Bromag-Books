import { Link, redirect, useLoaderData } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import OpeningTable from "@/components/billingmanagement/OpeningTable";
import {
  GetAllAggregators,
  GetAllCuisines,
  GetExpenses,
  GetOpeningReports,
  IsOpeningReportCreatedToday,
} from "@/config/routeApi/owner";
import { Button } from "@/components/ui/button";
import ExpenseTable from "@/components/billingmanagement/ExpenseTable";
import CuisinesTable from "@/components/menumanagement/CuisinesTable.jsx";
import AggregatorsTable from "@/components/menumanagement/AggregatorsTable";

const Aggregators = () => {
  const { aggregators } = useLoaderData();
  // console.log(reports);
  // console.log(isCreatedToday);

  return (
    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="flex justify-between items-center">
        <div className="text-3xl flex gap-4 items-center font-semibold">
          <Link to="/dashboard/menu-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Aggregators</p>
        </div>
        <Link
          to={"add-aggregator"}
          className="bg-[#01A0A0] rounded-xl text-[14px] p-0 px-4 font-bold flex gap-2 text-white"
        >
          <Button className="p-0 bg-transparent flex gap-2">
            <CalendarPlus className="h-5 w-5" />
            Add Aggregator
          </Button>
        </Link>
      </div>
      <AggregatorsTable aggregators={aggregators} />
      {/* <ExpenseTable reports={reports} /> */}
    </div>
  );
};

export default Aggregators;

export const aggregatorsLoader = async () => {
  try {
    const response = await GetAllAggregators();
    // const openingReportCreatedResponse = await IsOpeningReportCreatedToday();
    if (response.status === 200) {

      console.log(response.data);
      const aggregators = response.data.aggregators;
      // console.log(openingReportCreatedResponse.data);
      // const isCreatedToday = openingReportCreatedResponse.data.isCreatedToday;
      return { aggregators };
    }
  } catch (error) {
    console.error(error);
    return redirect("/dashboard/menu-management");
  }
};
