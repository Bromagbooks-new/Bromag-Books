
import AnalyticsCard from "@/components/ordermanagement/AnalyticsCard";
import Online from "@/assets/images/billing-management/Online.svg";
import OnlineActivated from "@/assets/images/billing-management/OnlineActivated.svg";
import Takeaway from "@/assets/images/billing-management/Takeaway.svg";
import TakeawayActivated from "@/assets/images/billing-management/TakeawayActivated.svg";
import Dinein from "@/assets/images/billing-management/Dinein.svg";
import DineinActivated from "@/assets/images/billing-management/DineinActivated.svg";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GetCardAnalytics } from "@/config/routeApi/owner";


const OrderManagement = () => {
  const location = useLocation(); // Get the current route location
  const breakdown = useLoaderData();
  console.log("object", location)
  // Check if the current path is the root of OrderManagement
  const isRoot = location.pathname === "/dashboard/order-management";
  return (
    <div className="w-full h-full border py-4 flex flex-col gap-4">
      {isRoot && (
        <>
          <div className="flex gap-4">
            <p className="text-3xl font-bold">Order Management</p>
          </div>
          <div className="flex gap-[0.7rem]">
            {orderOptions.map((item) => (
              <Link to={item.url} key={item.id}>
                <AnalyticsCard
                  id={item.id}
                  title={item.title}
                  url={item.url}
                  icon={item.icon}
                  activatedIcon={item.activatedIcon}
                  activatedClass={item.activatedClass}
                  breakdown={breakdown}
                />
              </Link>
            ))}
          </div>
        </>
      )}

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default OrderManagement;

export const orderManagementLoader = async () => {
  try {
    const response = await GetCardAnalytics({ date: new Date() });
    console.log('orderManagement loader output:', response)

    if (response.status === 200) {
      console.log(response.data);
      return response.data.breakdown;
    }
  } catch (error) {
    console.error(error);
  }
}

const orderOptions = [
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