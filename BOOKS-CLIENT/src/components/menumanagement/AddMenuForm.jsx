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
import { Link, useNavigate } from "react-router-dom";
import AddSubCusine from "./AddSubCusine";
import AddAggregatorForMenu from "./AddAggregatorForMenu";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";

import DragAndDrop from "@/assets/images/billing-management/DragAndDrop.svg";
import { toastError, toastSuccess } from "@/helpers/helpers";
import { AddMenuItem } from "@/config/routeApi/owner";

const cusineSchema = z.object({
  name: z.string().min(1, { message: "Kindly enter the cusine's name" }),
  cusine: z.string().min(1, { message: "Kindly select one subcusine" }),
  subCusine: z.string().min(1, { message: "Kindly select the sub-cusine" }),
  itemType: z.string().min(1, { message: "Kindly select the item type" }),
  quantity: z
    .string()
    .min(1, { message: "Kindl set quantityy gratear than 0 " })
    .transform((v) => Number(v) || 0),
  aggregators: z.array(
    z.object({
      aggregator: z.string({ message: "UWUW" }),
      portions: z.array(
        z.object({
          type: z.string({ message: "WUIWU" }),
          actualPrice: z
            .string()
            .min(1, { message: "Kindl set quantityy gratear than 0 " })
            .transform((v) => Number(v) || 0),
          discountPrice: z
            .string()
            .min(1, { message: "Kindl set quantityy gratear than 0 " })
            .transform((v) => Number(v) || 0),
        })
      ),
    })
  ),
  description: z
    .string()
    .min(1, { message: "Kindly enter the menu item description" }),
  image: z.instanceof(File, { message: "Kindly upload the image of the item" }),
});

const AddMenuItemForm = ({ aggregators, cuisines }) => {
  console.log(aggregators);
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
          portions: [],
        },
      ],
      description: "",
    },
  });
  // console.log(form.watch('aggregators'));
  // console.log(form.formState);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    form.setValue("image", acceptedFiles[0]);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const removeImage = () => {
    form.setValue("image", null);
  };

  const [selectedCuisine, setSelectedCuisine] = useState();

  useEffect(
    () => setSelectedCuisine(form.watch("cusine")),
    [form.watch("cusine")]
  );
  
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    
    try {
      console.log(data);
  
      const formData = new FormData();
      formData.set('data', JSON.stringify(data));
      formData.set('ItemImage', data.image);

      const response = await AddMenuItem(formData);

      if(response.status === 200) {
        toastSuccess("Item Already Exits");
      }
      if(response.status === 201) {
        toastSuccess("Item Added Successfully");
        navigate('/dashboard/menu-management');
      }


    }catch(error) {
      console.log(error);

      toastError("Internal Server Error");

    }


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
                      {cuisines.map((cuisine) => (
                        <SelectItem key={cuisine._id} value={cuisine.name}>
                          {cuisine.name}
                        </SelectItem>
                      ))}
                      {/* <SelectItem value="indian">Indian</SelectItem> */}
                      {/* <SelectItem value="mexican">Mexican</SelectItem> */}
                      {/* <SelectItem value="american">American</SelectItem> */}
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
                    disabled={!selectedCuisine}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#F4FAFF] border-[#758D9F] border-1">
                        <SelectValue placeholder="Select a Sub-Cusine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCuisine && cuisines
                        .filter(
                          (cuisine) => cuisine.name === selectedCuisine
                        )[0]
                        .subCuisines.map((subCusine) => (
                          <SelectItem key={subCusine} value={subCusine}>
                            {subCusine}
                          </SelectItem>
                        ))}
                      {/* <SelectItem value="indian">North Indian</SelectItem> */}
                      {/* <SelectItem value="mexican">South Indian</SelectItem> */}
                      {/* <SelectItem value="american">Maharashtrian</SelectItem> */}
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
                  <AddAggregatorForMenu availableAggregators={aggregators} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!form.watch("image") ? (
            <>
              <div className="flex flex-col gap-1">
                <p className="">Upload the menu image*</p>
              </div>
              <div
                {...getRootProps()}
                className="w-full h-44 flex-col  justify-center flex border-3 rounded-xl border-dashed items-center"
              >
                <input {...getInputProps()} />
                <img src={DragAndDrop} />
                {isDragActive ? (
                  <p>Drop your Image here ...</p>
                ) : (
                  <p>
                    Drop your image here, or{" "}
                    <span className="text-blue-500">Browse</span>
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="w-64 group">
              <div className="h-0 w-0 relative">
                <Button
                  onClick={removeImage}
                  className="hidden group-hover:block bg-secondary text-white rounded-full w-auto p-0 px-2 text-sm relative left-[14rem] top-2 h-auto"
                >
                  X
                </Button>
              </div>
              <img
                className=" rounded-xl"
                src={URL.createObjectURL(form.watch("image"))}
              />
            </div>
          )}
        </div>
        <div className="flex justify-center gap-3 ">
          <Button className="bg-[#486072]">Submit</Button>
          <Link to="/dashboard/menu-management">
            <Button
              type="button"
              className="bg-transparent border-1 border-[#486072] text-[#486072]"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AddMenuItemForm;
