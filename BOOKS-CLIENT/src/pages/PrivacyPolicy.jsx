import Upgrades from "@/components/Landing/Upgrades";
import React from "react";
import BookADemo from "./BookADemo";
import Navbar from "@/components/Landing/Navbar";

const PrivacyPolicy = () => {
    const title = "Privacy Policy";
    const content = ""

    return (
        <div className="dd">
            <div style={{ marginBottom: '5rem' }}>
                <Navbar />
            </div>

            <InfoBox title={title} content={content} />
        </div>
    );
};

export default PrivacyPolicy;
