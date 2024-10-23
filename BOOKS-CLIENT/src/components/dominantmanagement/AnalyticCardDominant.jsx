import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import trend from "@/assets/images/trend.svg";

const AnalyticsCardDominant = ({
    title,
    id,
    icon,
    activatedIcon,
    activatedClass,
    url,
    breakdown
}) => {
    // const selectedBreakdown = breakdown?.dailyBreakdown; // Default to daily breakdown

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
                    </div>
                    <div className="flex justify-between items-center">
                        <p
                            className={cn("text-3xl font-bold text-gray-500", {
                                "text-black": isActive,
                            })}
                        >
                            {/* {selectedBreakdown[id]} */}
                            23
                        </p>
                        <img src={isActive ? activatedIcon : icon} className="w-14 h-14" />
                    </div>
                    <div className="flex gap-1">
                        <img src={trend} className="w-5 h-5" />
                        <span className="text-green-500">1.3%</span>
                        <span>Up from past Week</span>
                    </div>
                </>
            )}
        </NavLink>
    );
};

export default AnalyticsCardDominant;
