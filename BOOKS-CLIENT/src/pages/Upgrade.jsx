import Upgrades from "@/components/Landing/Upgrades";
import React from "react";
import { useNavigate } from "react-router-dom";
import BookADemo from "./BookADemo";
import Navbar from "@/components/Landing/Navbar";

const Upgrade = () => {
    const navigate = useNavigate();

    const handleUpgradeOptionClick = () => {
        navigate("/coming-soon");
    };

    return (
        <div className="">
            <div style={{ marginBottom: '5rem' }}>
                <Navbar />
            </div>

            <Upgrades />
            <BookADemo />
        </div>
    );
};

export default Upgrade;
