
import trend from "@/assets/images/trend.svg";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const CountCard = ({ title, id, icon,  url, className, textColor2, textColor1, Count }) => {

  return (
    <Link
      to={url}
      className={cn(
        `rounded-2xl w-[14rem] p-2 px-3 pb-0 flex flex-col gap-0 bg-white shadow-md ${className}`
      )}
    >
      <>
        <div className="flex justify-between items-center">
          <p className={`font-semibold text-sm ${textColor1}`}>{title}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className={cn(`text-2xl font-bold`, textColor2)}>{ Count }</p>
          <img src={icon} className="w-16 h-16 relative bottom-4" />
        </div>
      </>
    </Link>
  );
};

export default CountCard;
