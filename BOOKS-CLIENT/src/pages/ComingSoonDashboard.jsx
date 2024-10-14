import Vector from "@/assets/images/book-a-demo/Vector-white.svg";
import Ellipse from "@/assets/images/book-a-demo/Ellipse-White-1.svg";
import Wire from '@/assets/images/coming-soon/Wire.svg';
import Cross from '@/assets/images/coming-soon/Cross.svg';
import Zero from '@/assets/images/coming-soon/Zero.svg';
import Ellipse1 from "@/assets/images/book-a-demo/Ellipse-white-2.svg";
import Star from "@/assets/images/login/Star.svg";
import square1 from "@/assets/images/login/square-1.svg";
import square2 from "@/assets/images/login/square-2.svg";
import Logo from "@/assets/images/logo.svg";

import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ComingSoonDashboard = () => {
  return (
    <>
      <div className="bg-white h-screen overflow-hidden">
        <div className="relative h-0">
          <img
            className="relative z-10 left-[42%] w-[56rem] hidden md:block"
            src={Vector}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-20 right-[0%] w-[28rem] top-[0rem] hidden md:block"
            src={Wire}
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
        <div className="relative h-0">
          <img
            className="relative z-10 left-[45%]  w-[3rem] top-[2rem] md:top-[12rem]"
            src={Cross}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[76%]  w-[3rem] top-[38rem]"
            src={Cross}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[82%]  w-[5rem] top-[4rem]"
            src={Zero}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[24%]  w-[4rem] top-[38rem]"
            src={Zero}
          />
        </div>

        {/* <Container> */}
        {/* <Logo className="logo" /> */}
        <div className="flex flex-col gap-10 items-center justify-center h-full text-[#486072] font-roboto z-40">
          <div className="flex flex-col gap-4 items-center justify-center h-full font-roboto z-40 text-center">
            <img className=" md:w-[10rem] md:h-[10rem] -mb-10" src={Logo} />
            <p className="text-3xl md:text-5xl font-bold text-black">Coming Soon!</p>
            <div className="flex flex-col gap-1 font-semibold w-11/12 md:w-full">
              <p className="md:text-xl">
                We’re sorry, the section you requested is under construction.
              </p>
              <p className="md:text-xl">Please go back to the home page. </p>
            </div>
              <Link to="/dashboard">
                <Button className="bg-[#1F303C] text-xl uppercase">
                  Go Back to Dashboard
                </Button>
              </Link>
          </div>
        </div>

        {/* </Container> */}
      </div>
    </>
  );
};
export default ComingSoonDashboard;
