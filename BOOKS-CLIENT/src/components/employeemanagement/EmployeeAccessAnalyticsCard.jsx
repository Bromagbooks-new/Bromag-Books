import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import Online from "@/assets/images/billing-management/Online.svg";
import trend from "@/assets/images/trend.svg";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const EmployeeAccessAnalyticsCard = ({
  title,
  id,
  amount,
  icon,
  activatedIcon,
  borderClass,
  url,
}) => {
  return (
    <div
      className={cn(
        `rounded-2xl w-[16rem] p-3 px-3 flex flex-col gap-2 bg-white shadow-md ${borderClass}
        }`
      )}
    >
      <>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">{title}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className={cn("text-4xl font-bold text-gray-500")}>{amount}</p>
          <img src={Online} className="w-14 h-14" />
        </div>
        <div className=" flex gap-1">
          <img src={trend} className="w-5 h-5" />
          <span className="text-green-500">1.3%</span>
          <span>Up from past Week</span>
        </div>
      </>
    </div>
  );
};

export default EmployeeAccessAnalyticsCard;
