import CountCard from "@/components/billingmanagement/CountCard";
import PreviousBills from "@/components/billingmanagement/PreviousBills";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toastError } from "@/helpers/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Icon2 from '@/assets/images/billing-management/Icon-2.svg'
import Icon from '@/assets/images/billing-management/Icon.svg'
import Icon1 from '@/assets/images/billing-management/Icon-1.svg'
import { useNavigate } from "react-router-dom";
import { GenerateBill } from "@/config/routeApi/owner";

const onlineOrderSchema = z.object({
  customerName: z
    .string()
    .min(1, { message: "Please enter the customer name" }),
  customerPhone: z.string(),
  customerEmail: z.string(),
  tableNo: z.string(),
});

const DineinOrder = () => {
  const form = useForm({
    resolver: zodResolver(onlineOrderSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      tableNo: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {

      const response = await GenerateBill({...data, mode: "dinein"});
      
      // console.log(response.data);
      if(response.data.status === "BILL_GENERATED") {
        
        const billId = response.data.billId;
        console.log(billId);

        navigate(`/dashboard/billing-management/order?id=${billId}`);
        return;
      } else {
        toastError(response.data.error);
        return;
      }
    } catch(error) {
      console.error(error);
      toastError("Internal Server Eerror");
    }
  };


  return (
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-xl shadow-md p-4 w-[68.2%] bg-white flex flex-col gap-2 -mt-3"
        >
          <p className="text-xl font-semibold">Dine-In Order Details</p>
          <div className="flex gap-4 w-full">
            <FormField
              name="customerName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Customer Name*</FormLabel>
                  <Input
                    {...field}
                    className="border-[#758D9F] border-1 bg-[#F4FAFF]"
                    placeholder="Enter customer's name here..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="customerPhone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    {...field}
                    className="border-[#758D9F] border-1 bg-[#F4FAFF]"
                    placeholder="Enter mobile number here..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 w-full">
            <FormField
              name="customerEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[48.5%]">
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    className="border-[#758D9F] border-1 bg-[#F4FAFF]"
                    placeholder="Enter email here..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tableNo"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[48.5%]">
                  <FormLabel>Table Number</FormLabel>
                  <Input
                    {...field}
                    className="border-[#758D9F] border-1 bg-[#F4FAFF]"
                    placeholder="Enter Table Number here..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="bg-[#486072] p-6">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <PreviousBills type="dinein" />
      <div className="flex gap-3">
      <CountCard title="Total Tables" icon={Icon1} className="border-2 border-[#FF9068]" />
      <CountCard title="Tables Available" icon={Icon} className="border-2 border-[#1BD276]" />
      <CountCard title="Tables Occupied" url="orders-on-hold" icon={Icon2} className="border-2 border-[#5A57D0]" />
      </div>
    </div>
  );
};

export default DineinOrder;
