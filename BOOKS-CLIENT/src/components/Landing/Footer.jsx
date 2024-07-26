import logo from "@/assets/images/landing-images/bromag_books_white_BGLESS.png";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

import ellipse546 from "@/assets/images/landing-images/Ellipse 546.svg";
import ellipse544 from '@/assets/images/landing-images/Ellipse 544.svg'
import group216 from "@/assets/images/landing-images/Group 216.svg";

const Footer = () => {
  return (
    <footer
      className="flex flex-col items-center pt-24 gap-12 bg-[#182732] font-roboto-condensed overflow-hidden"
      style={{ background: "linear-gradient(90deg, #0D171E 0%, #0D171E 100%)" }}
    >
      <div className="flex flex-col lg:flex-row md:pl-32 items-center justify-center gap-16 md:gap-32 w-full">
        <div className="flex flex-col md:flex-row items-center">
          <img src={logo} className=" w-48 h-48 z-10" />
          <p className="block text-xl z-20 md:hidden w-4/5 text-center text-gray-500">
            A platform that provides a comprehensive accounting system for
            businesses that are growing
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center md:items-start">
          <p className="text-3xl text-white font-bold">Contact Us</p>
          <ul className="text-gray-500 flex flex-col items-center md:items-start gap-2 text-xl">
            <li className="flex gap-2">
              <Phone />
              <p className="">+91 9150289762</p>
            </li>
            <li className="flex gap-2">
              <Mail />
              <p className="">mag@bromagindia.com</p>
            </li>
            <li className="flex gap-2">
              <MapPin />
              <p className="">Chennai, Tamil Nadu</p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start gap-4">
          <p className="text-3xl text-white font-bold">About Us</p>
          <ul className="text-gray-500 flex flex-col items-center md:items-start gap-2 text-xl">
            <li className="flex gap-2">Who we are</li>
            <li className="flex gap-2">Privacy Policy</li>
            <li className="flex gap-2">Terms and Conditions</li>
          </ul>
        </div>
        <div className="z-10 flex md:block flex-col items-center md:items-start">
          <p className="text-3xl text-white font-bold">Connect Us</p>

          <div className="flex gap-4 md:justify-end pt-4">
            <div className="rounded-full border-2 border-gray-400  text-gray-500 flex items-center justify-center p-2">
              <Instagram className="w-8 h-8" />
            </div>
            <div className="rounded-full border-2 border-gray-400  text-gray-500 flex items-center justify-center p-2">
              <Youtube className="w-8 h-8" />
            </div>
            <div className="rounded-full border-2 border-gray-400  text-gray-500 flex items-center justify-center p-2">
              <BsWhatsapp className="w-8 h-8" />
            </div>
            <div className="rounded-full border-2 border-gray-400  text-gray-500 flex items-center justify-center p-2">
              <Linkedin className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-base">
        Copyrights © Reserved Bromag India Private Limited
      </p>
      <div className="relative h-0 hidden md:block">
        <img
          className="relative z-0 h-[22rem] opacity-60 bottom-[19rem] right-[110%] "
          src={ellipse546}
        />
      </div>
      <div className="relative h-0 block md:hidden">
        <img
          className="relative z-0 h-[20rem]  bottom-[70rem] right-[90%] "
          src={ellipse544}
        />
      </div>
      <div className="relative h-0">
        <img
          className="relative z-0 h-[20rem] md:h-[28rem] opacity-60 bottom-[23.5rem] rotate-90 md:rotate-0 transform -scale-y-100 md:scale-y-100 md:bottom-[28rem] left-[11%] md:left-[55%] "
          src={group216}
        />
      </div>
    </footer>
  );
};

export default Footer;
