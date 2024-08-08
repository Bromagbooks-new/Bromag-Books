import { useDispatch } from "react-redux";
import { ownerLogout } from "../../store/slices/owner";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/images/landing-images/bromag_books_white_BGLESS.png";
import group from "@/assets/images/dashboard/Group 207 (1).svg";

import billingManagement from "@/assets/images/dashboard/billing.svg";
import salesManagement from "@/assets/images/dashboard/sales.svg";
import orderManagement from "@/assets/images/dashboard/order.svg";
import dominentManagement from "@/assets/images/dashboard/dominent.svg";
import menuManagement from "@/assets/images/dashboard/menu.svg";
import employeeManagement from "@/assets/images/dashboard/employee.svg";
import tableManagement from "@/assets/images/dashboard/table.svg";
import vendorManagement from "@/assets/images/dashboard/vendor.svg";
import stockManagement from "@/assets/images/dashboard/stock.svg";
import inventoryManagement from "@/assets/images/dashboard/inventory.svg";
import crmManagement from "@/assets/images/dashboard/crm.svg";
import dashboard from "@/assets/images/dashboard/dashboard.svg";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("atoken");
    dispatch(ownerLogout());
    navigate("/restaurant-home");
  };

  return (
    // className = { openSidebarToggle? "sidebar-responsive": "" }
    <aside id="sidebar" className=" md:w-[20%] h-screen py-4 text-white">
      <img src={logo} className="w-16 h-16 ml-4" />
      <div className="pt-4 flex h-full">
        <ScrollArea
          className="h-[35rem] w-full overflow-visible z-20"
          type="scroll"
        >
          <nav className="flex flex-col h-full justify-center gap-3 w-[20rem] p-3 z-20">
            {sideBarItems.map((item) => (
              <NavLink
                to={item.url}
                key={item.id}
                end={item.url === "/dashboard"}
                className={({ isActive }) =>
                  cn(
                    ` flex gap-3 items-center p-2 w-11/12 z-20 hover:bg-gray-600`,
                    {
                      "bg-[#677F9074] rounded-lg": isActive,
                    }
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={cn(
                        "w-2 rounded-r-lg h-12 -my-2 bg-[#56DDE8] -ml-6 z-20 hidden",
                        { block: isActive }
                      )}
                    />
                    <img src={item.icon} className="w-6 h-6" />
                    <p
                      className={cn("text-base", { "font-semibold": isActive })}
                    >
                      {item.title}
                    </p>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
      </div>
      <div className="relative h-0 z-0">
        <img
          src={group}
          className="w-[20rem] h-[20rem] opacity-70 fixed bottom-0 z-0 -left-10"
        />
      </div>
    </aside>
  );
}
export default Sidebar;

const sideBarItems = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    icon: dashboard,
  },
  {
    id: 2,
    title: "Billing Management",
    url: "billing-management",
    icon: billingManagement,
  },
  {
    id: 3,
    title: "Sales Management",
    url: "sales-management",
    icon: salesManagement,
  },
  {
    id: 4,
    title: "Order Management",
    url: "order-management",
    icon: orderManagement,
  },
  {
    id: 5,
    title: "Dominant Management",
    url: "dominant-management",
    icon: dominentManagement,
  },
  {
    id: 6,
    title: "Menu Management",
    url: "menu-management",
    icon: menuManagement,
  },

  {
    id: 7,
    title: "Table Management",
    url: "captain-management",
    icon: tableManagement,
  },
  {
    id: 8,
    title: "Stock Management",
    url: "stock-management",
    icon: stockManagement,
  },
  {
    id: 9,
    title: "Inventory Management",
    url: "inventory-management",
    icon: inventoryManagement,
  },
  {
    id: 10,
    title: "Wallet Management",
    url: "wallet-management",
    icon: vendorManagement,
  },
  {
    id: 11,
    title: "Employee Management",
    url: "employee-management",
    icon: employeeManagement,
  },
  {
    id: 12,
    title: "CRM Management",
    url: "crm-management",
    icon: crmManagement,
  },
];
