import React from 'react';
import image from "@/assets/images/Bromag Dashboard Features/image 26.png";
import ellipse545 from '@/assets/images/Bromag Dashboard Features/coloreclipse.svg';

const TestimonialSlider = () => {
    return (
        <div className="flex flex-col items-center bg-[#16252F] min-h-screen font-roboto-condensed pb-40 overflow-hidden relative">
            {/* Background Ellipse */}
            <div className="absolute top-[5rem] right-[20rem] md:right-[5%]">
                <img
                    className="w-[7rem] md:w-auto opacity-70"
                    src={ellipse545}
                    alt="Decorative Ellipse"
                />
            </div>

            {/* Header */}
            <h2 className="text-white p-8 text-center font-sans text-lg font-semibold">
                WORDS FROM OUR COMMUNITY
            </h2>

            {/* Testimonial Card */}
            <div className="relative bg-[#DCFCFF] rounded-lg p-5 text-center w-80 mx-auto">
                <img
                    src={image}
                    alt="User Testimonial"
                    className="w-224 h-254 mx-auto mb-4 object-cover"
                />
                <p className="text-gray-800 text-sm italic mb-6">
                    With Bromag Books, we get instant insights to make smarter decisions. The anti-theft feature gives us peace of mind, and the 24/7 support is unmatched. Highly recommend!
                </p>
                {/* Slider Navigation Buttons */}
                <button className="absolute bottom-4 left-0 bg-gray-700 text-white  left-2 w-10 h-8 rounded-lg flex items-center justify-center text-lg hover:bg-gray-600">
                    ←
                </button>
                <button className="absolute bottom-4 right-0 bg-gray-700 text-white w-10 h-8 rounded-lg flex items-center justify-center text-lg hover:bg-gray-600">
                    →
                </button>

            </div >
        </div >
    );
};

export default TestimonialSlider;
