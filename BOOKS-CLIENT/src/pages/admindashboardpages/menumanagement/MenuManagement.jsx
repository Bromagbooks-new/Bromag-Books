import MenuDisplay from "@/components/menumanagement/MenuDisplay";
import { Button } from "@/components/ui/button";
import { CalendarPlus, StoreIcon } from "lucide-react";



const MenuManagement = () => {
  

  

  return (
    <div className="w-full h-full py-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-3xl font-semibold">Menu Management</p>
        <div className="flex gap-4">
          <Button className="bg-[#01A0A0] gap-2">
            <CalendarPlus />
            Add Menu
          </Button>
          <Button className="bg-landing-secondary gap-2">
            <StoreIcon />
            Cusines
          </Button>
          <Button className="bg-landing-secondary gap-2">
            <StoreIcon />
            Aggregators
          </Button>
        </div>
      </div>
      <MenuDisplay />
    </div>
  );
};
export default MenuManagement;
