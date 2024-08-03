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
import { toastError } from "@/helpers/helpers";
import { useNavigate } from "react-router-dom";
import { GenerateBill } from "@/config/routeApi/owner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const onlineOrderSchema = z.object({
  orderId: z.string().min(1, { message: "Please enter the Order ID" }),
  aggregator: z
    .string()
    .min(1, { message: "Kindly Select an aggregator platform" }),
});

const OnlineOrder = () => {
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

      const response = await GenerateBill({...data, mode: "online"});
      
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-xl shadow-md p-4 w-[68.2%] bg-white flex flex-col gap-4">
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
                  <FormItem  className="w-1/2">
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
    </div>
  );
};

export default OnlineOrder;
