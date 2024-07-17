import BillingManagement from "@/assets/images/Bromag Dashboard Features/BillingManagement.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, imgSrc, exploreUrl }) => {
  return (
    <div className="w-80 h-[20rem] py-4 bg-[#E7F1FC] shadow-xl flex flex-col items-center justify-end gap-3">
      <img src={imgSrc} />
      <p className="text-lg  font-semibold text-center uppercase">{title}</p>
      <Link
        to={exploreUrl}
        className="text position
         text-2xl font-space-grotesk font-semibold bg-landing-primary border-1 border-landing-primary rounded-lg shadow-lg p-2"
      >
        View More
      </Link>
    </div>
  );
};

export default FeatureCard;
