import EmployeeAccessAnalyticsCard from "@/components/employeemanagement/EmployeeAccessAnalyticsCard";
import MenuDisplay from "@/components/menumanagement/MenuDisplay";
import { Button } from "@/components/ui/button";
import { CalendarPlus, StoreIcon } from "lucide-react";
import { Link } from "react-router-dom";

const EmployeeManagement = () => {
  return (
    <div className="w-full h-full py-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-3xl font-semibold">Employee Management</p>
        <div className="flex gap-4">
          <Link to="employees">
            <Button className="bg-[#01A0A0] gap-2">
              <CalendarPlus />
              All Employees
            </Button>
          </Link>
        </div>
      </div>
      {/* <MenuDisplay /> */}
      <div className="flex flex-wrap gap-4">
        <EmployeeAccessAnalyticsCard
          id="billing-management"
          title="Billing Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="sales-management"
          title="Sales Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="order-management"
          title="Order Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="dominant-management"
          title="Dominant Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="menu-management"
          title="Menu Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="table-management"
          title="Table Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="stock-management"
          title="Stock Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="inventory-management"
          title="Inventory Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="wallet-management"
          title="Wallet Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="employee-management"
          title="Employee Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
        <EmployeeAccessAnalyticsCard
          id="crm-management"
          title="CRM Management"
          borderClass="border-3 border-yellow-500"
          amount="20"
        />
      </div>
    </div>
  );
};
export default EmployeeManagement;
