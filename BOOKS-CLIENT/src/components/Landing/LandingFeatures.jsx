import FeatureCard from "./FeatureCard";
import BillingManagement from "@/assets/images/Bromag Dashboard Features/BillingManagement.svg";
import CRMManagement from "@/assets/images/Bromag Dashboard Features/CRMManagement.svg";
import DominnentManagement from "@/assets/images/Bromag Dashboard Features/DominnentManagement.svg";
import MenuManagement from "@/assets/images/Bromag Dashboard Features/MenuManagement.svg";
import OrderManagement from "@/assets/images/Bromag Dashboard Features/OrderManagement.svg";
import SalesManagement from "@/assets/images/Bromag Dashboard Features/SalesManagement.svg";
import StockManagement from "@/assets/images/Bromag Dashboard Features/StockManagement.svg";
import VendorManagement from "@/assets/images/Bromag Dashboard Features/VendorManagement.svg";
import InventoryManagement from "@/assets/images/Bromag Dashboard Features/InventoryManagement.svg";
import TableManagement from "@/assets/images/Bromag Dashboard Features/TableManagement.svg";
import EmployeeManagement from "@/assets/images/Bromag Dashboard Features/EmployeeManagement.svg";

import subtract from '@/assets/images/landing-images/Subtract.svg';
import ellipse542 from '@/assets/images/landing-images/Ellipse 542.svg'
import ellipse543 from '@/assets/images/landing-images/Ellipse 543.svg'
import group212 from '@/assets/images/landing-images/Group 212.svg'

const LandingFeatures = () => {
  return (
    <div className=" flex flex-col items-center bg-[#1F303C] font-roboto-condensed -mt-52">
      <div className="relative h-0 hidden md:block">
        <img className="relative z-10 left-[20%] opacity-50" src={subtract} />
      </div>
     
      <div className="relative h-0 hidden md:block">
        <img className="relative z-0 left-[70%] top-[10rem]" src={ellipse542} />
      </div>
      <div className="relative h-0 hidden md:block">
        <img className="relative z-0 right-[42rem] top-[10rem]" src={ellipse543} />
      </div>
      <p className="text-3xl md:text-5xl mt-[14rem] md:mt-[28rem] uppercase font-semibold text-white">
        OUR FEATURES
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 pt-10">
        {landingFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            imgSrc={feature.imgSrc}
            exploreUrl={feature.exploreUrl}
          />
        ))}
      </div>
      <div className="relative h-0 hidden md:block">
        <img className="relative z-0 right-[21%] bottom-[43rem]" src={group212} />
      </div>
    </div>
  );
};

export default LandingFeatures;

const landingFeatures = [
  {
    id: 1,
    title: "Billing Management",
    imgSrc: BillingManagement,
    exploreUrl: "/features/#billing",
  },
  {
    id: 2,
    title: "Sales Management",
    imgSrc: SalesManagement,
    exploreUrl: "/features/#sales",
  },
  {
    id: 3,
    title: "Order Management",
    imgSrc: OrderManagement,
    exploreUrl: "/features/#order",
  },
  {
    id: 4,
    title: "Dominnent Management",
    imgSrc: DominnentManagement,
    exploreUrl: "/features/#dominent",
  },
  {
    id: 6,
    title: "Inventory Management",
    imgSrc: InventoryManagement,
    exploreUrl: "/features/#inventory",
  },
  {
    id: 7,
    title: "Stock Management",
    imgSrc: StockManagement,
    exploreUrl: "/features/#stock",
  },
  {
    id: 5,
    title: "Menu Management",
    imgSrc: MenuManagement,
    exploreUrl: "/features/#menu",
  },
  {
    id: 11,
    title: "Employee Management",
    imgSrc: EmployeeManagement,
    exploreUrl: "/features/#employee",
  },
  {
    id: 8,
    title: "Vendor Management",
    imgSrc: VendorManagement,
    exploreUrl: "/features/#vendor",
  },
  {
    id: 9,
    title: "Table Management",
    imgSrc: TableManagement,
    exploreUrl: "/features/#table",
  },
  {
    id: 10,
    title: "CRM Management",
    imgSrc: CRMManagement,
    exploreUrl: "/features/#crm",
  },
];
