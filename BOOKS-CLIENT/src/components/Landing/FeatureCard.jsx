import BillingManagement from "@/assets/images/Bromag Dashboard Features/BillingManagement.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, imgSrc, exploreUrl }) => {
  return (
    <div className="w-46 md:w-80 h-[14rem] md:h-[22rem] z-10 py-4 bg-[#E7F1FC] shadow-xl flex flex-col items-center justify-end gap-2 md:gap-8">
      <img src={imgSrc} className="w-[10rem] h-[5rem] md:w-[20rem] md:h-[10rem]"/>
      <p className="text-sm md:text-xl  font-semibold text-center uppercase">{title}</p>
      <Link
        to={exploreUrl}
        className="text position
         md:text-2xl w-11/12 text-center text-white font-semibold bg-landing-primary border-1 border-landing-primary rounded-lg shadow-lg p-2"
      >
        View More
      </Link>
    </div>
  );
};

export default FeatureCard;
