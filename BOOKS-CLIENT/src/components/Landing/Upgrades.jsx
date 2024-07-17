import FeatureCard from "./FeatureCard";
import CaptainManagement from "@/assets/images/Bromag Dashboard Features/CaptainManagement.svg";
import PayrollManagement from "@/assets/images/Bromag Dashboard Features/PayrollManagement.svg";
import KDSManagement from "@/assets/images/Bromag Dashboard Features/KDSManagement.svg";
import OnlineManagement from "@/assets/images/Bromag Dashboard Features/OnlineOrderManagement.svg";
import IntegrationManagement from "@/assets/images/Bromag Dashboard Features/SalesManagement.svg";

const Upgrades = () => {
  return (
    <div className="pt-24 flex flex-col items-center bg-[#1F303C]">
      <p className="text-5xl uppercase font-semibold font-roboto  text-white py-10">
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
