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
import imagePlaceholder from "@/assets/images/imgggg.png";
// import { AddVendor } from "@/config/routeApi/owner";
import { z } from "zod";

// Schema for vendor validation
const vendorSchema = z.object({
    vendorName: z.string().min(1, { message: "Vendor name is required" }),
    phoneNumber: z.string().min(10, { message: "Valid phoneNumber is required" }),
    email: z.string().min(1, { message: "Vendor email is required" }),
    itemName: z.string().min(1, { message: "Item Name is required" }),
    billDate: z.string().min(1, { message: "Bill Date is required" }),
    totalQuantity: z.string().min(1, { message: "Total Quantity is required" }),
    billNumber: z.string().min(1, { message: "Bill Number is required" }),
    availiableQuantity: z.string().min(1, { message: "Availiable Quantity is required" }),
    image: z.instanceof(File, { message: "Please upload an image" }),
});

const EditStockForm = ({ categories }) => {
    const form = useForm({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            itemName: "",
            billDate: "",
            totalQuantity: "",
            billNumber: "",
            availiableQuantity: "",
            vendorName: "",
            phoneNumber: "",
            email: "",
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
                            name="itemName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="w-1/2">Item Name*</FormLabel>
                                    <Input {...field} placeholder="Enter item name" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Bill Date */}
                        <FormField
                            name="billDate"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="w-1/2">Bill Date*</FormLabel>
                                    <Input {...field} placeholder="Enter Bill Date" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex gap-2">
                        {/* Total Quantity */}
                        <FormField
                            name="totalQuantity"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Total Quantity*</FormLabel>
                                    <Input {...field} placeholder="Enter Quantity" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Bill Number */}
                        <FormField
                            name="billNumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Bill Number*</FormLabel>
                                    <Input {...field} placeholder="Enter Bill Number" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>
                    <div className="flex gap-2">
                        {/* Availiable Quantity */}
                        <FormField
                            name="availiableQuantity"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-[37vw]">
                                    <FormLabel>Availiable Quantity*</FormLabel>
                                    <Input {...field} placeholder="Enter Availiable Quantity" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <p className="text-1xl flex gap-4 items-center font-bold">Vendor Details</p>
                    <div className="flex gap-2">
                        <FormField
                            name="vendorName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Vendor Name*</FormLabel>
                                    <Input {...field} placeholder="Enter Vendor Name" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email ID*</FormLabel>
                                    <Input {...field} placeholder="Enter Email" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-2"><FormField
                        name="phoneNumber"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-[37vw]">
                                <FormLabel>Phone Number*</FormLabel>
                                <Input {...field} placeholder="Enter Phone Number" />
                                <FormMessage />
                            </FormItem>
                        )}
                    /></div>


                    {/* Image Upload */}
                    <p>Upload Vendor Image*</p>
                    <div className="flex justify-between gap-3">
                        {!form.watch("image") ? (
                            <>

                                <div
                                    {...getRootProps()}
                                    className="w-3/4 h-90 flex flex-col justify-center items-center border-3 rounded-xl border-dashed"
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
                        <div className="w-3/4 flex flex-row">
                            <img
                                src={imagePlaceholder}
                                alt="Item Image"
                                className="rounded-xl border w-3/4 h-auto object-cover"
                            />
                            <Button className="bg-[red]">Delete Image</Button>
                        </div>

                    </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <Button className="bg-[#486072]">Save Changes</Button>
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

export default EditStockForm;
