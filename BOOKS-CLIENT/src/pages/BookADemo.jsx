import Vector from "@/assets/images/book-a-demo/Vector-white.svg";
import Ellipse from "@/assets/images/book-a-demo/Ellipse-White-1.svg";
import Ellipse1 from "@/assets/images/book-a-demo/Ellipse-white-2.svg";
import Star from "@/assets/images/login/Star.svg";
import square1 from "@/assets/images/login/square-1.svg";
import square2 from "@/assets/images/login/square-2.svg";
import verify from "@/assets/images/login/verify.gif";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Landing/Navbar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { storeDemoRequest } from "@/config/routeApi/restaurant";

const bookADemoFormSchema = z.object({
  name: z.string().min(1, { message: "Kindly Enter your name" }),
  email: z.string().email({ message: "Kindly Enter your email address" }),
  phone: z.string().min(1, { message: "Kindly enter your phone numebr" }),
  location: z.string().min(1, { message: "Kindly Enter your Location" }),
  type: z.string().min(1, { message: "Kindly Select one option" }),
  designation: z.string().min(1, { message: "Kindly select one option" }),
  purpose: z.string().min(1, { message: "Kindly enter your purpose" }),
});

const BookADemo = () => {
  const form = useForm({
    resolver: zodResolver(bookADemoFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      type: "",
      designation: "",
      purpose: "",
    },
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await storeDemoRequest(data);

      if (response.status == 200) {
        console.log(response.data.message);
        navigate("/demo-booked");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white h-screen mt-64 md:mt-0">
        <div className="relative h-0">
          <img
            className="relative z-10 left-[42%] w-[56rem] hidden md:block"
            src={Vector}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 right-[0%] w-[28rem] top-[15rem] hidden md:block"
            src={Ellipse}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 right-[0%] w-[23rem] top-[20rem]  hidden md:block"
            src={Ellipse1}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 right-[0%]  w-[17rem] top-[26rem]  hidden md:block"
            src={Ellipse}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[66%]  w-[22rem] top-[27rem] hidden md:block"
            src={square1}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[10%]  w-[13rem] top-[2.8rem]"
            src={square2}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[24%]  w-[3rem] top-[38.8rem]"
            src={Star}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[76%]  w-[3rem] top-[16rem]"
            src={Star}
          />
        </div>

        {/* <Container> */}
        {/* <Logo className="logo" /> */}
        <div className="pt-96 md:pt-32 flex flex-col gap-10 items-center justify-center h-full text-[#486072] font-roboto z-40">
          <div className="flex items-center justify-center h-full font-roboto z-40">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 z-40"
              >
                <p className=" text-5xl font-semibold text-center">Book Demo</p>
                <p className=" text-gray-500 text-xl text-center">
                  Please enter the following details to login
                </p>
                <Separator className="bg-[#0E69AC]" />
                <div className="flex flex-col items-center md:flex-row gap-8">
                  <div className="flex w-2/3 md:w-1/2 flex-col gap-2">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <Input {...field} className="border-2" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Id*</FormLabel>
                          <Input {...field} className="border-2" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number*</FormLabel>
                          <Input {...field} className="border-2" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="location"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location/Address*</FormLabel>
                          <Textarea {...field} className="border-2" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-2/3 md:w-1/2 flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Select Any*</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex md:gap-4 flex-col md:flex-row"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 border-2 rounded-xl p-2 w-32 md:w-auto">
                                <FormControl>
                                  <RadioGroupItem value="restraunt" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Restraunt
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 border-2 rounded-xl p-2 w-32 md:w-auto">
                                <FormControl>
                                  <RadioGroupItem value="company" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Company
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Tell Us About Yourself*</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex md:gap-4 flex-col md:flex-row"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 border-2 rounded-xl p-2 w-36 md:w-auto">
                                <FormControl>
                                  <RadioGroupItem value="representive" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Representive
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 border-2 rounded-xl p-2 w-32 md:w-auto">
                                <FormControl>
                                  <RadioGroupItem value="vendor" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Vendor
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 border-2 rounded-xl p-2 w-40 md:w-auto">
                                <FormControl>
                                  <RadioGroupItem value="business-owner" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Business Owner
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="purpose"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Purpose*</FormLabel>
                          <Textarea {...field} className="h-28 border-2" />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-center pb-10 md:pb-0">
                  <Button
                    type="submit"
                    className="w-1/3 h-12  bg-[#486072]"
                    disabled={
                      form.formState.isSubmitting ||
                      form.formState.isSubmitSuccessful
                    }
                  >
                    {form.formState.isSubmitting
                      ? "Submitting..."
                      : form.formState.isSubmitSuccessful
                      ? "Submited"
                      : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* </Container> */}
      </div>
    </>
  );
};
export default BookADemo;
