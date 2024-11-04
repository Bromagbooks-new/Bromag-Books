import React from "react";
import Navbar from "@/components/Landing/Navbar";
import InfoBox from "@/components/Landing/InfoBox";
import abrarImage from "@/assets/images/abrarImage.jpg";

const WhoWeAre = () => {
    const title = "Who We Are";
    const content = (
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <img
                    src={abrarImage}
                    alt="Founder and Director"
                    style={{ maxWidth: '40%', height: 'auto' }}
                />
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem', fontSize: '1.1rem' }}>
                <strong>Founder and Director of BROMAG INDIA PRIVATE LIMITED, founded on March 10, 2023.</strong>
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                Officially launched on March 10, 2023, we at Bromag technology platform seamlessly connect customers, restaurant partners, and delivery riders to fulfill their diverse needs. Customers rely on our platform to easily search for and order food from individual restaurants, read and contribute reviews, arrange for food delivery, reserve tables, and make secure payments while dining out.
                <br /><br />
                We empower restaurant partners with industry-specific solutions tailored to their requirements, including customized packaging solutions, professional food photography services, video production, and an e-commerce platform on their own domain. Additionally, we provide individual Android and iOS apps, and POS billing software to enhance customer engagement and ensure reliable last-mile delivery.
                <br /><br />
                Our dedicated delivery riders operate with our own vehicles as full-time employees, ensuring a quality experience for our customers.
            </p>
        </div>
    );

    return (
        <div>
            <div style={{ marginBottom: "5rem" }}>
                <Navbar />
            </div>
            <InfoBox title={title} content={content} />
        </div>
    );
};

export default WhoWeAre;
