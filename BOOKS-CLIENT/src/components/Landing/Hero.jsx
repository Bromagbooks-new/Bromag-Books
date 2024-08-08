import landingHero from "@/assets/images/landing-images/HeroBackground.png";
import heroEffect from "@/assets/images/landing-images/Group (1).svg";
import { Button } from "../ui/button";
import HeroSection from "./HeroSection";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div
        className="h-[32rem] md:h-[55rem] bg-center bg-cover flex md:block justify-center items-center overflow-hidden"
        style={{ backgroundImage: `url("${landingHero}")` }}
      >
        <div className="  relative ">
          <img
            className="relative h-96 w-96 md:h-[50rem] overflow-x-hidden md:w-[50rem] left-[12.5rem]  md:left-[47%] top-[3rem] md:top-[9rem]"
            src={heroEffect}
          />
        </div>
        {/* <div className="w-full h-full bg-white opacity-45"></div> */}
      </div>
      <div className="relative bottom-[23rem] md:bottom-[36rem] font-bold md:w-[60%] h-0 py-10 md:p-0 pl-4 md:pl-20 flex flex-col gap-2 md:gap-4 font-roboto">
        <p className="font-bold text-black text-5xl md:text-8xl lg:text-8xl font-roboto-condensed tracking-tighter">
          BROMAG <span className="text-landing-primary">BOOKS</span>
        </p>
        <p className="w-4/5 md:w-auto text-base/5 lg:text-3xl  text-gray-500 font-normal font-roboto ">
          A platform that provides a comprehensive accounting system for
          businesses that are growing
        </p>
        <Link to="#features">
          <Button className="bg-landing-secondary w-28 md:h-14 md:w-52 p-3 md:p-6 md:text-2xl">
            Explore Now
          </Button>
        </Link>
      </div>
      <HeroSection />
    </>
  );
};

export default Hero;
