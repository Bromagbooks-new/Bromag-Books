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
import imagePlaceholder from "@/assets/images/imgggg.png";

import { z } from "zod";

// Schema for vendor validation
const vendorSchema = z.object({
    vendorName: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    itemName: z.string().optional(),
    billDate: z.string().optional(),
    totalQuantity: z.string().optional(),
    billNumber: z.string().optional(),
    availiableQuantity: z.string().optional(),
});

const StockDetailForm = ({ categories }) => {
    const form = useForm({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            itemName: "Grilled Chicken",
            billDate: "2023-10-29",
            totalQuantity: "50",
            billNumber: "12345",
            availiableQuantity: "30",
            vendorName: "Fresh Farm Vendors",
            phoneNumber: "9876543210",
            email: "vendor@example.com",
        },
    });

    return (
        <Form {...form}>
            <form
                className="rounded-xl bg-white p-8 flex flex-col gap-4 shadow"
            >
                <div className="flex flex-col gap-4 w-full">
                    {/* Item Details */}
                    <div className="w-ful flex flex-row gap-4">
                        <FormField
                            name="itemName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Item Name</FormLabel>
                                    <Input {...field} readOnly />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="billDate"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Bill Date</FormLabel>
                                    <Input {...field} readOnly />
                                </FormItem>
                            )}
                        />

                    </div>

                    {/* Image Display */}
                    <div className="w-full flex gap-4">
                        <div className="w-1/2">
                            <img
                                src={imagePlaceholder}
                                alt="Item Image"
                                className="rounded-xl border w-3/2 h-auto object-cover"
                            />
                        </div>
                        <div className="w-1/2 flex flex-col gap-4">
                            <FormField
                                name="billNumber"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bill Number</FormLabel>
                                        <Input {...field} readOnly />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="totalQuantity"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Quantity</FormLabel>
                                        <Input {...field} readOnly />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="availiableQuantity"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Available Quantity</FormLabel>
                                        <Input {...field} readOnly />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Vendor Details */}
                    <div className="w-full flex flex-col gap-4">
                        <p className="text-xl font-bold">Vendor Details</p>
                        <div className="flex gap-2">
                            <FormField
                                name="vendorName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Vendor Name</FormLabel>
                                        <Input {...field} readOnly />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Email ID</FormLabel>
                                        <Input {...field} readOnly />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            name="phoneNumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input {...field} readOnly />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Submit and Cancel Buttons */}
                {/* <div className="flex justify-center gap-3 mt-4">
                    <Button className="bg-[#486072]">Edit</Button>
                    <Link to="/dashboard/vendor-management">
                        <Button
                            type="button"
                            className="bg-transparent border border-[#486072] text-[#486072]"
                        >
                            Back
                        </Button>
                    </Link>
                </div> */}
            </form>
        </Form>
    );
};

export default StockDetailForm;
