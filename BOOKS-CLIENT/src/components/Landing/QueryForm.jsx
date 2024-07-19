import QueryFormBG from "@/assets/images/landing-images/QueryFormBG.png";
import Arrow from "@/assets/images/landing-images/arrow.svg";
import Mask from '@/assets/images/landing-images/Mask Group.svg'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Mail, Phone, User } from "lucide-react";

const queryFormSchema = z.object({
    name: z.string().min(1, {message: "Kindly Input your name"}),
    email: z.string().min(1, {message: "Kindly Input your email"}),
    phoneNumber: z.string().min(1, {message: "Kindly Input your phone number"}),
    query: z.string().min(1, {message: "Kindly input your query"})
});



const QueryFormInput = ({placeholder, icon, field, type})=> {

  if(type==='text-field') {
    return <div className="flex gap-2 items-center justify-center px-3 py-2 w-full border-3 border-gray-200 rounded-xl">
      {icon}
      <Input {...field} className="border-0 focus-visible:ring-0" placeholder={placeholder} />
    </div>
  }

  if(type==='text-area') {
    return <div className="flex gap-2 p-2 w-[26rem] h-[10rem] border-3 border-gray-200 rounded-xl">
    {icon}
    <Textarea {...field} className="border-0 focus-visible:ring-0" placeholder={placeholder} />

  </div>
  }

}


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
      className="w-screen h-[80rem] -mb-[32rem] bg-cover relative bottom-[32rem] z-0 flex flex-col items-center justify-center"
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
        <div className="rounded-tl-[8rem] rounded-3xl w-[72rem] h-[25rem] bg-white">
        <div className="relative h-0 ">
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="flex gap-10 px-28 py-20 justify-between">
                  <div className="flex flex-col gap-4 w-full">


                <FormField name="name" control={form.control} render={({field})=> <FormItem>
                    <QueryFormInput placeholder="Enter your name" icon={<User className="text-gray-500" />} field={field} type="text-field" />
                    <FormMessage />
                </FormItem>} />
                <FormField name="email" control={form.control} render={({field})=> <FormItem>
                <QueryFormInput placeholder="Enter Email" icon={<Mail className="text-gray-500" />} field={field} type="text-field" />

                    <FormMessage />
                </FormItem>} />
                <FormField name="phoneNumber" control={form.control} render={({field})=> <FormItem>
                <QueryFormInput placeholder="Enter Phone Number" icon={<Phone className="text-gray-500" />} field={field} type="text-field" />

                    <FormMessage />
                </FormItem>} />
                  </div>
                <div className="flex flex-col items-end gap-2 w-full">

                <FormField name="query" control={form.control} render={({field})=> <FormItem>
                <QueryFormInput placeholder="Write something..." field={field} type="text-area" />

                    <FormMessage />
                </FormItem>} />
                <Button className="bg-landing-secondary w-48 h-16 text-xl"  type="submit">Submit</Button>
                </div>

                </div>
            </form>
          </Form>
          <img
            className="relative z-10 h-36 w-36"
            src={Mask}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
