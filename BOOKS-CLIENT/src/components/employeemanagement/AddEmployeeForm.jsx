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

const employeeSchema = z.object({
  name: z.string().min(1, { message: "Kindly enter the employee's name" }),
  phone: z.string().min(1, { message: "Kindly enter employee's phone" }),
  email: z.string().email({ message: "Kindly enter employee's email" }),
  idProof: z.instanceof(File, { message: "Kindly upload an ID Proof" }),
});
const AddEmployeeForm = () => {
  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    form.setValue("idProof", acceptedFiles[0]);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("image", data.idProof);

      const response = await AddExpense(formData);

      if (response.status === 201) {
        toastSuccess("Employee Report Created Successfully");
        navigate("/dashboard/employee-management/employees");
      }
    } catch (error) {
      console.error(error);
      toastError("Internal Server Error");
    }
  };

  const removeImage = () => {
    form.setValue("idProof", null);
  };

  const handleCancel = () =>
    navigate("/dashboard/employee-management/employees");

  return (
    <div className="rounded-xl bg-white px-10 py-4 flex flex-col gap-4">
      <div className="text-xl font-bold">Add Employee</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee's Name*</FormLabel>
                <Input
                  {...field}
                  className="bg-[#F4FAFF]"
                  placeholder="Enter name here"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 w-full">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Email*</FormLabel>
                  <Input
                    {...field}
                    className="bg-[#F4FAFF]"
                    placeholder="Enter Email here"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Phone*</FormLabel>
                  <Input
                    {...field}
                    className="bg-[#F4FAFF]"
                    placeholder="Enter Phone Number here"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!form.watch("idProof") ? (
            <>
              <div className="flex flex-col gap-1">
                <p className="">Upload a ID Proof Copy*</p>
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
                src={URL.createObjectURL(form.watch("idProof"))}
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

export default AddEmployeeForm;
