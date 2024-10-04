
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
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
import { FormField, Form, FormItem, FormLabel, FormMessage, FormControl } from "../ui/form";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddNewTableData } from "@/config/routeApi/owner";
import { toastError, toastSuccess } from "@/helpers/helpers";

const aggregatorSchema = z.object({
    tableNumber: z.string().min(1, { message: "Kindly enter the table number" }),
    numberOfSeats: z.string().min(1, { message: "Kindly select the table seating type" }),
});

const AddTableForm = () => {
    const form = useForm({
        resolver: zodResolver(aggregatorSchema),
        defaultValues: {
            tableNumber: "",
            numberOfSeats: ""
        },
    });
    // console.log('form:', form.watch());

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // console.log(data);

        try {
            const response = await AddNewTableData(data);
            // console.log("response : ", response);

            if (response?.data.success) {
                toastSuccess(response?.data.message);
                form.reset({
                    tableNumber: "",
                    numberOfSeats: ""
                })
            }


            // if (response.status === 201) {
            //     console.log(response.data.message);
            //     toastSuccess("");
            //     navigate('/dashboard/table-management');
            // }

        } catch (error) {
            console.error("error1 : ", error);
            console.log("error1 :", error);
            toastError(error?.response.data.message);
        }

    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-xl bg-white p-8 flex flex-col gap-4 shadow"
            >
                <div className="flex justify-between gap-8 w-full">
                    <div className="flex flex-row justify-between gap-[8rem] w-full">
                        <FormField
                            name="tableNumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Table Number*</FormLabel>
                                    <Input
                                        type="number"
                                        {...field}
                                        className="w-full bg-[#F4FAFF] border-[#758D9F] border-1"
                                        placeholder="Enter table number here..."
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="numberOfSeats"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Select Seating*</FormLabel>
                                    <Select
                                        // defaultValue={"2"}
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-[#F4FAFF] border-[#758D9F] border-1">
                                                <SelectValue placeholder="Select seating..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* {cuisines.map((cuisine) => (
                                                <SelectItem key={cuisine._id} value={cuisine.name}>
                                                    {cuisine.name}
                                                </SelectItem>
                                            ))} */}
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
                                            <SelectItem value="6">6</SelectItem>
                                            <SelectItem value="8">8</SelectItem>
                                        </SelectContent>
                                    </Select>
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

export default AddTableForm;