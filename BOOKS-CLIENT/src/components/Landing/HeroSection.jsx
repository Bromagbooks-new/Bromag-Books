import logo from "@/assets/images/logo.svg";

const HeroSection = () => {
  return (
    <div className="relative top-[9.5rem] md:top-[12rem] z-20 md:w-[85rem] h-32 md:h-56 border-4 rounded-full bg-white border-landing-primary flex items-center justify-center gap-10">
      <img src={logo} className="md:w-[16rem] md:h-[16rem] relative " />
      <p className="w-2/3 text-xs md:text-2xl font-roboto-condensed text-muted hidden md:block">
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