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
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GetCardAnalytics } from "@/config/routeApi/owner";

const BillingManagement = () => {
 const breakdown = useLoaderData();
//  console.log("breakdown :", breakdown);

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
          <Link to="expense-report">
            <Button className="bg-[#01A0A0] flex gap-2">
              <img src={AddExpense} className="w-6 h-6" />
              Expense Report
            </Button>
          </Link>
          <Link to="passbook">
            <Button className="bg-[#486072] flex gap-2">
              <img src={Passbook} className="w-6 h-6" />
              Passbook
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-[0.7rem]">
        {billingOptions.map((item) => (
          <AnalyticsCard
            key={item.id}
            id={item.id}
            title={item.title}
            url={item.url}
            icon={item.icon}
            activatedIcon={item.activatedIcon}
            activatedClass={item.activatedClass}
            breakdown={breakdown}
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

export const billingManagementLoader = async ()=> {
  try {
    const response = await GetCardAnalytics({date: new Date()});
    console.log('response2:', response)

    if(response.status === 200) {
      console.log(response.data);
      return response.data.breakdown;
    }
  } catch(error) {
    console.error(error);
  }
}

const billingOptions = [
  {
    id: "online",
    title: "Online Order",
    icon: Online,
    activatedIcon: OnlineActivated,
    url: "online-order",
    activatedClass: "bg-[#FFE588] border-2 border-[#CF9710]",
  },
  {
    id: "takeaway",
    title: "Takeaway Order",
    icon: Takeaway,
    activatedIcon: TakeawayActivated,
    url: "takeaway-order",
    activatedClass: "bg-[#FFD6B1] border-2 border-[#DD6031]",
  },
  {
    id: "dinein",
    title: "Dine-In Order",
    icon: Dinein,
    activatedIcon: DineinActivated,
    url: "dinein-order",
    activatedClass: "bg-[#CAC9FF] border-2 border-[#5A57D0]",
  },
];
