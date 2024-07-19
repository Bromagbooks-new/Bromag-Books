import Vector from "@/assets/images/login/Vector.svg";
import Ellipse from "@/assets/images/login/Ellipse.svg";
import Ellipse1 from "@/assets/images/login/Ellipse 1.svg";
import Star from "@/assets/images/login/Star.svg";
import square1 from "@/assets/images/login/square-1.svg";
import square2 from "@/assets/images/login/square-2.svg";
import verify from '@/assets/images/login/verify.gif';

import {Button} from '@/components/ui/button';
import { Link } from "react-router-dom";


const EmailVerification = () => {
    return (
        <div className="bg-[#1F303C] h-screen">
        <div className="relative h-0">
          <img className="relative z-10 left-[42%] w-[56rem] " src={Vector} />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 right-[0%] w-[28rem] top-[18.8rem] "
            src={Ellipse}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 right-[0%] w-[23rem] top-[23.8rem] "
            src={Ellipse1}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 right-[0%]  w-[17rem] top-[29.8rem]"
            src={Ellipse}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[66%]  w-[22rem] top-[27rem]"
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
        <div className="flex flex-col gap-10 items-center justify-center h-full text-white font-roboto z-40">
          <img src={verify} className="w-56 h-56" />
        <p className="text-xl text-white">We have sent an Email link to you, kindly check your Email to login.</p>
        <Link to="/admin-login" className="z-40">

        <Button className="bg-[#56DDE8] w-80 p-4 text-xl uppercase text-black z-40">Login</Button>
        </Link>
        </div>

        {/* </Container> */}
      </div>
    )
}
export default EmailVerification