import React from 'react';
import image1 from '@/assets/images/blackguy.png'
import image2 from '@/assets/images/women.png'
import image3 from '@/assets/images/whiteguy.png'
const WordsFromOurCommunityWebPage = () => {
    return (
        <div className="bg-[#1F303C] min-h-screen text-white flex flex-col items-center justify-center">
            <h2 className="text-[3rem] font-semibold mb-[10rem] text-center">
                Words From Our <span className="text-teal-300">Community</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-8 max-w-8xl mb-[6rem]">
                <div className="bg-[#DCFCFF] max-w-sm mx-auto rounded-3xl p-8 shadow-lg text-center">
                    <div className="w-[12rem] h-[12rem] rounded-full overflow-hidden mx-auto -mt-[8rem] border-4 border-white shadow-lg">
                        <img
                            src={image1}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="mt-8 text-gray-800 font-semibold text-lg italic ">
                        “As our restaurant expanded, we needed software that could handle the increased demand without compromising speed or accuracy. Bromag Resto’s POS & Billing Software has been exactly that. We’ve seen a significant improvement in our operations.”
                    </p>
                </div>
                <div className="bg-[#DCFCFF] max-w-sm mx-auto rounded-3xl p-8 shadow-lg text-center">
                    {/* Profile Image */}
                    <div className="w-[12rem] h-[12rem] rounded-full overflow-hidden mx-auto -mt-[8rem] border-4 border-white shadow-lg">
                        <img
                            src={image2}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className="mt-8 text-gray-800 text-lg italic font-semibold">
                        Switching to Bromag Billing Software has been one of the best decisions for our business. It’s unlock efficiency with complete restaurant management made my experience seamless and enjoyable.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-[#DCFCFF] max-w-sm mx-auto rounded-3xl p-8 shadow-lg text-center z-10">
                    <div className="w-[12rem] h-[12rem] rounded-full overflow-hidden mx-auto -mt-[8rem] border-4 border-white shadow-lg">
                        <img
                            src={image3}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <p className="mt-8 text-gray-800 text-lg italic font-semibold">
                        This simplifies my daily task and saves my time. The software is incredibly user-friendly, making it easy for our staff to take orders and process payments efficiently. Efficient billing at your fingertips.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default WordsFromOurCommunityWebPage;
