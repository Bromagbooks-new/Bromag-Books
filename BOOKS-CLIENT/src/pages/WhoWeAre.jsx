import Upgrades from "@/components/Landing/Upgrades";
import React from "react";
import { useNavigate } from "react-router-dom";
import BookADemo from "./BookADemo";
import Navbar from "@/components/Landing/Navbar";
import InfoBox from "@/components/Landing/InfoBox";

const WhoWeAre = () => {

    const title = "Who We Are";
    const content = "Officially launched in the Month of March 10 2023, we as Bromag technology platform seamlessly connects customers, restaurant partners, and delivery riders to fulfill their diverse needs. Customers rely on our platform to easily search for and order food from individual restaurants, read and contribute reviews, arrange for food delivery, reserve tables, and make secure payments while dining out. On the other hand, we empower restaurant partners with industry-specific solutions tailored to their requirements. These include customized packaging solutions for their dishes, professional food photography services, content video production for their establishments, and an e-commerce platform hosted on their own domain name. Additionally, we provide them with individual Android and iOS apps, as well as POS billing software, to enhance customer engagement and acquisition, while ensuring a reliable and efficient last-mile delivery service. Furthermore, we offer a comprehensive procurement solution, delivering high-quality tender chicken products to our restaurant partners. Lastly, our dedicated delivery riders operate with our own vehicles as full-time employees."
    return (
        <div className="">
            <div style={{ marginBottom: '5rem' }}>
                <Navbar />
            </div>

            <InfoBox title={title} content={content} />
        </div>
    );
};

export default WhoWeAre;
