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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Icon1 from '@/assets/images/billing-management/Icon-1.svg'
import Icon2 from '@/assets/images/billing-management/Icon-2.svg'
import { GenerateBill } from "@/config/routeApi/owner";
import { useNavigate, useNavigation, useLoaderData } from "react-router-dom";
import { toastError } from "@/helpers/helpers";
import { GetTotalAndHoldOrdersCountEitherForTakeAwayOrForOnline } from "@/config/routeApi/owner";

const onlineOrderSchema = z.object({
  customerName: z
    .string()
    .min(1, { message: "Please enter the customer name" }),
  customerPhone: z.string(),
  customerEmail: z.string(),
});

const TakeawayOrder = () => {
  const { totalOrdersCount, totalHoldOrdersCount } = useLoaderData();
  console.log('totalHoldOrdersCount:', totalHoldOrdersCount)
  console.log('totalOrdersCount:', totalOrdersCount)

  const form = useForm({
    resolver: zodResolver(onlineOrderSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {

      const response = await GenerateBill({ ...data, mode: "takeaway" });

      // console.log(response.data);
      if (response.data.status === "BILL_GENERATED") {

        const billId = response.data.billId;
        console.log(billId);

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
    <div className="flex flex-col gap-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-xl shadow-md p-4 w-[68.2%] bg-white flex flex-col gap-2 -mt-3"
        >
          <p className="text-xl font-semibold">Takeaway Order Details</p>
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
          <div className="w-full">
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
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="bg-[#486072] p-6">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <PreviousBills type="takeaway" />
      <div className="flex gap-3">
        <CountCard title="Total Orders" Count={totalOrdersCount} textColor1={"text-486072-color"} textColor2={"text-color-CB5124"}  url={`total-orders?total-orders=${totalOrdersCount}`} icon={Icon1} className="border-2 border-color-FF9068" />
        <CountCard title="Orders on Hold" Count={totalHoldOrdersCount} textColor1={"text-486072-color"} textColor2={"text-color-2321A8"} url="orders-on-hold" icon={Icon2} className="border-2 border-[#7876F6]" />
      </div>
    </div>
  );
};

export default TakeawayOrder;

export const getTotalAndHoldOrdersCountForTakeAway = async () => {
  try {
    const { data } = await GetTotalAndHoldOrdersCountEitherForTakeAwayOrForOnline("takeaway");
    // console.log('data:', data)
    return { totalOrdersCount : data?.totalOrdersCount || 0, totalHoldOrdersCount : data?.totalholdOrdersCount}
  } catch(error) {
    console.log('table loader error:', error)
  }
}