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

const ItemCard = ({
  img,
  name,
  portions,
  available,
  itemId,
}) => {
  console.log(portions);
  const [selectedFilter, setSelectedFilter] = useState(portions[0].type);

  const actualPrice = portions.filter(portion=> portion.type === selectedFilter)[0].actualPrice;
  const discountedPrice = portions.filter(portion=> portion.type === selectedFilter)[0].discountPrice;

  const maxCount = available;

  return (
    <div className="flex gap-1 items-center w-[24rem] h-[12rem] rounded-xl shadow bg-white p-2">
      <div className="w-36 rounded-xl h-full">
        <img src={formatImageUrl(img)} className="w-full h-full rounded-xl" />
      </div>
      <div className="flex flex-col gap-2 py-2 pl-4">
        <div className="flex flex-col gap-1">
          <img src={nonVeg} className="w-5 h-5" />
          <p className="font-semibold">{name}</p>
          <Select value={selectedFilter.type} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-16 px-0 gap-1 bg-transparent border-0  focus:ring-0 text-green-500 h-5 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {portions.map((portion) => {
                
                // console.log(portion);

                return (
                <SelectItem key={portion.type} value={portion.type}>
                  {portion.type}
                </SelectItem>
              )})}
              {/* <SelectItem value="quater">Quater</SelectItem> */}
              {/* <SelectItem value="half">Half</SelectItem> */}
              {/* <SelectItem value="full">Full</SelectItem> */}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <p className="text-xl text-red-500 line-through">₹{actualPrice}</p>
            <p className="text-xl">₹{discountedPrice}</p>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="text-gray-500 text-sm">Available {maxCount}</div>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <Button vaiant="icon" className="px-3 h-8 bg-landing-secondary">
            <PencilLine className="w-4 h-4" />
          </Button>
          <Button vaiant="icon" className="px-3 h-8 bg-red-500">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
