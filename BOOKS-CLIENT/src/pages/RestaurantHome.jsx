import logoWhite from '@/assets/images/login/logo_white.svg';
import group from '@/assets/images/login/Group 207.svg';

//backend imports
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RestaurantAdminApi } from "../config/global";
import { toastError } from "../helpers/helpers";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const RestaurantHome = () => {
  const [restaurant, setRestaurant] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [show, setShow] = useState(false);


  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);

    // Redirect based on the selected role
    switch (newRole) {
      case "admin":
        navigate("/admin-login");
        break;
      case "employee":
        navigate("/employee-login");
        break;

      default:
        navigate("/restaurant-home");
        break;
    }
  };

  const token = localStorage.getItem("restaurant");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const axiosConfig = {
    method: "get",
    url: `${RestaurantAdminApi}accessRestaurantHome`,
    headers: headers,
  };

  useEffect(() => {
    const handleHomeAccess = async () => {
      try {
        const response = await axios(axiosConfig);
        if (response.data.success == false) {
          toastError(response.data.message)
          navigate("/login");
        } else {
          console.log(response.data);
          setRestaurant(response.data.restaurantData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (token) {
      handleHomeAccess();
    } else {
      navigate("/login");
    }
  }, []);


  const handleShow = () => {
    setShow(!show);
  };
  //password hide and show usestate end

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


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
 <div className="w-screen h-screen bg-[#1F303C]">
  <div className="w-3/5 h-full rounded-r-[4rem] bg-white" >
  <div className="flex items-center justify-center h-full text-white font-roboto z-40">
          <form onSubmit={handleSubmit(handleLoginSubmit)} className="w-2/4 flex flex-col gap-4 z-40">
          <p className=" text-black text-5xl mb-10 -mt-10 font-semibold text-center">
              Welcome {restaurant.username}
            </p>
            <p className=" text-gray-500 text-4xl font-semibold text-center">
              Login
            </p>
            <p className=" text-[#62BFD4] text-lg text-center">
             Kindly Select one login to continue
            </p>
            <Separator className="bg-[#0E69AC]" />
            <div className="flex flex-col gap-2">
              <p className=" font-semibold text-[#3197AE]">User Name*</p>
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
            <p className=" font-semibold text-[#3197AE]">Password*</p>
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
            <div className='flex justify-center'>
              <Button type="submit" className="bg-[#20303C]  w-2/3 rounded-lg p-3 text-xl uppercase text-white">Login</Button>
            </div>
          </form>
        </div>
  </div>
  <div className="relative h-0">
        <img className="relative z-0 left-[94%] bottom-[42rem]" src={logoWhite} />
      </div>
      <div className="relative h-0">
        <img className="relative z-0 left-[75%] w-[24rem] bottom-[34.5rem]" src={group} />
      </div>
 </div>
  );
};
export default RestaurantHome;
