import { useDispatch } from "react-redux";
import { ownerLogout } from "../../store/slices/owner";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/images/landing-images/bromag_books_white_BGLESS.png";
import group from "@/assets/images/landing-images/Grup.png";

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
    <aside id="sidebar" className=" md:w-2/6 h-screen p-4  text-white">
      <img src={logo} className="w-16 h-16" />
      <div className="items-cente flex h-full">
        <nav className="flex flex-col h-full justify-center w-full">
          {sideBarItems.map((item) => (
            <NavLink
              to={item.url}
              key={item.id}
              className={({ isActive }) =>
                cn(` flex gap-3 items-center p-2 w-full`, {
                  "bg-[#677F9074] rounded p-2": isActive,
                })
              }
            >
              <div className="w-3 rounded-r-lg h-8 bg-[#56DDE8] relative -left-8" />
              <img src={item.icon} className="w-6 h-6" />
              <p className="text-base">{item.title}</p>
            </NavLink>
          ))}
        </nav>
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
    url: "/billing-management",
    icon: billingManagement,
  },
  {
    id: 3,
    title: "Sales Management",
    url: "/sales-management",
    icon: salesManagement,
  },
  {
    id: 4,
    title: "Order Management",
    url: "/order-management",
    icon: orderManagement,
  },
  {
    id: 5,
    title: "Dominant Management",
    url: "/dominant-management",
    icon: dominentManagement,
  },
  {
    id: 6,
    title: "Menu Management",
    url: "/menu-management",
    icon: menuManagement,
  },
  {
    id: 7,
    title: "Employee Management",
    url: "/employee-management",
    icon: employeeManagement,
  },
  {
    id: 8,
    title: "Table Management",
    url: "/table-management",
    icon: tableManagement,
  },
  {
    id: 9,
    title: "Vendor Management",
    url: "/vendor-management",
    icon: vendorManagement,
  },
  {
    id: 10,
    title: "Stock Management",
    url: "/stock-management",
    icon: stockManagement,
  },
  {
    id: 11,
    title: "Inventory Management",
    url: "/inventory-management",
    icon: inventoryManagement,
  },
  {
    id: 12,
    title: "CRM Management",
    url: "/crm-management",
    icon: crmManagement,
  },
];
