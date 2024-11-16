import React from "react";
import transactionIcon from "@/assets/images/Bromag Dashboard Features/transaction.svg";
import salesIcon from "@/assets/images/Bromag Dashboard Features/salesIcon.svg";
import rupessExchange from "@/assets/images/Bromag Dashboard Features/rupessExchange.svg";
import restaurantIcon from "@/assets/images/Bromag Dashboard Features/restaurantIcon.svg";
import CardsGrowth from "@/components/Landing/CardsGrowth";
import stars from '@/assets/images/Bromag Dashboard Features/stars.svg';
import downstars from '@/assets/images/Bromag Dashboard Features/downstars.svg';
import leftring from '@/assets/images/Bromag Dashboard Features/leftring.svg';
import rightring from '@/assets/images/Bromag Dashboard Features/rightring.svg';
import ellipse546 from '@/assets/images/Bromag Dashboard Features/eclipse546.svg';

const GrowthAcrossIndiaWebPage = () => {
    return (
        <div className="bg-[#1F303C] min-h-screen p-8 relative">
            <h2 className="text-white text-center text-xl md:text-4xl font-bold mb-8 mt-20">
                DRIVING GROWTH ACROSS INDIA
            </h2>

            {/* Stars at the top */}
            <div className="relative h-0">
                <img
                    className="absolute z-0 w-[8rem] md:w-[15rem] top-[-5rem] md:top-[-2rem] right-[10%] md:right-[82%] opacity-100"
                    src={stars}
                    alt="Stars Background"
                />
            </div>

            <div className="flex justify-center relative">
                <div className="flex justify-center bg-[#D2FCFF] p-12 md:p-16 md:m-10 w-full max-w-[1400px] rounded-tl-[4rem] rounded-lg relative flex-wrap gap-20 z-10">
                    <img
                        src={leftring}
                        alt="Left Ring Background"
                        className="absolute w-[5rem] md:w-[10rem] top-0 right-[10%] md:right-[0rem] opacity-35 pointer-events-none z-0"
                    />
                    <img
                        src={rightring}
                        alt="Right Ring Background"
                        className="absolute w-[5rem] md:w-[25rem] bottom-0 md:bottom-[20%] right-[10%] md:right-[65%] opacity-20 pointer-events-none z-1"
                    />
                    <CardsGrowth icon={transactionIcon} number="1,800,000" label="Transactions Processed Per Year" />
                    <CardsGrowth icon={salesIcon} number="150,000" label="Transactions Processed Per Month" />
                    <CardsGrowth icon={restaurantIcon} number="50" label="Restaurants" />
                    <CardsGrowth icon={rupessExchange} number="10" label="Sales & Service Professionals" />
                </div>
            </div>
            <div className="relative h-0">
                <img
                    className="absolute z-9 w-[10rem] md:w-[30rem] right-0 top-[5rem] md:top-[-30rem]"
                    src={ellipse546}
                    alt="Ellipse Background"
                />
            </div>
            <div className="relative h-0">
                <img
                    className="relative z-10 w-[10rem] md:w-[15rem] left-[60%] md:left-[83%] bottom-[9rem] md:bottom-[12rem]"
                    src={downstars}
                    alt="Stars at the bottom"
                />
            </div>
        </div>
    );
};

export default GrowthAcrossIndiaWebPage;
