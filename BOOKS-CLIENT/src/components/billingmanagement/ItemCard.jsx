import chickenTandoori from "@/assets/images/menu/chicken-tandoori.png";

import nonVeg from "@/assets/images/billing-management/non-veg.svg";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useState } from "react";

const ItemCard = () => {
  const [selectedFilter, setSelectedFilter] = useState("today");
  const maxCount = 10;
  const [count, setCount] = useState(0);
  const incrementCount = () => count < maxCount && setCount((prev) => prev + 1);
  const decrementCount = () => count > 0 && setCount((prev) => prev - 1);

  return (
    <div className="flex gap-1 items-center w-[24rem] h-[11rem] rounded-xl shadow bg-white p-2">
      <div className="w-36 rounded-xl h-36">
        <img src={chickenTandoori} className="w-full" />
      </div>
      <div className="flex flex-col gap-2 py-2 pl-4">
        <div className="flex flex-col gap-1">
          <img src={nonVeg} className="w-5 h-5" />
          <p className="font-semibold">Chicken Tikka</p>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-16 px-0 gap-1 bg-transparent border-0  focus:ring-0 text-green-500 h-5 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-lg">₹200</p>
          <div className="flex items-center gap-4 justify-between">
            <div className="border rounded-full flex w-24 items-center px-2 justify-between">
              <div className="text-2xl cursor-pointer" onClick={decrementCount}>
                -
              </div>
              <p className="text-lg text-gray-500 font-semibold">{count}</p>
              <div className="text-2xl cursor-pointer" onClick={incrementCount}>
                +
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              Available {maxCount - count}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
