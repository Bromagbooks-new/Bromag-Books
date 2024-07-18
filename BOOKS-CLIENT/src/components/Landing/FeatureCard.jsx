import BillingManagement from "@/assets/images/Bromag Dashboard Features/BillingManagement.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, imgSrc, exploreUrl }) => {
  return (
    <div className="w-80 h-[22rem] z-10 py-4 bg-[#E7F1FC] shadow-xl flex flex-col items-center justify-end gap-8">
      <img src={imgSrc} />
      <p className="text-lg  font-semibold text-center uppercase">{title}</p>
      <Link
        to={exploreUrl}
        className="text position
         text-2xl w-11/12 text-center text-white font-space-grotesk font-semibold bg-landing-primary border-1 border-landing-primary rounded-lg shadow-lg p-2"
      >
        View More
      </Link>
    </div>
  );
};

export default FeatureCard;
