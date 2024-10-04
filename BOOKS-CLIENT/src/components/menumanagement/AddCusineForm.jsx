import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { z } from "zod";
import { FormField, Form, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AddSubCusine from "./AddSubCusine";
import { AddCuisine } from "@/config/routeApi/owner";

import { toastError, toastSuccess } from "@/helpers/helpers";


const cusineSchema = z.object({
  name: z.string().min(1, { message: "Kindly enter the Cuisine's name" }),
  subCusines: z.array(z.string()).min(1, {message: "Kindly enter atleast one subcusine"}),
  description: z
    .string()
    .min(1, { message: "Kindly enter the Cuisine's description" }),
});

const AddCusineForm = () => {
  const form = useForm({
    resolver: zodResolver(cusineSchema),
    defaultValues: {
      name: "",
      subCusines: [],
      description: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const response = await AddCuisine(data);
      // console.log(response);

      if(response.status === 200) {
        if(response.data.status === 'CUISINE_EXISTS') {
          toastError("Cuisine already exists");
          return;
        }
      }
      
      if(response.status === 201) {
        console.log(response.data.message);
        
        toastSuccess("Cuisine Added Successfully");
        navigate('/dashboard/menu-management/cuisines');

      }

    } catch(error) {
      console.error(error);
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
        <div className="flex justify-between gap-8 w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cuisine Name*</FormLabel>
                  <Input
                    {...field}
                    className="w-full bg-[#F4FAFF] border-[#758D9F] border-1"
                    placeholder="Enter cuisine name"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="subCusines"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Sub-Cusines*</FormLabel>
                  <AddSubCusine />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 ">
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Description*</FormLabel>
                  <Textarea
                    {...field}
                    className="h-28 bg-[#F4FAFF] border-[#758D9F] border-1"
                    placeholder="Enter item description here..."
                  />
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

export default AddCusineForm;
