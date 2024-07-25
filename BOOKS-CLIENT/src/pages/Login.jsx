import { useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Wrapper from "../assets/wrappers/LoginStyle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo";
import { LoginIllustration } from "../assets/images";
import { IoPersonSharp, IoEye, IoEyeOff } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { RestaurantAdminApi } from "../config/global";
import Uploading from "../components/loaders/Uploading";

import Vector from "@/assets/images/login/Vector.svg";
import Ellipse from "@/assets/images/login/Ellipse.svg";
import Ellipse1 from "@/assets/images/login/Ellipse 1.svg";
import Star from "@/assets/images/login/Star.svg";
import square1 from "@/assets/images/login/square-1.svg";
import square2 from "@/assets/images/login/square-2.svg";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Login = () => {
  //password hide and show usestate start
  const [show, setShow] = useState(false);
  const [isUploading, setUploading] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };
  //password hide and show usestate end

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    setUploading(true);

    const response = await axios.post(`${RestaurantAdminApi}login`, {
      data: data,
    });
    setUploading(false);

    if (response.data.success) {
      navigate("/email-verification");
    } else if (response.data === "Server Busy") {
      console.log("verify your email id");
    }
  };

  return (
    <>
      {isUploading ? <Uploading isUploading={isUploading} /> : null}
      {/* <Wrapper> */}

      <div className="bg-[#1F303C] h-screen overflow-hidden">
        <div className="relative h-0 hidden md:block">
          <img className="relative z-10 left-[42%] w-[56rem] " src={Vector} />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 right-[0%] w-[28rem] top-[18.8rem] hidden md:block "
            src={Ellipse}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 right-[0%] w-[23rem] top-[23.8rem] hidden md:block "
            src={Ellipse1}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 right-[0%]  w-[17rem] top-[29.8rem] hidden md:block"
            src={Ellipse}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 md:left-[66%]  w-[22rem] top-[27rem]"
            src={square1}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[10%]  w-[13rem] top-[2.8rem] "
            src={square2}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[24%]  w-[3rem] top-[38.8rem] "
            src={Star}
          />
        </div>
        <div className="relative h-0">
          <img
            className="relative z-10 left-[76%]  w-[3rem] top-[6rem] md:top-[16rem]"
            src={Star}
          />
        </div>

        {/* <Container> */}
        {/* <Logo className="logo" /> */}
        <div className="flex items-center justify-center h-full text-white font-roboto z-40">
          <form onSubmit={handleSubmit(handleLoginSubmit)} className="md:w-1/4 flex flex-col gap-4 z-40">
            <p className=" text-white text-5xl font-semibold text-center">
              Login
            </p>
            <p className=" text-gray-500 text-xl text-center">
            ENTER THE DETAILS TO LOGIN
            </p>
            <Separator className="bg-[#0E69AC]" />
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">User Name*</p>
              <Input
                {...register("username", { required: true })}
                type="username"
                id="username"
                placeholder="Enter your username"
                className="text-black"
              />
            </div>
            {errors.username && errors.username.type === "required" && (
              <label>* Please enter the username</label>
            )}
            <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Password*</p>
              <Input
                {...register("password", { required: true })}
                type={show ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                className="text-black"
              />
              {/* <button type="button" className="eye-btn" onClick={handleShow}>
                {show ? <IoEyeOff /> : <IoEye />}
              </button> */}
            </div>
            {errors.password && errors.password.type === "required" && (
              <label>* Please enter the password</label>
            )}
            {/* <Link to="/forgot-password">Forgot password?</Link> */}
            <div>
              <Button type="submit" className="bg-[#56DDE8] w-full rounded-xl p-3 text-xl uppercase text-black">Login</Button>
            </div>
          </form>
        </div>

        {/* </Container> */}
      </div>
      {/* </Wrapper> */}
    </>
  );
};
export default Login;
