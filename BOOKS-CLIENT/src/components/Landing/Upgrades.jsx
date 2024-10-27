import FeatureCard from "./FeatureCard";
import CaptainManagement from "@/assets/images/landing-images/upgrades/CaptainManagement.svg";
import PayrollManagement from "@/assets/images/landing-images/upgrades/PayrollManagement.svg";
import KDSManagement from "@/assets/images/landing-images/upgrades/KDSManagement.svg";
import OnlineManagement from "@/assets/images/landing-images/upgrades/OnlineOrderManagement.svg";
import IntegrationManagement from "@/assets/images/landing-images/upgrades/IntegrationManagement.svg";

import ellipse545 from '@/assets/images/landing-images/Ellipse 545.svg'
import ellipse544 from '@/assets/images/landing-images/Ellipse 544.svg'
import BookADemo from "@/pages/BookADemo";


const Upgrades = () => {
  return (
    <>
      <div className="-mt-[10rem] md:-mt-20 flex flex-col items-center bg-[#1F303C] font-roboto-condensed overflow-hidden">
        <div className="relative h-0">
          <img className="relative z-0 w-[9rem]  md:w-auto left-[70%] md:left-[100%] top-[10rem] md:top-10" src={ellipse545} />
        </div>
        <div className="relative h-0">
          <img className="relative z-10 w-[20rem] md:w-auto right-[11rem] md:right-[33rem] top-32 md:top-20" src={ellipse544} />
        </div>
        <p className="z-10 text-2xl md:text-5xl uppercase font-semibold mt-36  text-white py-10">
          Our Upgrades
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 -mt-4">
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
      <BookADemo />
    </>
  );
};

export default Upgrades;

const upgrades = [
  {
    id: 1,
    title: "Captain Management",
    imgSrc: CaptainManagement,
    exploreUrl: "/coming-soon",
  },
  {
    id: 2,
    title: "Payroll Management",
    imgSrc: PayrollManagement,
    exploreUrl: "/coming-soon",
  },
  {
    id: 3,
    title: "KDS Management",
    imgSrc: KDSManagement,
    exploreUrl: "/coming-soon",
  },
  {
    id: 4,
    title: "Online Management",
    imgSrc: OnlineManagement,
    exploreUrl: "/coming-soon",
  },
  {
    id: 5,
    title: "Integration Management",
    imgSrc: IntegrationManagement,
    exploreUrl: "/coming-soon",
  },
];
