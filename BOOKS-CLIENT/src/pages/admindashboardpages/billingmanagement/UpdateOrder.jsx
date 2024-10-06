
import Bill from "@/components/billingmanagement/Bill";
import ItemCard from "@/components/billingmanagement/ItemCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FetchBill, GetAllCuisines, GetAllMenuItems, MenuCategory, MenuData } from "@/config/routeApi/owner";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toastError, toastSuccess } from "@/helpers/helpers";
import { formatImageUrl } from "@/helpers/helpers";
import nonVeg from "@/assets/images/billing-management/non-veg.svg";

import UpdateOrderBill from "@/components/billingmanagement/UpdateOrderBill";

import ItemCardForUpdateOrder from "@/components/billingmanagement/ItemCardForUpdateOrder";

const UpdateOrder = () => {
    const [searchText, setSearchText] = useState("");
    const { billData = [] } = useLoaderData();
    // console.log('billData:', billData)
    const [categories, setCategories] = useState([]);
    const [selectedCusine, setSelectedCusine] = useState("All");
    // console.log('selectedCusine:', selectedCusine)
    const [menuItems, setMenuItems] = useState([]);
    // console.log('menuItems:', menuItems)
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);
    // console.log('filteredMenuItems:', filteredMenuItems)
    const [billItems, setBillItems] = useState([]);

    // console.log('billItems:', billItems)
    const addItem = useCallback((data) => {
        // console.log('data:', data)
        const foundItems = billItems.filter((billItem) => (billItem?.itemId === data?.itemId) && (billItem?.portion === data?.portion));
        // console.log('foundItems:', foundItems)
        if (foundItems?.length > 0) {
            setBillItems((prevItem) =>
                prevItem.map((billItem) => ((billItem?.itemId === data?.itemId) && (billItem?.portion === data?.portion)) ? { ...billItem, quantity: billItem?.quantity + 1 } : billItem)
            )
        } else {
            setBillItems((prevItem) => [...prevItem, data])
        }
        toastSuccess("Item has been added into your cart!");
    }, [billItems])

    const subtractItem = useCallback((data) => {
        // console.log('data:', data)
        const foundItems = billItems.filter((billItem) => (billItem?.itemId === data?.itemId) && (billItem?.portion === data?.portion));
        // console.log('foundItems:', foundItems)
        // console.log('foundItems?.length > 0:', foundItems?.length > 0)
        // console.log('foundItems?.quantity > 1:', foundItems?.quantity > 1, foundItems.quantity)
        // console.log('foundItems?.length > 0 && foundItems?.quantity > 1:', foundItems?.length > 0 && foundItems[0]?.quantity > 1)
        // console.log('foundItems?.quantity === 1:', foundItems?.quantity === 1)
        // console.log('foundItems?.quantity > 0:', foundItems?.quantity > 0)
        // console.log('foundItems?.length > 0 && foundItems?.quantity === 1 && foundItems?.quantity > 0:', foundItems?.length > 0 && foundItems[0]?.quantity === 1 && foundItems[0]?.quantity > 0)
        if (foundItems?.length > 0 && foundItems[0]?.quantity > 1) {
            setBillItems((prevItem) =>
                prevItem.map((billItem) => ((billItem?.itemId === data?.itemId) && (billItem?.portion === data?.portion)) ? { ...billItem, quantity: billItem?.quantity - 1 } : billItem)
            )
            toastSuccess("Item has been removed!");
        } else if (foundItems?.length > 0 && foundItems[0]?.quantity === 1 && foundItems[0]?.quantity > 0) {
            setBillItems((prevItem) => {
                return prevItem.filter((billItem) => {
                    // console.log('billItem?.quantity < 2:', billItem?.quantity < 2)
                    // console.log('billItem?.itemId === data?.itemId:', billItem?.itemId === data?.itemId)
                    // console.log('billItem?.portion === data?.portion:', billItem?.portion === data?.portion)
                    return !(billItem?.quantity < 2 && billItem?.itemId === data?.itemId && billItem?.portion === data?.portion)
                })
            })
            toastSuccess("Item has been removed!");
        } else {
            toastError("No item in your cart! Please add some item into your cart!");
        }
    }, [billItems])


    useEffect(() => {
        getAllCuisines();
    }, [])
    const getAllCuisines = async () => {
        try {
            const { data } = await GetAllCuisines();
            // console.log('data:', data)
            setCategories(data?.cuisines)
        } catch (error) {
            console.log('error:', error)
            toastError(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getAllMenuItems();
    }, [])
    const getAllMenuItems = async () => {
        try {
            const { data } = await GetAllMenuItems();
            console.log('data getAllMenuItems:', data)
            setMenuItems(data?.data)
            setFilteredMenuItems(data?.data);
        } catch (error) {
            console.log('error:', error)
            toastError(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getFilteredMenuItems(selectedCusine);
    }, [selectedCusine])
    const getFilteredMenuItems = (selectedCusine) => {
        if (selectedCusine === "All") {
            setFilteredMenuItems(menuItems);
            return;
        }
        const filteredItems = menuItems.filter((item) => item?.cuisine === selectedCusine);
        setFilteredMenuItems(filteredItems);
    }

    const handleSelectCusine = (data) => {
        // console.log('data:', data)
        setSelectedCusine(data?.name)
    }

    const handleBillItemsWhenKotMovedToKitchen = useCallback(() => {
        setBillItems([]);
        getAllMenuItems();
    },[])

    return (
        <div className="py-4 w-full h-full flex flex-col gap-3 font-roboto">
            <div className="text-3xl flex gap-4 items-center font-semibold border-1">
                <Link to="/dashboard/billing-management">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <p>Select Dishes</p>
                <input type="text" onChange={(event) => setSearchText(event.target.value)} value={searchText} />
            </div>
            <ScrollArea className="w-[82rem] border-1" scrollbars="horizontal" size="1">
                <div className="h-[60px] border-1 flex gap-2 py-2">
                    <div
                        className={cn(
                            "rounded-3xl w-32 border-3 flex items-center justify-center bg-white text-gray-500 p-1 cursor-pointer",
                            {
                                "bg-black text-white": selectedCusine === "All",
                            }
                        )}
                        onClick={(e) => handleSelectCusine({ name: "All" })}
                    >
                        All
                    </div>
                    {categories?.map((cusine, index) => (
                        <div
                            key={cusine?._id}
                            className={cn(
                                "rounded-3xl w-32 border-3 flex items-center justify-center bg-white text-gray-500 text-center p-1 cursor-pointer",
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
            <div className="border-1 w-full h-[80%] flex gap-2">
                <div className="border-1 w-[65%]">
                    <ScrollArea className="h-screen pb-20 pr-2">
                        <div className="border-1 w-full h-auto grid grid-cols-2 gap-x-2 gap-y-5 p-2 justify-items-center place-items-start">
                            {
                                filteredMenuItems?.map((element) => {
                                    let totalPortionQuantity = 0;
                                    let halfPortionQuantity = 0;
                                    let fullProtionQuantity = 0;
                                    // console.log('element:', element)
                                    const selectedItemsArray = billItems.filter((billedItem) => {
                                        if (billedItem.itemId === element._id && billedItem?.portion === "full") {
                                            fullProtionQuantity += billedItem?.quantity;
                                            totalPortionQuantity += (Number(billedItem?.quantity) * 2)
                                        } else if (billedItem.itemId === element._id && billedItem?.portion === "half") {
                                            halfPortionQuantity += billedItem?.quantity;
                                            totalPortionQuantity += (Number(billedItem?.quantity));
                                        }
                                        return billedItem.itemId === element._id
                                    })
                                    // console.log('selectedItemsArray:', selectedItemsArray)

                                    // const [selectedItem] = selectedItemsArray;
                                    // console.log('selectedItem:', selectedItem)
                                    // console.log('quantity:', quantity)

                                    return (
                                        <ItemCardForUpdateOrder
                                            item={element}
                                            totalPortionQuantity={totalPortionQuantity}
                                            addItem={addItem}
                                            subtractItem={subtractItem}
                                            halfPortionQuantity={halfPortionQuantity}
                                            fullProtionQuantity={fullProtionQuantity}
                                        />
                                    )
                                })
                            }
                        </div>
                    </ScrollArea>
                </div>
                <div className="border-1 w-[35%]">
                    <ScrollArea className="h-screen pb-60 pr-2">
                        <div className="border-1 w-full">
                            <UpdateOrderBill 
                                bill={billData}
                                billItems={billItems}
                                addItem={addItem}
                                subtractItem={subtractItem}
                                handleBillItemsWhenKotMovedToKitchen={handleBillItemsWhenKotMovedToKitchen}
                            />
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrder;

export const getOrderDetails = async ({ params, request }) => {
    try {
        // console.log('request:', request)
        // console.log('request?.url:', request?.url)
        // console.log('request?.url.split("?"):', request?.url.split("3000"))

        const [, searchParams] = request?.url.split("?");
        // console.log('searchParams:', searchParams);
        const searchTerm = new URLSearchParams(searchParams).get("id");
        // console.log('searchTerm:', searchTerm)
        const { data } = await FetchBill({ billId : searchTerm });
        // console.log('data:', data?.bill)
        return { billData : data?.bill }
    } catch (error) {   
        console.log('error:', error)
        toastError(error?.response?.data?.message)
    }
}