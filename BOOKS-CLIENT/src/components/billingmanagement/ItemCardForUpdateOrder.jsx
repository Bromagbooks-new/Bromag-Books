
import nonVeg from "@/assets/images/billing-management/non-veg.svg";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useState, memo } from "react";
import { formatImageUrl } from "@/helpers/helpers";

import { toastSuccess, toastError } from "@/helpers/helpers";

const ItemCardForUpdateOrder = memo(({ item, addItem, subtractItem, quantity = 0, totalPortionQuantity, fullProtionQuantity, halfPortionQuantity }) => {
  // console.log('totalPortionQuantity:', totalPortionQuantity)
  // console.log('quantity:', quantity)
  // console.log('item:', item)
  const [selectedPortion, setSelectPortion] = useState(item?.aggregators[0]?.portions[0]?.type);
  const [count, setCount] = useState(0);
  // console.log('selectedPortion:', selectedPortion);

  const actualPrice = item?.aggregators[0]?.portions?.filter(portion => portion?.type === selectedPortion)[0]?.actualPrice;
  const discountedPrice = item?.aggregators[0]?.portions?.filter(portion => portion?.type === selectedPortion)[0]?.discountPrice;

  const maxCount = item?.quantity;
  // console.log('maxCount:', maxCount)
  const incrementCount = () => {
    if(totalPortionQuantity <= maxCount) {
      let currentQuantity = totalPortionQuantity;
      if(selectedPortion === "full") {
        currentQuantity += 2;
      } else if(selectedPortion === "half") {
        currentQuantity += 1;
      }

      // console.log('currentQuantity:', currentQuantity)
      if(currentQuantity <= maxCount) {
        addItem({
          name : item?.name,
          portion : selectedPortion,
          quantity : 1,
          actualPrice : actualPrice,
          discountPrice : discountedPrice,
          itemId : item?._id,
          aggregatorId : item?.aggregators[0]?._id,
          cuisine : item?.cuisine,
          subCuisine : item?.subCuisine
        })
      } else {
        toastError("Item Quantity is low!! Please add some item quantity for this food!");
      }
    } else {
      toastError("Item Quantity is low! Please add some item quantity for this food!");
    }
  };
  const decrementCount = () => {
    // console.log('totalPortionQuantity:', totalPortionQuantity)
    // console.log('maxCount:', maxCount)
    if(totalPortionQuantity > 0) {
      // console.log('totalPortionQuantity:', totalPortionQuantity)
      // console.log('selectedPortion === "full" && fullProtionQuantity > 0:', selectedPortion === "full" && fullProtionQuantity > 0)
      // console.log('selectedPortion === "half" && halfPortionQuantity > 0:', selectedPortion === "half" && halfPortionQuantity > 0)
      if((selectedPortion === "full" && fullProtionQuantity > 0) || (selectedPortion === "half" && halfPortionQuantity > 0)) {
        subtractItem({
          portion : selectedPortion,
          quantity : 1,
          itemId : item?._id,
        })
      } 
      // else if(selectedPortion === "half" && halfPortionQuantity > 0) {
      //   toastSuccess("Half portion item removed!");

      // } 
      else {
        toastError("No item in your cart for this portion! Please add some item into your cart!")
      }
    } else {
      toastError("No item in your cart! Please add some item into your cart!");
    }
  };

  return (
    <div key={item?._id} className="w-[390px] h-[152px] flex gap-1 items-center border-1 shadow bg-white rounded-[12px] p-2">
      <div className="w-[141.92px] h-[141.92px] rounded-[7px]">
        <img src={formatImageUrl(item?.image)} className="w-full h-full rounded-[7px]" />
      </div>
      <div className="flex flex-col gap-2 py-2 pl-4 border-0">
        <div className="flex flex-col gap-1">
          <img src={item?.itemType === "veg" ? nonVeg : nonVeg} className="w-5 h-5" />
          <p className="font-semibold">{item?.name}</p>
          <Select value={selectedPortion} onValueChange={setSelectPortion}>
            <SelectTrigger className="w-16 px-0 gap-1 bg-transparent border-0  focus:ring-0 text-green-500 h-5 ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {item?.aggregators[0]?.portions.map(portion => <SelectItem value={portion.type} >{portion.type}</SelectItem>)}
              {/* <SelectItem value="quater">Quater</SelectItem> */}
              {/* <SelectItem value="half">Half</SelectItem> */}
              {/* <SelectItem value="full">Full</SelectItem> */}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <p className="text line-through">₹{actualPrice}</p>
            <p className="text">₹{actualPrice - discountedPrice}</p>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="border rounded-full flex w-24 items-center px-2 justify-between">
              <div className="text-2xl cursor-pointer" onClick={decrementCount}>
                -
              </div>
              <p className="text-lg text-gray-500 font-semibold">{selectedPortion === "full" ? fullProtionQuantity : selectedPortion === "half" ? halfPortionQuantity : 0}</p>
              <div className="text-2xl cursor-pointer" onClick={incrementCount}>
                +
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              Available {maxCount - totalPortionQuantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ItemCardForUpdateOrder;