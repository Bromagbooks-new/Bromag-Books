import landingHero from "@/assets/images/landing-images/landing-hero.png";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <>
      <div
        className="h-[42rem] bg-center bg-cover"
        style={{ backgroundImage: `url("${landingHero}")` }}
      >
        <div className="w-full h-full bg-white opacity-45"></div>
      </div>
      <div className="relative bottom-[30rem] text-[#1D5798] font-bold text-center flex flex-col items-center gap-4 font-roboto">
        <p className="uppercase text-4xl ">
          Experience outstanding efficiency and growth with{" "}
        </p>
        <p className="text-9xl uppercase">BromagBooks</p>
        <p className="uppercase text-[42px] font-space-grotesk">Restaurant POS and billing SOFTWARE</p>
        <Button className="bg-landing-secondary w-52 p-6 text-2xl font-space-grotesk">Get Started</Button>
      </div>
    </>
  );
};

export default Hero;
