import React from "react";
import Navbar from "@/components/Landing/Navbar";
import abrarImage from "@/assets/images/abrarImage.jpg";
import whatwedo from "@/assets/images/Bromag Dashboard Features/whatwedo.svg";
import whatweserve from "@/assets/images/Bromag Dashboard Features/whatweserve.svg";
import ourvision from "@/assets/images/Bromag Dashboard Features/ourvision.svg";
import group212 from '@/assets/images/landing-images/Group 212.svg';

const WhoWeAre = () => {
    const title = "WHO WE ARE";
    const subtitle = "Founder and Director of BROMAG INDIA PRIVATE LIMITED, founded on March 10, 2023.";

    const infoSections = [
        {
            title: "WHAT WE DO",
            img: whatwedo,
            content: "We're dedicated to creating intuitive solutions that seamlessly connect customers, restaurant partners, and delivery riders. At Bromag, our mission is to provide tools to secure a well-paced, digital world."
        },
        {
            title: "WHAT WE SERVE",
            img: whatweserve,
            content: "At Bromag, we bring you a suite of AI-powered tools, including tailored products for restaurants, individual food photography, video production services, e-commerce on own domains, and POS billing software. Our delivery network ensures high standards with full-time employees operating Bromag's fleet."
        },
        {
            title: "OUR VISION",
            img: ourvision,
            content: "At Bromag, we envision a digital ecosystem, one that is smoothly integrated. Every step in your experience - from ordering to dining, payments to feedback - is user-friendly and reliable, enriching your engagement. We’re on a mission to simplify the way you experience dining."
        }
    ];

    return (
        <div className="bg-gradient-to-b from-[#DCFCFF] to-[#1F303C] pb-8">
            <div className="mb-20">
                <Navbar />
            </div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <img
                    src={abrarImage}
                    alt="Founder and Director"
                    className="w-36 h-auto rounded-lg mx-auto shadow-lg mb-4"
                />
                <p className="italic text-gray-600 text-lg">{subtitle}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {infoSections.map((section, index) => (
                    <div
                        key={index}
                        className="w-32 bg-[#DAFAFD] rounded-lg shadow-lg p-2 text-center shadow-lg"
                    >
                        <h3 className="text-xs font-bold mb-1">{section.title}</h3>
                        <img src={section.img} alt="" className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-gray-700 text-xs">{section.content}</p>
                    </div>
                ))}
            </div>

            <div className="relative h-0 ">
                <img className="relative z-0 w-[20rem] md:w-auto right-[16%] md:right-[21%] bottom-[13rem] md:bottom-[43rem]" src={group212} />
            </div>
        </div>
    );
};

export default WhoWeAre;
