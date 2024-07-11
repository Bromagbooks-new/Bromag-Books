import BillingManagement from "@/assets/images/Bromag Dashboard Features/BillingManagement.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, imgSrc, exploreUrl }) => {
  return (
    <div className="w-60 h-72 py-4 bg-[#E7F1FC] shadow-xl flex flex-col items-center justify-end gap-3">
      <img src={imgSrc} />
      <p className="text-lg text-landing-primary font-semibold text-center uppercase">{title}</p>
      <Link
        to={exploreUrl}
        className="text-2xl font-space-grotesk font-semibold bg-[#E7F1FC] border-1 border-landing-primary rounded-lg shadow-lg p-2"
      >
        Explore
      </Link>
    </div>
  );
};

export default FeatureCard;
