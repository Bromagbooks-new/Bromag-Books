import Hero from "@/components/Features/Hero";
import Navbar from "@/components/Landing/Navbar";
import { useState } from "react";
import BillingManagement from "@/assets/images/Bromag Dashboard Features/BillingManagement.svg";
import CRMManagement from "@/assets/images/Bromag Dashboard Features/CRMManagement.svg";
import DominnentManagement from "@/assets/images/Bromag Dashboard Features/DominnentManagement.svg";
import MenuManagement from "@/assets/images/Bromag Dashboard Features/MenuManagement.svg";
import OrderManagement from "@/assets/images/Bromag Dashboard Features/OrderManagement.svg";
import SalesManagement from "@/assets/images/Bromag Dashboard Features/SalesManagement.svg";
import StockManagement from "@/assets/images/Bromag Dashboard Features/StockManagement.svg";
import VendorManagement from "@/assets/images/Bromag Dashboard Features/VendorManagement.svg";
import InventoryManagement from "@/assets/images/Bromag Dashboard Features/InventoryManagement.svg";
import FeatureDescription from "@/components/Features/FeatureDescription";




import BillingManagementImg from "@/assets/images/Bromag Dashboard Features/BILLING MANAGEMENT 1.svg";
import CRMManagementImg from "@/assets/images/Bromag Dashboard Features/CUSTOMER MANAGEMENT 1.svg";
import FeatureCard from "@/components/Landing/FeatureCard";
import LandingFeatures from "@/components/Landing/LandingFeatures";
import BookADemo from "./BookADemo";
// import DominentManagementImg from "@/assets/images/Bromag Dashboard Features/DOMINENET 1.svg";
// import BillingManagementImg from "@/assets/images/Bromag Dashboard Features/BILLING MANAGEMENT 1.svg";
// import BillingManagementImg from "@/assets/images/Bromag Dashboard Features/BILLING MANAGEMENT 1.svg";
// import BillingManagementImg from "@/assets/images/Bromag Dashboard Features/BILLING MANAGEMENT 1.svg";
// import BillingManagementImg from "@/assets/images/Bromag Dashboard Features/BILLING MANAGEMENT 1.svg";
// import BillingManagementImg from "@/assets/images/Bromag Dashboard Features/BILLING MANAGEMENT 1.svg";
// import BillingManagementImg from "@/assets/images/Bromag Dashboard Features/BILLING MANAGEMENT 1.svg";





const Features = () => {

  const [heroImg, setHeroImg] = useState(BillingManagement);

  const updateImg = (img) => setHeroImg(img)



  return <div className="">
    <Navbar />
    {/* <Hero img={heroImg} /> */}
    <LandingFeatures />
    <BookADemo />
  </div>
};


export default Features;



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
