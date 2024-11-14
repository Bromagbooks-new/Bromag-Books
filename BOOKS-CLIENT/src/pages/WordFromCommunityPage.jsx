import React from "react";
import { useNavigate } from "react-router-dom";
import BookADemo from "./BookADemo";
import Navbar from "@/components/Landing/Navbar";
import TestimonialSlider from "@/components/Landing/TestimonialSlider";

const WordFromCommunityPage = () => {
    // const navigate = useNavigate();

    // const handleUpgradeOptionClick = () => {
    //     navigate("/coming-soon");
    // };

    return (
        <div className="" style={{ backgroundColor: "#16252F" }} >
            <div style={{ backgroundColor: "#16252F", marginBottom: '5rem' }}>
                <Navbar />
            </div>

            <TestimonialSlider />
            {/* <BookADemo /> */}
        </div>
    );
};

export default WordFromCommunityPage;
