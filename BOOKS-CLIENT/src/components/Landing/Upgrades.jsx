import FeatureCard from "./FeatureCard";
import CaptainManagement from "@/assets/images/landing-images/upgrades/CaptainManagement.svg";
import PayrollManagement from "@/assets/images/landing-images/upgrades/PayrollManagement.svg";
import KDSManagement from "@/assets/images/landing-images/upgrades/KDSManagement.svg";
import OnlineManagement from "@/assets/images/landing-images/upgrades/OnlineOrderManagement.svg";
import IntegrationManagement from "@/assets/images/landing-images/upgrades/IntegrationManagement.svg";

import ellipse545 from '@/assets/images/landing-images/Ellipse 545.svg'
import ellipse544 from '@/assets/images/landing-images/Ellipse 544.svg'


const Upgrades = () => {
  return (
    <div className="pt-24 flex flex-col items-center bg-[#1F303C] font-roboto-condensed">
       <div className="relative h-0">
        <img className="relative z-0 left-[100%] top-10" src={ellipse545} />
      </div>
      <div className="relative h-0">
        <img className="relative z-10 right-[33rem] top-20" src={ellipse544} />
      </div>
      <p className="text-5xl uppercase font-semibold mt-36  text-white py-10">
        Upgrades
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {upgrades.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            imgSrc={feature.imgSrc}
            exploreUrl={feature.exploreUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Upgrades;

const upgrades = [
  {
    id: 1,
    title: "Captain Management",
    imgSrc: CaptainManagement,
    exploreUrl: "/upgrade/#captain",
  },
  {
    id: 2,
    title: "Payroll Management",
    imgSrc: PayrollManagement,
    exploreUrl: "/upgrade/#payroll",
  },
  {
    id: 3,
    title: "KDS Management",
    imgSrc: KDSManagement,
    exploreUrl: "/upgrade/#kds",
  },
  {
    id: 4,
    title: "Online Management",
    imgSrc: OnlineManagement,
    exploreUrl: "/upgrade/#online",
  },
  {
    id: 5,
    title: "Integration Management",
    imgSrc: IntegrationManagement,
    exploreUrl: "/upgrade/#integration",
  },
];
