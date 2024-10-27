import { Outlet } from "react-router-dom";
import Header from "../../components/admindashboardcomponents/Header";
import Sidebar from "../../components/admindashboardcomponents/Sidebar";
import { useState } from "react";
import AdminTopPanel from "@/components/admin/AdminTopPanel";

const DashboardLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="flex gap-2 overflow-hidden bg-[#1F303C] font-roboto">
      <Header openSidebar={openSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} />
      <div className="rounded-l-[5rem] w-full h-screen bg-white flex flex-col">
        <AdminTopPanel />
        <div className="bg-[#F5F6FA] px-8 h-full">
          <Outlet />
        </div>
      </div>
      {/* Backdrop for mobile sidebar */}
      {openSidebarToggle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpenSidebarToggle(false)}
        ></div>
      )}
    </div>
  );
};
export default DashboardLayout;
