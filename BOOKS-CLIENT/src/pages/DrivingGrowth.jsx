import React from "react";
import { useNavigate } from "react-router-dom";
import BookADemo from "./BookADemo";
import Navbar from "@/components/Landing/Navbar";
import GrowthAcrossIndia from "@/components/Landing/DrivingGrowthAcrossIndia";

const DrivingGrowthPage = () => {
    // const navigate = useNavigate();

    // const handleUpgradeOptionClick = () => {
    //     navigate("/coming-soon");
    // };

    return (
        <div className="">
            <div >
                <Navbar />
            </div>

            <GrowthAcrossIndia />
            {/* <BookADemo /> */}
        </div>
    );
};

export default DrivingGrowthPage;
