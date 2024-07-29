import Bill from "@/components/billingmanagement/Bill";
import ItemCard from "@/components/billingmanagement/ItemCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const Order = () => {
  const [selectedCusine, setSelectedCusine] = useState("All");

  const handleSelectCusine = (cusine) => {
    console.log(cusine);
    if (cusine === selectedCusine) return;
    setSelectedCusine(cusine);
  };

  return (
    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="text-3xl flex gap-4 items-center font-semibold">
        <div>
          <ArrowLeft className="w-6 h-6" />
        </div>
        <p>Select Dishes</p>
      </div>
      <ScrollArea className="w-full flex gap-4">
        <div className="h-[60rem]">
          {/* <ScrollArea className="w-full"> */}
          <div className="flex gap-2 py-6 flex-wrap ">
            {cusines.map((cusine, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-3xl w-32 border-3 bg-white text-gray-500 text-center p-1",
                  {
                    "bg-black text-white": selectedCusine === cusine,
                  }
                )}
                onClick={(e) => handleSelectCusine(cusine)}
              >
                {cusine}
              </div>
            ))}
          </div>
          {/* </ScrollArea> */}

            <div className="flex gap-4">

          <div className="flex flex-wrap gap-3 w-4/5">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
          <Bill />
            </div>
        </div>
        
      </ScrollArea>
    </div>
  );
};

export default Order;

const cusines = [
  "All",
  "Veg",
  "Non-Veg",
  "Starter",
  "Pizza",
  "Chinese",
  "Indian",
  "Arabian",
  "Egg",
  "Beverages",
];
