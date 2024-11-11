import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from "@/components/ui/select";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import trendUp from "@/assets/images/trend.svg";
import trendDown from "@/assets/images/trend-down.svg";

const AnalyticsCardDashboard = ({
    title,
    id,
    icon,
    activatedIcon,
    activatedClass,
    url,
    breakdown
}) => {
    const [selectedFilter, setSelectedFilter] = useState("today");

    const stats = selectedFilter === 'today'
        ? breakdown.today
        : selectedFilter === 'monthly'
            ? breakdown.month
            : breakdown.week;

    const percentageChange = selectedFilter === 'today'
        ? breakdown.todayChangePercentage
        : selectedFilter === 'monthly'
            ? breakdown.monthChangePercentage
            : breakdown.weekChangePercentage;

    const isPositiveChange = percentageChange >= 0;
    const trendImage = isPositiveChange ? trendUp : trendDown;
    const trendColor = isPositiveChange ? "text-green-500" : "text-red-500";
    const trendText = isPositiveChange ? "Up" : "Down";
    const filterText = selectedFilter === "today" ? "from yesterday" : selectedFilter === "weekly" ? "from last week" : "from last month";

    const data = id === "sales" ? `₹${stats}` : stats;

    return (
        <NavLink
            to={url}
            className={({ isActive }) =>
                cn(
                    `rounded-2xl w-[20rem] p-2 px-3 flex flex-col gap-1 border-3 bg-white shadow-md ${isActive && activatedClass
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
                            {data}
                        </p>
                        <img src={isActive ? activatedIcon : icon} className="w-14 h-14" />
                    </div>
                    <div className="flex gap-1 items-center">
                        <img src={trendImage} className="w-5 h-5" alt="trend" />
                        <span className={trendColor}>{Math.abs(percentageChange)}%</span>
                        <span>{trendText} {filterText}</span>
                    </div>
                </>
            )}
        </NavLink>
    );
};

export default AnalyticsCardDashboard;
