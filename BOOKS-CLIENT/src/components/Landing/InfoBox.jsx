import React from "react";
import ellipse545 from '@/assets/images/landing-images/Ellipse 545.svg';
import ellipse544 from '@/assets/images/landing-images/Ellipse 544.svg';
import subtract from '@/assets/images/landing-images/Subtract.svg';

const InfoBox = ({ title, content }) => {
    return (
        <div className="-mt-[10rem] md:-mt-20 flex flex-col items-center bg-[#1F303C] font-roboto-condensed overflow-hidden relative">
            {/* Background Images */}
            <div className="relative h-0 ">
                <img className="relative z-10 w-[23rem] md:w-auto top-[1rem] left-[8%] md:left-[20%] opacity-50" src={subtract} alt="Background subtract" />
            </div>
            <div className="relative h-0">
                <img className="relative z-0 w-[9rem] md:w-auto left-[70%] md:left-[100%] top-[10rem] md:top-10" src={ellipse545} alt="Ellipse 545" />
            </div>
            <div className="relative h-0">
                <img className="relative z-10 w-[20rem] md:w-auto right-[11rem] md:right-[33rem] top-32 md:top-20" src={ellipse544} alt="Ellipse 544" />
            </div>

            {/* Centered White Box */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-20 text-center z-20">
                <h2 className="text-3xl font-bold mb-4 pt-5">{title}</h2>
                <div className="text-lg text-gray-700">{content}</div>
            </div>
        </div>
    );
};

export default InfoBox;
