import Bill from "@/components/billingmanagement/Bill";
import ItemCard from "@/components/billingmanagement/ItemCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FetchBill, GetAllCuisines, GetAllMenuItems, MenuCategory, MenuData } from "@/config/routeApi/owner";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Order = () => {
  const [selectedCusine, setSelectedCusine] = useState("All");
  const [billItems, setBillItems] = useState([]);

  console.log('billItems:', billItems)

  const addItem = (itemId) => {
    console.log('itemId:', itemId)
    const foundItems = billItems.filter((billItem) => billItem._id === itemId);
    let foundItem = {};
    if (foundItems.length === 0) {
      const newItem = filteredMenuItems.filter(
        (item) => item._id === itemId
      )[0];
      console.log('newItem:', newItem)

      if (newItem.quantity < 1) return;

      const currentAggregatorData = newItem.aggregators[0];
      console.log('currentAggregatorData:', currentAggregatorData)
      // console.log(currentAggregatorData);

      foundItem = {
        name: newItem?.name,
        quantity: 1,
        actualPrice: currentAggregatorData.portions[0].actualPrice,
        discountPrice: currentAggregatorData.portions[0].discountPrice,
        _id: newItem?._id,
      };
      setBillItems((prev) => [...prev, foundItem]);
      return;
    } else {
      const newItem = filteredMenuItems.filter(
        (item) => item._id === itemId
      )[0];
      // console.log(newItem);
      foundItem = foundItems[0];
      if (foundItem.quantity >= newItem.quantity) return;
      foundItem.quantity += 1;
      setBillItems((prev) =>
        prev.map((item) => (item._id === foundItem._id ? foundItem : item))
      );
      return;
    }
  };
  const subtractItem = (itemId) => {
    const foundItems = billItems.filter((billItem) => billItem._id === itemId);
    let foundItem = {};
    if (foundItems.length === 0) {
      return;
    } else {
      foundItem = foundItems[0];

      if (foundItem.quantity === 1) {
        setBillItems((prev) =>
          prev.filter((item) => item._id !== foundItem._id)
        );
        return;
      }

      foundItem.quantity -= 1;

      setBillItems((prev) =>
        prev.map((item) => (item._id === foundItem._id ? foundItem : item))
      );
      return;
    }
  };

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const { data } = useLoaderData();
  // console.log('data useLoaderData:', data)
  useEffect(() => {
    // console.log(data);
    const getMenuData = async () => {
      const categoriesData = await GetAllCuisines();
      // console.log(categoriesData);
      setCategories(categoriesData.data.cuisines);
      const menuData = await GetAllMenuItems();
      // console.log('menuData getMenuData:', menuData)
      // console.log(menuData);
      setMenuItems(menuData.data.data);
      setFilteredMenuItems(menuData.data.data);
    };
    getMenuData();
  }, []);

  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  console.log('filteredMenuItems:', filteredMenuItems)

  useEffect(() => {
    if (selectedCusine === "All") {
      setFilteredMenuItems(menuItems);
      return;
    }
    const filteredItems = menuItems.filter(
      (item) => item.cuisine === selectedCusine
    );
    setFilteredMenuItems(filteredItems);
  }, [selectedCusine]);

  // useEffect(() => 
  //   console.log(filteredMenuItems), 
  // [filteredMenuItems]);

  const handleSelectCusine = (cusine) => {

    // console.log(cusine);
    if (cusine.name === selectedCusine) return;
    setSelectedCusine(cusine.name);
  };

  return (
    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="text-3xl flex gap-4 items-center font-semibold">
        <Link to="/dashboard/billing-management">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <p>Select Dishes</p>
      </div>
      <ScrollArea className="w-full flex gap-4" type="scroll">
        <div className="h-[60rem]">
          <ScrollArea className="w-[70rem]">
            <div className="flex gap-2 py-3 ">
              <div
                className={cn(
                  "rounded-3xl w-32 border-3 bg-white text-gray-500 text-center p-1",
                  {
                    "bg-black text-white": selectedCusine === "All",
                  }
                )}
                onClick={(e) => handleSelectCusine({ category: "All" })}
              >
                All
              </div>
              {categories.map((cusine, index) => (
                <div
                  key={cusine._id}
                  className={cn(
                    "rounded-3xl w-32 border-3 bg-white text-gray-500 text-center p-1",
                    {
                      "bg-black text-white": selectedCusine === cusine.name,
                    }
                  )}
                  onClick={(e) => handleSelectCusine(cusine)}
                >
                  {cusine.name}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-4 ">
            <div className="flex flex-wrap gap-3 content-start w-4/5">
              {filteredMenuItems.map((item) => {
                const selectedItemsArray = billItems.filter(
                  (billedItem) => billedItem._id === item._id
                );
                const [selectedItem] = selectedItemsArray;

                const quantity = selectedItem?.quantity || 0;

                const currentAggregatorData = item.aggregators[0];
                // console.log(currentAggregatorData);

                return (
                  <ItemCard
                    key={item._id}
                    img={item.image}
                    name={item.name}
                    portions={currentAggregatorData.portions}
                    actualPrice={currentAggregatorData.actualPrice}
                    discountedPrice={currentAggregatorData.discountPrice}
                    available={item.quantity}
                    itemId={item._id}
                    quantity={quantity}
                    addItem={addItem}
                    subtractItem={subtractItem}
                  />
                );
              })}
            </div>
            <Bill
              bill={data.bill}
              billItems={billItems}
              addItem={addItem}
              subtractItem={subtractItem}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Order;
export const orderLoader = async ({ params, request }) => {
  const [, searchParams] = request.url.split("?");
  const searchTerm = new URLSearchParams(searchParams).get("id");
  // console.log("Seracrch Term", searchTerm);

  const response = await FetchBill({ billId: searchTerm });

  // console.log("response.data :", response.data);

  return response;
};

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
