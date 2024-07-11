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

const LandingFeatures = () => {
  return (
    <div className="-mt-80 flex flex-col items-center">
      <p className="text-5xl uppercase font-semibold font-roboto text-landing-primary">
        Features
      </p>
      <div className="grid grid-cols-4 gap-20 pt-20">
        {landingFeatures.map((feature) => (
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
    id: 5,
    title: "Menu Management",
    imgSrc: MenuManagement,
    exploreUrl: "/features/#menu",
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
    id: 8,
    title: "Vendor Management",
    imgSrc: VendorManagement,
    exploreUrl: "/features/#vendor",
  },
  {
    id: 9,
    title: "CRM Management",
    imgSrc: CRMManagement,
    exploreUrl: "/features/#crm",
  },
];
