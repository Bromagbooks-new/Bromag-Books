import React, { useEffect, useState } from "react";
import Navbar from "@/components/Landing/Navbar";
import abrarImage from "@/assets/images/abrarImage.jpg";
import whatwedo from "@/assets/images/Bromag Dashboard Features/whatwedo.svg";
import whatweserve from "@/assets/images/Bromag Dashboard Features/whatweserve.svg";
import ourvision from "@/assets/images/Bromag Dashboard Features/ourvision.svg";
import group212 from "@/assets/images/landing-images/Group 212.svg";
import subtract from "@/assets/images/landing-images/Subtract.svg";
import WhoWeAreWeb from "@/components/Landing/WhoWeAreWeb";

const WhoWeAre = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check the screen width and set the state
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Mobile breakpoint at 768px
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const title = "WHO WE ARE";
    const subtitle =
        "Founder and Director of BROMAG INDIA PRIVATE LIMITED, founded on March 10, 2023.";

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

    if (!isMobile) {
        // Render desktop-specific component
        return <WhoWeAreWeb />;
    }

    // Render mobile-specific component
    return (
        <div className="bg-gradient-to-b from-[#DCFCFF] to-[#1F303C] min-h-screen pb-8">
            <div className="mb-20">
                <Navbar />
            </div>
            <div className="relative h-0">
                <img className="absolute top-[-5rem] right-0 md:top-[-3rem] md:right-8 z-10 w-[15rem] md:w-[30rem] opacity-70" src={subtract} alt="decorative" />
            </div>

            <div className="text-center mb-12 md:mt-[10rem] px-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
                <img
                    src={abrarImage}
                    alt="Founder and Director"
                    className="w-28 h-auto rounded-lg mx-auto shadow-lg mb-4 md:w-[15rem]"
                />
                <p className="italic text-gray-600 text-base md:text-lg">{subtitle}</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-start px-4 md:px-0">
                {infoSections.map((section, index) => (
                    <div
                        key={index}
                        className={`bg-[#DAFAFD] rounded-lg shadow-lg p-4 text-center ${index === 1 ? "mt-4" : ""} `}
                    >
                        <h3 className="text-[6px] md:text-[28px] font-bold mb-2">{section.title}</h3>
                        <img src={section.img} alt="" className="w-8 md:w-[20rem] md:h-[5rem] h-8 mx-auto mb-2" />
                        <p className="text-gray-700 text-[5px] md:text-[25px]">{section.content}</p>
                    </div>
                ))}
            </div>

            <div className="relative h-0">
                <img className="absolute bottom-[-5rem] left-0 md:right-[15%] md:bottom-[10%] z-0 w-[15rem] md:w-[25rem]" src={group212} alt="decorative" />
            </div>
        </div>
    );
};

export default WhoWeAre;
