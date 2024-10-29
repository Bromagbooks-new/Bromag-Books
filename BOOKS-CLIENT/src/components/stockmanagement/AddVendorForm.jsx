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
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

import DragAndDrop from "@/assets/images/billing-management/DragAndDrop.svg";
import { toastError, toastSuccess } from "@/helpers/helpers";
// import { AddVendor } from "@/config/routeApi/owner";
import { z } from "zod";

// Schema for vendor validation
const vendorSchema = z.object({
    vendorName: z.string().min(1, { message: "Vendor name is required" }),
    phoneNumber: z.string().min(10, { message: "Valid phoneNumber is required or invalid number" }),
    email: z.string().min(1, { message: "Vendor email is required" }),
    vendorType: z.string().min(1, { message: "Vendor type is required" }),
    vendorLicenceNo: z.string().min(1, { message: "vendorLicenceNo is required" }),
    image: z.instanceof(File, { message: "Please upload an image" }),
});

const AddVendorForm = ({ categories }) => {
    const form = useForm({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            vendorName: "",
            phoneNumber: "",
            email: "",
            vendorType: "",
            vendorLicenceNo: "",
        },
    });

    const onDrop = useCallback((acceptedFiles) => {
        form.setValue("image", acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const removeImage = () => {
        form.setValue("image", null);
    };

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.set("data", JSON.stringify(data));
            formData.set("VendorImage", data.image);

            // const response = await AddVendor(formData);

            // if (response.status === 200) {
            //     toastSuccess("Vendor already exists");
            // } else if (response.status === 201) {
            //     toastSuccess("Vendor added successfully");
            //     navigate("/dashboard/vendor-management");
            // }
        } catch (error) {
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
                            name="vendorName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="w-1/2">Vendor Name*</FormLabel>
                                    <Input {...field} placeholder="Enter vendor name" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Category */}
                        <FormField
                            name="vendorType"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Select type of Vendor*</FormLabel>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-[#F4FAFF] border-[#758D9F] border-1">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* {categories.map((cat) => (
                                            <SelectItem key={cat._id} value={cat.name}>
                                                {cat.name}
                                            </SelectItem>
                                        ))} */}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex gap-2">
                        {/* Address */}
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email ID*</FormLabel>
                                    <Input {...field} placeholder="Enter Email address" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Contact */}
                        <FormField
                            name="phoneNumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Phone Number*</FormLabel>
                                    <Input {...field} placeholder="Enter Phone Number" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>
                    <div className="flex gap-2">
                        {/* vednorLicenceNo */}
                        <FormField
                            name="vendorLicenceNo"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Vendor License Number*</FormLabel>
                                    <Input {...field} placeholder="Enter Licence Number" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    {/* Image Upload */}
                    {!form.watch("image") ? (
                        <>
                            <p>Upload Vendor Image*</p>
                            <div
                                {...getRootProps()}
                                className="w-full h-44 flex flex-col justify-center items-center border-3 rounded-xl border-dashed"
                            >
                                <input {...getInputProps()} />
                                <img src={DragAndDrop} />
                                {isDragActive ? (
                                    <p>Drop your image here ...</p>
                                ) : (
                                    <p>Drop your image here, or <span className="text-blue-500">Browse</span></p>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="w-64 group">
                            <Button
                                onClick={removeImage}
                                className="bg-secondary text-white rounded-full w-auto p-0 px-2 text-sm relative left-[14rem] top-2"
                            >
                                X
                            </Button>
                            <img
                                className="rounded-xl"
                                src={URL.createObjectURL(form.watch("image"))}
                            />
                        </div>
                    )}
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <Button className="bg-[#486072]">Submit</Button>
                    <Link to="/dashboard/vendor-management">
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

export default AddVendorForm;
