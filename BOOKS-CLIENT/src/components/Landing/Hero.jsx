import landingHero from "@/assets/images/landing-images/HeroBackground.png";
import heroEffect from '@/assets/images/landing-images/HeroEffect.svg';
import { Button } from "../ui/button";
import HeroSection from "./HeroSection";

const Hero = () => {
  return (
    <>
      <div
        className="h-[40rem] md:h-[55rem] bg-center bg-cover flex md:block justify-center items-center"
        style={{ backgroundImage: `url("${landingHero}")` }}
      >
        <div className="hidden md:block  relative ">
          <img className="md:relative h-[50rem] w-[50rem] left-[47%] top-[9rem]" src={heroEffect} />
        </div>
        {/* <div className="w-full h-full bg-white opacity-45"></div> */}
      </div>
      <div className="relative bottom-[30rem] md:bottom-[36rem] font-bold md:w-[60%] h-0 p-10 md:p-0 md:pl-20 flex flex-col gap-4 font-roboto">

        <p className="font-bold text-black text-5xl md:text-8xl lg:text-8xl uppercase font-roboto-condensed">Bromag <span className="text-landing-primary">BOOKS</span></p>
        <p className="uppercase text-2xl lg:text-xl text-gray-500 font-li">A platform that provides a comprehensive accounting system for businesses that are growing</p>
        <Button className="bg-landing-secondary w-52 p-6 text-2xl font-space-grotesk">Explore Now</Button>
      <HeroSection />
      </div>
    </>
  );
};

export default Hero;
