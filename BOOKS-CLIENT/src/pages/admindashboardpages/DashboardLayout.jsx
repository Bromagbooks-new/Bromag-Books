import { Outlet } from "react-router-dom";
import Header from "../../components/admindashboardcomponents/Header";
import Sidebar from "../../components/admindashboardcomponents/Sidebar";

  

import AdminTopPanel from "@/components/admin/AdminTopPanel";

const DashboardLayout = () => {
  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // const openSidebar = () => {
  //     setOpenSidebarToggle(!openSidebarToggle)
  // }

  return (
    <div className="flex gap-2 overflow-hidden bg-[#1F303C] font-roboto">
      {/* <Header openSidebar={openSidebar} /> */}
      <Sidebar />
      <div className="rounded-l-[5rem] w-full h-screen bg-white flex flex-col">
        <AdminTopPanel />
        <div className="bg-[#F5F6FA] px-8 h-full">
            
        <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
