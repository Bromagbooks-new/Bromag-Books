import React from 'react';
import stars from '@/assets/images/Bromag Dashboard Features/stars.svg';
import transactionIcon from '@/assets/images/Bromag Dashboard Features/transaction.svg';
import salesIcon from '@/assets/images/Bromag Dashboard Features/salesIcon.svg';
import rupessExchange from '@/assets/images/Bromag Dashboard Features/rupessExchange.svg';
import restaurantIcon from '@/assets/images/Bromag Dashboard Features/restaurantIcon.svg';
import rectangle from '@/assets/images/Bromag Dashboard Features/Rectangle 164.svg';
import downstars from '@/assets/images/Bromag Dashboard Features/downstars.svg';
import ring from '@/assets/images/Bromag Dashboard Features/ring.svg';
import ellipse542 from '@/assets/images/landing-images/Ellipse 542.svg'
const GrowthAcrossIndia = () => {
    return (
        <div className="bg-[#16252F] min-h-screen py-10 px-4 flex items-center justify-center">
            <div
                className="bg-cover bg-center p-6 md:p-10 rounded-lg max-w-lg md:max-w-2xl mx-auto"
            >
                <div className="relative h-0 ">
                    <img className="relative z-0 w-[18rem] md:w-auto  left-[28%] md:left-[70%] top-[5rem] md:top-[10rem]" src={ellipse542} />
                </div>
                <h2 className="text-white text-center text-xl md:text-2xl font-bold mb-20 md:mb-8">
                    DRIVING GROWTH ACROSS INDIA
                </h2>

                <div className="relative h-0">
                    <img
                        className="absolute z-10 w-[8rem] md:w-[10rem] top-[-5rem] md:top-[-3rem] right-[70%] md:right-[80%] opacity-70"
                        src={stars}
                        alt="Stars Background"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-6 bg-[#D2FCFF] p-10 rounded-lg relative">
                    <img
                        src={ring}
                        alt="Ring Background"
                        className="absolute w-[12rem] md:w-[7rem] top-5 left-[3%] md:left-[80%] bottom-[9rem] md:bottom-[6rem] opacity-30 pointer-events-none z-0"
                    />
                    <img
                        src={ring}
                        alt="Ring Background"
                        className="absolute w-[6rem] md:w-[10rem] top-0 right-[0%] md:right-[70%] bottom-[8rem] md:bottom-[6rem] opacity-30 pointer-events-none z-0"
                    />
                    <img
                        src={ring}
                        alt="Ring Background"
                        className="absolute w-[5rem] md:w-[7rem] bottom-2 left-[0%] md:left-[80%]  md:bottom-[6rem] opacity-30 pointer-events-none z-0"
                    />
                    <img
                        src={ring}
                        alt="Ring Background"
                        className="absolute w-[5rem] md:w-[7rem] bottom-0 right-[0%] md:right-[80%]  md:bottom-[6rem] opacity-30 pointer-events-none z-0"
                    />

                    {/* Transaction Processed Per Year */}
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center shadow-md z-10 relative">
                        <img src={transactionIcon} alt="Transaction Icon" className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-4" />
                        <h3 className="text-xl md:text-2xl font-semibold text-black">1,800,000 +</h3>
                        <p className="text-gray-600 text-xs md:text-sm">Transaction Processed Per Year</p>
                    </div>

                    {/* Transaction Processed Per Month */}
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center shadow-md z-10 relative">
                        <img src={rupessExchange} alt="Transaction Icon" className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-4" />
                        <h3 className="text-xl md:text-2xl font-semibold text-black">150,000 +</h3>
                        <p className="text-gray-600 text-xs md:text-sm">Transaction Processed Per Month</p>
                    </div>

                    {/* Restaurants */}
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center shadow-md z-10 relative">
                        <img src={restaurantIcon} alt="Restaurant Icon" className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-4" />
                        <h3 className="text-xl md:text-2xl font-semibold text-black">50 +</h3>
                        <p className="text-gray-600 text-xs md:text-sm">Restaurant</p>
                    </div>

                    {/* Sales & Service Professionals */}
                    <div className="bg-white p-4 md:p-6 rounded-lg text-center shadow-md z-10 relative">
                        <img src={salesIcon} alt="Professional Icon" className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-4" />
                        <h3 className="text-xl md:text-2xl font-semibold text-black">10 +</h3>
                        <p className="text-gray-600 text-xs md:text-sm">Sales & Service Professionals</p>
                    </div>
                </div>

                <div className="relative h-0 ">
                    <img className="relative z-1 w-[10rem] md:w-[7rem] left-[60%] md:left-[85%] bottom-[9rem] md:bottom-[6rem]" src={downstars} alt="Stars at the bottom" />
                </div>
            </div>
        </div>
    );
};

export default GrowthAcrossIndia;