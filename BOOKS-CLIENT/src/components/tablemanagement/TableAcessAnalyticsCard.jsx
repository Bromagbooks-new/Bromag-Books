
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

const TableAcessAnalyticsCard = ({
    title,
    id,
    amount,
    icon,
    borderClass,
    tableValue,
    textcolor,
    UpdateCountIcon
}) => {
    return (
        <div
            style={{border : borderClass}}
            className={cn(
                `rounded-2xl w-[290px] p-3 px-3 flex flex-col gap-2 bg-white shadow-md
          }`
            )}
        >
            <>
                <div className="flex justify-between items-center">
                    <p className="font-bold text-486072-color">{title}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className={cn("text-4xl font-bold text-gray-500")}>{tableValue}</p>
                    <img src={icon} className="w-14 h-14" />
                </div>
                <div className=" flex gap-1" style={{color : textcolor}}>
                    <img src={UpdateCountIcon} className="w-5 h-5" />
                    <span>Update count</span>
                </div>
            </>
        </div>
    );
};

export default TableAcessAnalyticsCard;  