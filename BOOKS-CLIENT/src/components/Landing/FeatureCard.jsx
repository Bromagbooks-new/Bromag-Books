import BillingManagement from "@/assets/images/Bromag Dashboard Features/BillingManagement.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, imgSrc, exploreUrl }) => {
  return (
    <div className="w-46 md:w-80 h-[12rem] md:h-[22rem] rounded z-10 px-2 py-2 md:px-4 md:py-4  bg-white shadow-xl flex flex-col font-roboto items-center justify-between">
      <img src={imgSrc} className="w-[10rem] h-[7rem] md:w-[18rem] md:h-[12rem] rounded bg-[#DCFCFF] py-3"/>
      <p className="text-sm md:text-2xl font-medium text-center">{title}</p>
      <Link
        to={exploreUrl}
        className="text position
         text-sm md:text-2xl w-11/12 h-6 md:h-10 text-center text-white md:font-semibold bg-landing-primary border-1 border-landing-primary rounded-sm shadow-lg"
      >
        View More
      </Link>
    </div>
  );
};

export default FeatureCard;
