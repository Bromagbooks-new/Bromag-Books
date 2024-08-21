import logo from "@/assets/images/logo.svg";

const HeroSection = () => {
  return (
    <div className="relative bottom-[7.5rem] md:bottom-[6rem] left-[5%] md:left-[4%] z-20 w-11/12 md:w-[85rem] h-42 md:h-56 border-3 rounded-full bg-white border-landing-primary flex items-center justify-center md:gap-10">
      <img src={logo} className="md:w-[16rem] md:h-[16rem] relative " />
      <p className="w-7/12 text-[10px] md:text-2xl font-roboto-condensed text-muted py-3">
        We provide Restaurant billing software and POS systems that are integral
        to the successful operation of any food service establishment. By
        automating and optimizing various aspects of restaurant management,
        these tools help improve efficiency, accuracy, and overall customer
        satisfaction, ultimately driving business growth and profitability.
      </p>
    </div>
  );
};

export default HeroSection;
