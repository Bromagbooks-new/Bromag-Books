import BillingManagement from "@/assets/images/Bromag Dashboard Features/BillingManagement.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, imgSrc, exploreUrl }) => {
  return (
    <div className="last:relative  md:last:static w-46 md:w-[25rem] h-[13rem] md:h-[25rem] rounded z-10 px-2 py-0 md:px-4 md:py-4  bg-white shadow-xl flex flex-col font-roboto items-center justify-between">
      <img src={imgSrc} className="w-[10rem] h-[7rem] md:w-[22rem] md:h-[15rem] mt-3 rounded bg-[#DCFCFF] py-3" />
      <p className="text-sm md:text-2xl mb-2 font-medium text-center">{title}</p>
      <Link
        to={exploreUrl}
        className="text position
         text-sm md:text-2xl w-11/12 h-6 md:h-12 text-center text-white  bg-[#486072] mb-3 md:p-2 border-1  rounded-sm shadow-lg"
      >
        View More
      </Link>
    </div>
  );
};

export default FeatureCard;
