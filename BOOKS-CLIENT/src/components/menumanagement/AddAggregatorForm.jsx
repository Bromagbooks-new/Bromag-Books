import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { z } from "zod";
import { FormField, Form, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AddAggregator } from "@/config/routeApi/owner";
import { toastError, toastSuccess } from "@/helpers/helpers";

const aggregatorSchema = z.object({
  name: z.string().min(1, { message: "Kindly enter the aggregatror's name" }),
  description: z
    .string()
    .min(1, { message: "Kindly enter the aggregatror's description" }),
  id: z.string().min(1, { message: "Kindly enter your Aggregatror Id" }),
});

const AddAggregatorForm = () => {
  const form = useForm({
    resolver: zodResolver(aggregatorSchema),
    defaultValues: {
      name: "",
      description: "",
      id: "",
    },
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log(data);

    try {
      const response = await AddAggregator(data);
      // console.log(response);

      if (response.status === 200) {
        toastError("Aggregtor already exists");
        return;
      }

      if (response.status === 201) {
        // console.log(response.data.message);
        toastSuccess("Aggregator Added Successfully");
        navigate('/dashboard/menu-management/aggregators');

      }

    } catch (error) {
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
                  <FormLabel>Aggregator Name*</FormLabel>
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
              name="id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aggregator ID*</FormLabel>
                  <Input
                    {...field}
                    className="w-full bg-[#F4FAFF] border-[#758D9F] border-1"
                    placeholder="Select item type here..."
                  />
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
                  <FormLabel>Aggregator Description*</FormLabel>
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

export default AddAggregatorForm;
