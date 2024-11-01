import PreviousBills from "@/components/billingmanagement/PreviousBills";
import CountCard from "@/components/billingmanagement/CountCard";
import { Button } from "@/components/ui/button";
import Icon2 from '@/assets/images/billing-management/Icon-2.svg'
import Icon1 from '@/assets/images/billing-management/Icon-1.svg'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toastError } from "@/helpers/helpers";
import { useNavigate, useLoaderData } from "react-router-dom";
import { GenerateBill } from "@/config/routeApi/owner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GetTotalAndHoldOrdersCountEitherForTakeAwayOrForOnline } from "@/config/routeApi/owner";

const onlineOrderSchema = z.object({
  orderId: z.string().min(1, { message: "Please enter the Order ID" }),
  aggregator: z
    .string()
    .min(1, { message: "Kindly Select an aggregator platform" }),
});

const OnlineOrder = () => {
  const { totalOrdersCount, totalHoldOrdersCount } = useLoaderData();
  console.log('totalHoldOrdersCount:', totalHoldOrdersCount)
  console.log('totalOrdersCount:', totalOrdersCount)
  const form = useForm({
    resolver: zodResolver(onlineOrderSchema),
    defaultValues: {
      orderId: "",
      aggregator: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {

      const response = await GenerateBill({ ...data, mode: "online" });

      // console.log(response.data);
      if (response.data.status === "BILL_GENERATED") {

        const billId = response.data.billId;
        console.log("BillId->", billId);

        navigate(`/dashboard/billing-management/order?id=${billId}`);
        return;
      } else {
        toastError(response.data.error);
        return;
      }
    } catch (error) {
      console.error(error);
      toastError("Internal Server Eerror");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-xl shadow-md p-4 w-[68.2%] bg-white flex flex-col gap-2 -mt-3">
          <p className="text-xl font-semibold">Online Order Details</p>
          <div className="flex gap-4 w-full">
            <FormField
              name="orderId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Order Id*</FormLabel>
                  <Input
                    {...field}
                    className="border-[#758D9F] border-1 bg-[#F4FAFF]"
                    placeholder="Enter order id here..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="aggregator"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Aggregator Platform*</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border-[#758D9F] border-1 bg-[#F4FAFF] text-gray-500">
                        <SelectValue placeholder="Select an aggregator" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="swiggy">Swiggy</SelectItem>
                      <SelectItem value="bromag">Bromag</SelectItem>
                      <SelectItem value="zomato">Zomato</SelectItem>
                      <SelectItem value="magicpin">Magicpin</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="bg-[#486072] p-6">Submit</Button>
          </div>
        </form>
      </Form>
      <PreviousBills type="online" />
      <div className="flex gap-3">
        <CountCard title="Total Orders" Count={totalOrdersCount} textColor1={"text-486072-color"} textColor2={"text-color-CB5124"} url={`total-orders?total-orders=${totalOrdersCount}`} icon={Icon1} className="border-2 border-color-FF9068" />
        <CountCard title="Orders on Hold" Count={totalHoldOrdersCount} textColor1={"text-486072-color"} textColor2={"text-color-2321A8"} url="orders-on-hold" icon={Icon2} className="border-2 border-[#7876F6]" />
      </div>
    </div>
  );
};

export default OnlineOrder;

export const getTotalAndHoldOrdersCountForOnline = async () => {
  try {
    const { data } = await GetTotalAndHoldOrdersCountEitherForTakeAwayOrForOnline("online");
    // console.log('data:', data)
    return { totalOrdersCount: data?.totalOrdersCount || 0, totalHoldOrdersCount: data?.totalholdOrdersCount }
  } catch (error) {
    console.log('table loader error:', error)
  }
}