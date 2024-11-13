import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import { z } from "zod";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../../../components/ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddAggregatorForMenu from "./../../../components/menumanagement/AddAggregatorForMenu";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { toastError, toastSuccess } from "@/helpers/helpers";
// import { getMenuItemById, editMenuItem } from "@/config/routeApi/owner";
import DragAndDrop from "@/assets/images/billing-management/DragAndDrop.svg";

const cusineSchema = z.object({
  name: z.string().min(1, { message: "Please enter the item's name" }),
  cusine: z.string().min(1, { message: "Please select a cuisine" }),
  subCusine: z.string().min(1, { message: "Please select a sub-cuisine" }),
  itemType: z.string().min(1, { message: "Please select the item type" }),
  quantity: z
    .string()
    .min(1, { message: "Quantity must be greater than 0" })
    .transform((v) => Number(v) || 0),
  aggregators: z.array(
    z.object({
      aggregator: z.string({ message: "Aggregator required" }),
      portions: z.array(
        z.object({
          type: z.string({ message: "Portion type required" }),
          actualPrice: z
            .string()
            .min(1, { message: "Price must be greater than 0" })
            .transform((v) => Number(v) || 0),
          discountPrice: z
            .string()
            .min(1, { message: "Discount must be greater than 0" })
            .transform((v) => Number(v) || 0),
        })
      ),
    })
  ),
  description: z
    .string()
    .min(1, { message: "Please enter the item's description" }),
  image: z.instanceof(File, { message: "Please upload an image of the item" }).optional(),
});

const EditMenuItemForm = ({ aggregators, cuisines }) => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState(null);

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
          aggregator: "Restaurant",
          portions: [],
        },
      ],
      description: "",
    },
  });

  // Fetch menu item data on component mount
  // useEffect(() => {
  //   const fetchMenuData = async () => {
  //     try {
  //       const response = await getMenuItemById(itemId);
  //       if (response.status === 200) {
  //         const data = response.data;
  //         form.reset({
  //           name: data.name,
  //           cusine: data.cusine,
  //           subCusine: data.subCusine,
  //           itemType: data.itemType,
  //           quantity: data.quantity,
  //           aggregators: data.aggregators,
  //           description: data.description,
  //         });
  //         setMenuData(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching menu item data:", error);
  //       toastError("Failed to load menu item data");
  //     }
  //   };

  //   fetchMenuData();
  // }, [itemId, form]);

  // Handle file upload
  const onDrop = useCallback((acceptedFiles) => {
    form.setValue("image", acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const removeImage = () => {
    form.setValue("image", null);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.set("data", JSON.stringify(data));
      if (data.image) formData.set("ItemImage", data.image);

      const response = await editMenuItem(itemId, formData);
      if (response.status === 200) {
        toastSuccess("Menu item updated successfully");
        navigate("/dashboard/menu-management");
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
      toastError("Failed to update menu item");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-xl bg-white p-8 flex flex-col gap-4 shadow"
      >
        <div className="flex gap-2">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Item Name*</FormLabel>
                <Input
                  {...field}
                  className="bg-[#F4FAFF] border-[#758D9F] border-1"
                  placeholder="Enter item name"
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
                <Textarea
                  {...field}
                  className="bg-[#F4FAFF] border-[#758D9F] border-1"
                  placeholder="Enter item description..."
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Additional fields: cusine, subCusine, itemType, quantity */}

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
          <div {...getRootProps()} className="w-full h-44 flex-col  justify-center flex border-3 rounded-xl border-dashed items-center">
            <input {...getInputProps()} />
            <img src={DragAndDrop} alt="Drag and Drop" />
            {isDragActive ? <p>Drop your Image here ...</p> : <p>Drop your image here, or <span className="text-blue-500">Browse</span></p>}
          </div>
        ) : (
          <div className="w-64 group">
            <Button
              onClick={removeImage}
              className="hidden group-hover:block bg-secondary text-white rounded-full w-auto p-0 px-2 text-sm relative left-[14rem] top-2 h-auto"
            >
              X
            </Button>
            <img className="rounded-xl" src={URL.createObjectURL(form.watch("image"))} alt="Selected" />
          </div>
        )}

        <div className="flex justify-center gap-3">
          <Button className="bg-[#486072]">Update</Button>
          <Link to="/dashboard/menu-management">
            <Button type="button" className="bg-transparent border-1 border-[#486072] text-[#486072]">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default EditMenuItemForm;
