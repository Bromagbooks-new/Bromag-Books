import Upgrades from "@/components/Landing/Upgrades";
import React from "react";
import { useNavigate } from "react-router-dom";

const Upgrade = () => {
    const navigate = useNavigate();

    const handleUpgradeOptionClick = () => {
        navigate("/coming-soon");
    };

    return (
        <div className="">
            <Upgrades />
        </div>
    );
};

export default Upgrade;
