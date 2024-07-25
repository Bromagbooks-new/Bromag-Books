import QueryFormBG from "@/assets/images/landing-images/QueryFormBG.png";
import Arrow from "@/assets/images/landing-images/arrow.svg";
import Mask from "@/assets/images/landing-images/Mask Group.svg";
import Mask2 from "@/assets/images/landing-images/Mask Group 2.svg";
import Mask3 from "@/assets/images/landing-images/Group 42.svg";
import Mask4 from "@/assets/images/landing-images/Mask Group 4.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Mail, Phone, User } from "lucide-react";
import { storeUserQuery } from "@/config/routeApi/restaurant";

const queryFormSchema = z.object({
  name: z.string().min(1, { message: "Kindly Input your name" }),
  email: z.string().min(1, { message: "Kindly Input your email" }),
  phoneNumber: z.string().min(1, { message: "Kindly Input your phone number" }),
  query: z.string().min(1, { message: "Kindly input your query" }),
});

const QueryFormInput = ({ placeholder, icon, field, type }) => {
  if (type === "text-field") {
    return (
      <div className="flex gap-2 items-center justify-center px-3 py-2  h-10 md:h-16 md:w-[26rem] border-3 border-gray-200 rounded-xl">
        {icon}
        <Input
          {...field}
          className="border-0 focus-visible:ring-0 z-20 bg-transparent"
          placeholder={placeholder}
        />
      </div>
    );
  }

  if (type === "text-area") {
    return (
      <div className="flex gap-2 p-2 md:w-[26rem] md:h-[10rem] border-3 border-gray-200 rounded-xl">
        {icon}
        <Textarea
          {...field}
          className="border-0 focus-visible:ring-0"
          placeholder={placeholder}
        />
      </div>
    );
  }
};

const QueryForm = () => {
  const form = useForm({
    resolver: zodResolver(queryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      query: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await storeUserQuery(data);

      if(response.status == 200) {
          console.log(response.data.message);
          form.reset();
      }

  } catch(error) {
      console.error(error);

  }
  };

  return (
    <div
      className="w-screen h-[80rem] md:-mb-[32rem] bg-cover relative  bottom-[32rem] z-0 flex flex-col overflow-hidden items-center justify-center font-roboto pb-20 -mb-[32rem]"
      style={{ backgroundImage: `url("${QueryFormBG}")` }}
    >
      <div className="w-full h-full bg-gradient-to-b from-[#1F303C] to-transparent" />
      <div className="relative top-[2rem] md:bottom-[15rem] flex flex-col gap-1 md:gap-4">
        <p className="text-3xl md:text-5xl text-white font-semibold md:font-bold text-center font-roboto-condensed">
          Give Your Feedback
        </p>
        <div className="relative h-0 left-[21rem] bottom-6 md:left-[66rem]">
          <img className="relative z-20 h-16 w-16 md:h-36 md:w-36" src={Arrow} />
        </div>
        <div className="rounded-tl-[2rem] md:rounded-tl-[8rem] rounded-xl md:rounded-3xl w-[24rem] h-[30rem] md:w-[72rem] md:h-[25rem] bg-white">
          <div className="relative h-0 ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="flex flex-col md:flex-row gap-4 md:gap-10 px-12 md:px-28 py-16  md:py-20 justify-between">
                  <div className="flex flex-col md:items-start gap-4 w-full">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="z-20 bg-white rounded">
                          <QueryFormInput
                            placeholder="Enter your name"
                            icon={<User className="text-gray-500" />}
                            field={field}
                            type="text-field"
                          />
                          <FormMessage className="relative h-0" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="z-20 bg-white rounded-full">
                          <QueryFormInput
                            placeholder="Enter Email"
                            icon={<Mail className="text-gray-500" />}
                            field={field}
                            type="text-field"
                          />

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="phoneNumber"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="z-20 bg-white">
                          <QueryFormInput
                            placeholder="Enter Phone Number"
                            icon={<Phone className="text-gray-500" />}
                            field={field}
                            type="text-field"
                          />

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col  md:items-end gap-2 w-full">
                    <FormField
                      name="query"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="z-20 bg-white">
                          <QueryFormInput
                            placeholder="Write something..."
                            field={field}
                            type="text-area"
                          />

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-center">

                    <Button
                      className="bg-landing-secondary w-24 md:w-48 h-12 md:h-16 text-lg md:text-xl z-30"
                      type="submit"
                      disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                      >
                      {form.formState.isSubmitting ? "Submitting..." : form.formState.isSubmitSuccessful ? "Submited": "Submit" }
                    </Button>
                      </div>
                  </div>
                </div>
              </form>
            </Form>
            <div className="relative z-10 h-0 bottom-[10rem] md:bottom-[24rem] left-[7rem] md:right-[5rem] ">
              <img
                className="relative w-[20rem] h-[10rem] md:h-[28rem] md:w-[28rem] "
                src={Mask}
              />
            </div>
            <div className="block md:hidden relative z-10 h-0 bottom-[29.5rem] opacity-20 md:bottom-[24rem] left-4 md:right-[5rem] ">
              <img
                className="relative w-[15rem] h-[15rem] md:h-[28rem] md:w-[28rem] "
                src={Mask3}
              />
            </div>
            <div className="block md:hidden relative z-10 h-0 bottom-[7rem] md:bottom-[24rem] left-0 md:right-[5rem] ">
              <img
                className="relative w-[8rem] h-[8rem] md:h-[28rem] md:w-[28rem]"
                src={Mask4}
              />
            </div>
            <div className="relative z-10 h-0 bottom-[29rem] md:bottom-[24rem] left-[15rem] md:left-[54.4rem]">
              <img
                className="relative w-[10rem] h-[10rem] md:h-[20rem] md:w-[20rem] "
                src={Mask2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
