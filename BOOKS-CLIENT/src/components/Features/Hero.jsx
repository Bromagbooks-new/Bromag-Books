// import landingHero from "@/assets/images/landing-images/landing-hero.png";
import { Button } from "../ui/button";

const Hero = ({img}) => {
  return (
    <>
      <div
        className="h-[35rem] md:h-[36rem] bg-center bg-cover bg-custom-gradient"
      >
        <div className="w-full h-full bg-white opacity-45"></div>
      </div>
      <div className="relative bottom-[30rem] text-[#1D5798] font-bold text-center flex flex-col lg:flex-row justify-between items-center lg:px-24 font-roboto">
        <div>
          <img src={img} className="w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem]" />
        </div>
        <div className="flex flex-col items-center gap-3">

        <p className="uppercase text-2xl lg:text-3xl ">
          Experience outstanding efficiency and growth with{" "}
        </p>
        <p className="text-5xl md:text-8xl lg:text-8xl uppercase">BromagBooks</p>
        <p className="uppercase text-4xl lg:text-[32px] font-space-grotesk">Restaurant POS and billing SOFTWARE</p>
        <Button className="bg-landing-secondary w-52 p-6 text-2xl font-space-grotesk">Get Started</Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
