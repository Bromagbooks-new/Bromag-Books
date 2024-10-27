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

const ItemCard = ({
  img,
  name,
  available,
  itemId,
  quantity,
  addItem,
  subtractItem,
  portions
}) => {
  const [selectedFilter, setSelectedFilter] = useState(portions[0].type);


  const actualPrice = portions.filter(portion => portion.type === selectedFilter)[0].actualPrice;
  const discountedPrice = portions.filter(portion => portion.type === selectedFilter)[0].discountPrice;


  const maxCount = available;
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    if (count < maxCount) {
      setCount((prev) => prev + 1);
      addItem(itemId);
    }
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      subtractItem(itemId);
    }
  };

  return (
    <div className="flex gap-1 items-center w-[24rem] h-[11rem] rounded-xl shadow bg-white p-2">
      <div className="w-36 rounded-xl h-36">
        <img src={formatImageUrl(img)} className="w-full rounded-xl" />
      </div>
      <div className="flex flex-col gap-2 py-2 pl-4">
        <div className="flex flex-col gap-1">
          <img src={nonVeg} className="w-5 h-5" />
          <p className="font-semibold">{name}</p>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-16 px-0 gap-1 bg-transparent border-0  focus:ring-0 text-green-500 h-5 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {portions.map(portion => <SelectItem value={portion.type} >{portion.type}</SelectItem>)}
              {/* <SelectItem value="quater">Quater</SelectItem> */}
              {/* <SelectItem value="half">Half</SelectItem> */}
              {/* <SelectItem value="full">Full</SelectItem> */}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <p className="text line-through">₹{actualPrice}</p>
            <p className="text">₹{discountedPrice}</p>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="border rounded-full flex w-24 items-center px-2 justify-between">
              <div className="text-2xl cursor-pointer" onClick={decrementCount}>
                -
              </div>
              <p className="text-lg text-gray-500 font-semibold">{quantity}</p>
              <div className="text-2xl cursor-pointer" onClick={incrementCount}>
                +
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              Available {maxCount - quantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
