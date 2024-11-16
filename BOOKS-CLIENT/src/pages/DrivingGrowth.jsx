import React, { useState, useEffect } from "react";
import Navbar from "@/components/Landing/Navbar";
import GrowthAcrossIndia from "@/components/Landing/DrivingGrowthAcrossIndia";

import WhoWeAre from "./WhoWeAre";
import GrowthAcrossIndiaWebPage from "./GrowthAcrossIndiaWebPage";

const DrivingGrowthPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check the screen width and set the state
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);  // Mobile breakpoint at 768px
        };

        handleResize();  // Initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="">
            <Navbar />
            {isMobile ? (
                <GrowthAcrossIndia />
            ) : (
                <GrowthAcrossIndiaWebPage />
            )}
            {/* You can optionally include <BookADemo /> here if needed */}
        </div>
    );
};

export default DrivingGrowthPage;
