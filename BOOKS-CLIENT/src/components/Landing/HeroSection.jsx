import logo from "@/assets/images/logo.svg";

const HeroSection = () => {
  return (
    <div className="relative bottom-[7.5rem] md:bottom-[6rem] left-[5%] md:left-[4%] z-20 w-11/12 md:w-[85rem] h-42 md:h-56 border-3 rounded-full bg-white border-landing-primary flex items-center justify-center md:gap-10">
      <img src={logo} className="md:w-[16rem] md:h-[16rem] relative " />
      <p className="w-3/5 text-xs md:text-2xl font-roboto-condensed text-muted py-3">
        Our business model involves running a comprehensive food ordering and
        delivery platform, with restaurant owners leasing our services on a
        monthly prepaid basis. Furthermore, we boost restaurant visibility
        through social media promotion and manage deliveries using our own team
        of riders.
      </p>
    </div>
  );
};

export default HeroSection;
