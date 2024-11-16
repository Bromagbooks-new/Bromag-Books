// CardsGrowth.js
import React from "react";

const CardsGrowth = ({ icon, number, label }) => {
    return (
        <div className="flex flex-col items-center bg-white rounded-[2rem] z-10 shadow-lg p-6 w-[16rem] h-[24rem]">
            <img src={icon} alt="" className="w-35 h-25 mb-5 mt-5" />
            <div className="text-3xl font-bold text-gray-800 mb-2">{number} +</div>
            <div className="text-gray-800 text-[20px] text-center">{label}</div>
        </div>
    );
};

export default CardsGrowth;
