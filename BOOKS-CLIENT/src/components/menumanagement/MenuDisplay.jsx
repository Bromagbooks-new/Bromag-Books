import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { FetchBill, MenuCategory, MenuData } from "@/config/routeApi/owner";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import ItemCard from "../menumanagement/ItemCard";

const MenuDisplay = () => {
  const [filter, setFilter] = useState("all");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // console.log(data);
    const getMenuData = async () => {
      const categoriesData = await MenuCategory();
      console.log(categoriesData);
      //   setCategories(categoriesData.data.Categories);
      const menuData = await MenuData();
      console.log(menuData);
      setMenuItems(menuData.data.restaurantMenu);
      //   setFilteredMenuItems(menuData.data.restaurantMenu);
    };
    getMenuData();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-white">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Menu Details</p>
          <div className="flex gap-2 items-center">
            <div className="rounded border flex gap-2 bg-[#F4FAFF] border-[#758D9F] px-3 py-3 h-8 items-center">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search Menu"
                className="border-0 bg-transparent ring-0 h-6 w-96"
              />
            </div>
            <Button className="bg-landing-secondary font-semibold h-8 px-8">
              Search
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-gray-400">Sort By</p>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-64">
              <SelectValue className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cusines</SelectItem>
              {/* <SelectItem value="weekly">Weekly</SelectItem> */}
              {/* <SelectItem value="monthly">Monthly</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex -mx-6 border-b-2">
        <div className="py-3 w-32 border-b-2 border-b-blue-500 text-center">
          Restarunt
        </div>
        <div className="py-3 w-32  text-center">Swiggy</div>
        <div className="py-3 w-32  text-center">Zomato</div>
        <div className="py-3 w-32  text-center">Bromag</div>
      </div>
      <div className="flex flex-wrap gap-3 -mx-4 p-4 bg-[#F5F6FA]">
        {menuItems.map((item) => (
          <ItemCard
            key={item._id}
            img={item.itemImage}
            name={item.item}
            actualPrice={item.actualPrice}
            discountedPrice={item.discountPrice}
            available={item.quantity}
            itemId={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuDisplay;