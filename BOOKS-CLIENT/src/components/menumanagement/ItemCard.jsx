
import React, { memo } from "react"; // Import memo
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
import { formatImageUrl } from "@/helpers/helpers";
import { Button } from "../ui/button";
import { PencilLine, Trash } from "lucide-react";

const ItemCard = memo(({
  img,
  name,
  portions,
  available,
  itemId,
  availableStatus,
  updateMenuItemAvailableStatus
}) => {
  // console.log('availableStatus:', availableStatus);
  
  // console.log('itemId:', itemId)
  const [selectedFilter, setSelectedFilter] = useState(portions[0].type);
  const [isAvailable, setIsAvailable] = useState(availableStatus);
  // console.log('isAvailable:', isAvailable);

  const actualPrice = portions.find(portion => portion.type === selectedFilter)?.actualPrice;
  const discountedPrice = portions.find(portion => portion.type === selectedFilter)?.discountPrice;

  const maxCount = available;

  const handleToggle = () => {
    // console.log("Here");
    setIsAvailable(prev => !prev);
    // Optionally call updateMenuItemAvailableStatus here if needed
    updateMenuItemAvailableStatus(itemId, !isAvailable);
  };

  return (
    <div className={`flex gap-1 items-center w-[24rem] h-[12rem] rounded-xl shadow bg-white p-2 ${!availableStatus ? "opacity-50" : ""}`}>
      <div className="w-36 rounded-xl h-full">
        <img src={formatImageUrl(img)} className="w-full h-full rounded-xl" />
      </div>
      <div className="flex flex-col gap-2 py-2 pl-4 border-0 w-[220px] ">
        <div className="flex flex-col w-full gap-1 border-0">
          <img src={nonVeg} className="w-5 h-5" />
          <p className="font-semibold">{name}</p>
          <Select value={selectedFilter.type} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-16 px-0 gap-1 bg-transparent border-0 focus:ring-0 text-green-500 h-5 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {portions.map((portion) => (
                <SelectItem key={portion.type} value={portion.type}>
                  {portion.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <p className="text-xl text-red-500 line-through">₹{actualPrice}</p>
            <p className="text-xl">₹{discountedPrice}</p>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className={`mr-2 text-sm ${availableStatus ? 'text-gray-500' : 'text-red-500'}`}>
              {availableStatus ? "Available" : "Unavailable"} {maxCount}
            </div>
          </div>
        </div>
        <div className="flex gap-1 w-full border-0 justify-end">
          <div className="border-0 w-[50px] h-[32px] flex flex-col justify-start items-center">
            <div onClick={handleToggle} role="switch" aria-checked={availableStatus} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleToggle()} className={`border-1 relative w-[50px] h-[32px] px-[5px] py-[2px] transition cursor-pointer rounded-full ${availableStatus ? 'bg-color-2B77AD' : 'bg-color-13BF2F'}`}>
              <div className={`absolute bottom-[6px] left-[3px] w-[19px] h-[19px] bg-white rounded-full shadow transform transition ${availableStatus ? "translate-x-[18px]" : "translate-x-[3px]"}`}></div>
            </div>
          </div>
          <Button variant="icon" className="px-3 h-8 bg-landing-secondary hover:bg-landing-primary">
            <PencilLine className="w-4 h-4" />
          </Button>
          <Button variant="icon" className="px-3 h-8 bg-red-500 hover:bg-landing-primary">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});

export default ItemCard;