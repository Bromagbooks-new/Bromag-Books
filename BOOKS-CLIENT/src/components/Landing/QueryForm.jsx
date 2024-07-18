import QueryFormBG from "@/assets/images/landing-images/QueryFormBG.png";
import Arrow from "@/assets/images/landing-images/arrow.svg";
import Mask from '@/assets/images/landing-images/Mask Group.svg'
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const queryFormSchema = z.object({
    name: z.string().min(1, {message: "Kindly Input your name"}),
    email: z.string().min(1, {message: "Kindly Input your email"}),
    phoneNumber: z.string().min(1, {message: "Kindly Input your phone number"}),
    query: z.string().min(1, {message: "Kindly input your query"})
});


const QueryForm = () => {


    const form = useForm({
        resolver: zodResolver(queryFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            query: "",
        }
    });

    const onSubmit = async (data)=> {
        console.log(data);
    };


  return (
    <div
      className="w-screen h-[80rem] bg-cover relative bottom-[32rem] z-0 flex flex-col items-center justify-center"
      style={{ backgroundImage: `url("${QueryFormBG}")` }}
    >
      <div className="w-full h-full bg-gradient-to-b from-[#1F303C] to-transparent" />
      <div className="relative bottom-[15rem] flex flex-col gap-4">
        <p className="text-5xl text-white font-bold text-center">
          Give Your Feedback
        </p>
        <div className="relative h-0 bottom-10 left-[66rem]">
          <img
            className="relative z-10 h-36 w-36"
            src={Arrow}
          />
        </div>
        <div className="rounded-tl-[8rem] rounded-lg w-[72rem] h-[25rem] bg-white">
        <div className="relative h-0 ">
          <img
            className="relative z-10 h-36 w-36"
            src={Mask}
          />
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex gap-10">

                <FormField name="name" control={form.control} render={({field})=> <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                </FormItem>} />
                <FormField name="email" control={form.control} render={({field})=> <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                </FormItem>} />
                <FormField name="phoneNumber" control={form.control} render={({field})=> <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                </FormItem>} />
                </div>
            </form>
          </Form> */}
          <Input />
          <Input />
          <Input />
        </div>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
