import AnalyticsCard from "@/components/billingmanagement/AnalyticsCard";

import AddOpening from "@/assets/images/billing-management/AddOpening.svg";
import AddExpense from "@/assets/images/billing-management/AddExpense.svg";
import Passbook from "@/assets/images/billing-management/Passbook.svg";

import Online from "@/assets/images/billing-management/Online.svg";
import OnlineActivated from "@/assets/images/billing-management/OnlineActivated.svg";
import Takeaway from "@/assets/images/billing-management/Takeaway.svg";
import TakeawayActivated from "@/assets/images/billing-management/TakeawayActivated.svg";
import Dinein from "@/assets/images/billing-management/Dinein.svg";
import DineinActivated from "@/assets/images/billing-management/DineinActivated.svg";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BillingManagement = () => {
  const currentLocationArray = window.location.pathname.split("/");
  const currentPath = currentLocationArray[currentLocationArray.length - 1];
  console.log(currentPath);

  if (currentPath === "order") {
    return (
      <div className="w-full h-full">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="w-full h-full border py-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <p className="text-3xl font-bold">Billing Management</p>
        <div className="flex gap-3">
          <Link to="opening-report">
            <Button className="bg-[#01A0A0] flex gap-2">
              <img src={AddOpening} className="w-6 h-6" />
              Opening Report
            </Button>
          </Link>
          <Button className="bg-[#01A0A0] flex gap-2">
            <img src={AddExpense} className="w-6 h-6" />
            Expense Report
          </Button>
          <Button className="bg-[#486072] flex gap-2">
            <img src={Passbook} className="w-6 h-6" />
            Passbook
          </Button>
        </div>
      </div>
      <div className="flex gap-[0.7rem]">
        {billingOptions.map((item) => (
          <AnalyticsCard
            key={item.id}
            title={item.title}
            url={item.url}
            icon={item.icon}
            activatedIcon={item.activatedIcon}
            activatedClass={item.activatedClass}
          />
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default BillingManagement;

const billingOptions = [
  {
    id: "online-order",
    title: "Online Order",
    icon: Online,
    activatedIcon: OnlineActivated,
    url: "online-order",
    activatedClass: "bg-[#FFE588] border-2 border-[#CF9710]",
  },
  {
    id: "takeaway-order",
    title: "Takeaway Order",
    icon: Takeaway,
    activatedIcon: TakeawayActivated,
    url: "takeaway-order",
    activatedClass: "bg-[#FFD6B1] border-2 border-[#DD6031]",
  },
  {
    id: "dinein-order",
    title: "Dinein Order",
    icon: Dinein,
    activatedIcon: DineinActivated,
    url: "dinein-order",
    activatedClass: "bg-[#CAC9FF] border-2 border-[#5A57D0]",
  },
];
