import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useState } from "react";

import Online from "@/assets/images/billing-management/Online.svg";
import trend from "@/assets/images/trend.svg";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const AnalyticsCard = ({
  title,
  id,
  icon,
  activatedIcon,
  activatedClass,
  url,
  breakdown
}) => {
  const [selectedFilter, setSelectedFilter] = useState("today");

  // console.log('breakdown:', breakdown)
  let selectedBreakdown = breakdown.dailyBreakdown;
  // console.log('selectedBreakdown:', selectedBreakdown)

  if(selectedFilter === 'today') {
    selectedBreakdown = breakdown.dailyBreakdown;
  }
  if(selectedFilter === 'monthly') {
    selectedBreakdown = breakdown.monthlyBreakdown;
  }
  if(selectedFilter === 'weekly') {
    selectedBreakdown = breakdown.weeklyBreakdown;
  }

  // console.log(id);
  // console.log(selectedBreakdown);

  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        cn(
          `rounded-2xl w-[16rem] p-2 px-3 flex flex-col gap-1 border-3 bg-white shadow-md ${
            isActive && activatedClass
          }`
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex justify-between items-center">
            <p className="font-semibold">{title}</p>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-auto gap-1 bg-transparent border-0 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center">
            <p
              className={cn("text-3xl font-bold text-gray-500", {
                "text-black": isActive,
              })}
            >
              {selectedBreakdown[id]}
            </p>
            <img src={isActive ? activatedIcon : icon} className="w-14 h-14" />
          </div>
          <div className=" flex gap-1">
            <img src={trend} className="w-5 h-5" />
            <span className="text-green-500">1.3%</span>
            <span>Up from past Week</span>
          </div>
        </>
      )}
    </NavLink>
  );
};

export default AnalyticsCard;