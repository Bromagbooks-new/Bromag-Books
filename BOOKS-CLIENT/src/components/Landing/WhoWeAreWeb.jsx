import React from "react";
import Navbar from "@/components/Landing/Navbar";
import abrarImage from "@/assets/images/abrar1.png";
import whatwedo from "@/assets/images/Bromag Dashboard Features/whatwedo.svg";
import whatweserve from "@/assets/images/Bromag Dashboard Features/whatweserve.svg";
import ourvision from "@/assets/images/Bromag Dashboard Features/ourvision.svg";
import group212 from "@/assets/images/landing-images/Group 212.svg";
import heroEffect from "@/assets/images/Bromag Dashboard Features/dragondesign.svg";
import subtract from "@/assets/images/landing-images/Subtract.svg";
const WhoWeAreWeb = () => {
    const infoSections = [
        {
            title: "WHAT WE DO",
            img: whatwedo,
            content:
                "We're dedicated to creating intuitive solutions that seamlessly connect customers, restaurant partners, and delivery riders. At Bromag, our mission is to provide tools to secure a well-paced, digital world.",
        },
        {
            title: "WHAT WE SERVE",
            img: whatweserve,
            content:
                "At Bromag, we bring you a suite of AI-powered tools, including tailored products for restaurants, individual food photography, video production services, e-commerce on own domains, and POS billing software. Our delivery network ensures high standards with full-time employees operating Bromag's fleet.",
        },
        {
            title: "OUR VISION",
            img: ourvision,
            content:
                "At Bromag, we envision a digital ecosystem, one that is smoothly integrated. Every step in your experience - from ordering to dining, payments to feedback - is user-friendly and reliable, enriching your engagement. We’re on a mission to simplify the way you experience dining.",
        },
    ];

    return (
        <><Navbar />
            <div className="bg-[#FFFFFF]  min-h-screen">
                {/* Top Section */}

                <div className="relative bg-[#DCFCFF] mt-[10em] w-2 md:w-[100%] h-2 md:h-[28rem] text-center py-16 px-4 md:px-8">
                    <div className="absolute">
                        <img
                            className="relative h-96 w-96 md:h-[43rem] overflow-x-hidden md:w-[50rem] left-[12.5rem]  md:left-[-16rem] top-[3rem] md:top-[-7rem]"
                            src={heroEffect}
                        />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800">WHO WE ARE</h1>
                    <p className="text-sm md:text-xl font-semibold text-gray-600 mt-2 italic">
                        Founder and Director of BROMAG INDIA PRIVATE LIMITED, founded <br></br>on March 10, 2023.
                    </p>
                    {/* <div className="absolute top-[-4rem] left-4 md:left-16">
                        <img src={group212} alt="Decorative Triangle Design" className="w-[8rem] md:w-[12rem]" />
                    </div> */}
                    <div className="absolute top-[0rem] right-4 md:right-[0rem] ">
                        <img src={abrarImage} alt="Founder" className="w-[6rem] h-[6rem] md:w-[25rem] md:h-[30rem]" />
                    </div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[80rem] mx-auto px-4 md:px-0 relative -mt-[5rem] z-10">
                    {infoSections.map((section, index) => (
                        <div
                            key={index}
                            className={`bg-[#FFFFFF] rounded-[1rem] shadow-lg p-6 text-center flex flex-col justify-evenly items-center h-[38rem] mb-20 ${index === 1 ? "mt-4" : ""}`}
                        >
                            <h3 className="text-lg md:text-2xl font-bold">{section.title}</h3>
                            <img
                                src={section.img}
                                alt={section.title}
                                className="w-12 md:w-[6rem] h-auto"
                            />
                            <p className="text-gray-500 text-sm md:text-xl">{section.content}</p>
                        </div>
                    ))}
                </div>



            </div>
        </>
    );
};

export default WhoWeAreWeb;
