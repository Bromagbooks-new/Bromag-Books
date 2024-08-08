import { useCallback } from "react";
import { Button } from "../ui/button";
import { AddExpense, AddOpeningReport } from "@/config/routeApi/owner";
import { toastError, toastSuccess } from "@/helpers/helpers";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDropzone } from "react-dropzone";

import DragAndDrop from "@/assets/images/billing-management/DragAndDrop.svg";

const expenseSchema = z.object({
  amount:z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  description: z
    .string()
    .min(1, { message: "Kindly tell us more about the expense" }),
  bill: z.instanceof(File, { message: "Kindly upload a picture of the bill" }),
});
const AddExpenseReportForm = () => {
  const form = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: 0,
      description: "",
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    form.setValue("bill", acceptedFiles[0]);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {

      const formData = new FormData();
      formData.append('totalAmount', data.amount);
      formData.append('description', data.description);
      formData.append('image', data.bill);

      const response = await AddExpense(formData);

      if (response.status === 201) {
        toastSuccess("Expense Report Created Successfully");
        navigate("/dashboard/billing-management/expense-report");
      }
    } catch (error) {
      console.error(error);
      toastError("Internal Server Error");
    }
  };

  const removeImage = ()=> {
    form.setValue('bill', null);
  }

  const handleCancel = () =>
    navigate("/dashboard/billing-management/opening-report");

  return (
    <div className="rounded-xl bg-white px-10 py-4 flex flex-col gap-4">
      <div className="text-xl font-bold">Add Today's Expense</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Amount*</FormLabel>
                <Input type="number" {...field} className="bg-[#F4FAFF]" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Amount*</FormLabel>
                <Textarea
                  {...field}
                  className="bg-[#F4FAFF]"
                  placeholder="Enter Descrption here"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {!form.watch("bill") ? (
            <>
              <div className="flex flex-col gap-1">
                <p className="">Upload a Copy*</p>
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
                <Button onClick={removeImage} className="hidden group-hover:block bg-secondary text-white rounded-full w-auto p-0 px-2 text-sm relative left-[14rem] top-2 h-auto">
                  X
                </Button>
              </div>
              <img
                className=" rounded-xl"
                src={URL.createObjectURL(form.watch("bill"))}
              />
            </div>
          )}
          <div className="flex justify-center gap-4 w-full">
            <Button type="submit" className="bg-secondary">
              Submit
            </Button>
            <Button
              type="button"
              className="bg-white border text-black"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddExpenseReportForm;
