import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AddSubCusine from "./AddSubCusine";
import AddAggregatorForMenu from "./AddAggregatorForMenu";

const cusineSchema = z.object({
  name: z.string().min(1, { message: "Kindly enter the cusine's name" }),
  cusine: z.string().min(1, { message: "Kindly select one subcusine" }),
  subCusine: z.string().min(1, { message: "Kindly select the sub-cusine" }),
  itemType: z.string().min(1, { message: "Kindly select the item type" }),
  quantity: z
    .number()
    .min(1, { message: "Kindly enter the quantiy greater than 0" }),
  aggregators: z.array(
    z.object({
      aggregator: z.string(),
      portions: z.object({
        type: z.string(),
        actualPrice: z
          .number()
          .min(1, { message: "Kindly set a price greater than 0" }),
        discountPrice: z
          .number()
          .min(1, { message: "Kindly set a price greater than 0" }),
      }),
    })
  ),
  description: z
    .string()
    .min(1, { message: "Kindly enter the menu item description" }),
  image: z.instanceof(File, { message: "Kindly upload the image of the item" }),
});

const AddMenuItemForm = () => {
  const form = useForm({
    resolver: zodResolver(cusineSchema),
    defaultValues: {
      name: "",
      cusine: "",
      subCusine: "",
      itemType: "",
      quantity: 0,
      aggregators: [
        {
          aggregator: "Restraunt",
          portions: [
            {
              type: "Regular",
              actualPrice: 0,
              discountPrice: 0,
            },
          ],
        },
      ],
      description: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-xl bg-white p-8 flex flex-col gap-4 shadow"
      >
        <div className="flex flex-col gap-8 w-full">
          <div className="flex gap-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Item Name*</FormLabel>
                  <Input
                    {...field}
                    className=" bg-[#F4FAFF] border-[#758D9F] border-1"
                    placeholder="Enter cuisine name"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Item Description*</FormLabel>
                  <Input
                    {...field}
                    className=" bg-[#F4FAFF] border-[#758D9F] border-1"
                    placeholder="Enter item description here..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              name="cusine"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cusine Name*</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#F4FAFF] border-[#758D9F] border-1">
                        <SelectValue placeholder="Select a Cusine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="subCusine"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Sub Cusine Name*</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#F4FAFF] border-[#758D9F] border-1">
                        <SelectValue placeholder="Select a Cusine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="indian">North Indian</SelectItem>
                      <SelectItem value="mexican">South Indian</SelectItem>
                      <SelectItem value="american">Maharashtrian</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              name="itemType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Item Type*</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#F4FAFF] border-[#758D9F] border-1">
                        <SelectValue placeholder="Select item Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="veg">Veg</SelectItem>
                      <SelectItem value="non-veg">Non-Veg</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Available Quantity*</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    className=" bg-[#F4FAFF] border-[#758D9F] border-1"
                    placeholder="Enter item quantity here..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
          <FormField
              name="aggregators"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Aggregators*</FormLabel>
                  <AddAggregatorForMenu />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-center gap-3 ">
          <Button className="bg-[#486072]">Submit</Button>
          <Link to="/dashboard/menu-management">
            <Button className="bg-transparent border-1 border-[#486072] text-[#486072]">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AddMenuItemForm;
