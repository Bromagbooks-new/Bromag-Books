import Vector from "@/assets/images/book-a-demo/Vector-white.svg";
import Ellipse from "@/assets/images/book-a-demo/Ellipse-White-1.svg";
import Ellipse1 from "@/assets/images/book-a-demo/Ellipse-white-2.svg";
import Star from "@/assets/images/login/Star.svg";
import square1 from "@/assets/images/login/square-1.svg";
import square2 from "@/assets/images/login/square-2.svg";
import RequestSubmitted  from '@/assets/images/book-a-demo/request-submitted.svg';

import { Separator } from "@/components/ui/separator";


const DemoBooked = () => {


  return (
    <>
      
      <div className="bg-white h-screen">
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
        <div className="flex flex-col gap-10 items-center justify-center h-full text-[#486072] font-roboto z-40">
          <div className="flex flex-col gap-4 items-center justify-center h-full font-roboto z-40 text-center">
          <img
            className="md:w-[20rem] md:h-[20rem] -mb-10"
            src={RequestSubmitted}
          />
          <p className="text-4xl font-bold text-black">Submitted!</p>
          <Separator className="bg-[#0E69AC]" />
          <div className="flex flex-col gap-2 text-[#0E69AC] w-11/12 md:w-full">
            
          <p className="">Thank you for your interest in BROMAG BOOKS.</p>
          <p className="">We are delighted to have you explore our services. Our sales representative will be in touch with you shortly. </p>
          <p className="text-bold">Please accept our call from 9150289762 to help us serve you better.</p>
          </div>
          </div>
        </div>

        {/* </Container> */}
      </div>
    </>
  );
};
export default DemoBooked;
