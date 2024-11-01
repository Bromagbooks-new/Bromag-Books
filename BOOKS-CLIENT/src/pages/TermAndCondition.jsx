import React from "react";
// Ensure the path is correct
import Navbar from "@/components/Landing/Navbar";
import InfoBox from "@/components/Landing/InfoBox";

const TermAndCondition = () => {
    const title = "Terms and Conditions"; // Corrected the title casing
    const content = `
        The content of this document is considered an electronic record as per the Information Technology Act, 2000, and relevant rules. 
        It also incorporates the modified provisions concerning electronic records found in various statutes, as amended by the Information Technology Act, 2000. 
        This document has been made available in compliance with Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011, 
        which mandates the publication of rules, regulations, privacy policy, and Terms of Use for accessing or using the Bromag Books restaurant billing software 
        and the Bromag Books POS application on mobile and handheld devices.

        Use of the Bromag Books website, www.bromagbooks.com, and Bromag Books mobile application is subject to these Terms of Use. 
        The combined reference to the website and app is the Platform. Before utilizing our services, please review these Terms of Use carefully. 
        If you do not agree to these terms, you are not permitted to use the services available on the Platform, and we kindly request you to uninstall the app. 
        By installing, downloading, or using the Platform, you are entering into a contractual agreement with Bromag India, signifying your acceptance of these Terms of Use 
        and other policies, including the Cancellation & Refund Policy, Privacy Policy, and Take Down Policy, as posted on the Platform and subject to periodic amendments. 
        This agreement becomes legally binding on the date you download, install, or use the Platform.

        The Platform is owned and operated by Bromag India Private Limited, with a registered office at No 01, First Floor, Alagammal Nagar Fourth Street, Nerkundram, 
        Maduravoyal, Chennai-600107, Tamil Nadu, India. In these Terms of Use, “you” or “user” refers to any natural or legal person engaging with the Platform 
        by providing registration data while registering as a user. The terms Bromag Books, “we,” “us,” or “our” specifically denote Bromag India Private Limited.

        Bromag Books provides a Platform that enables restaurants to efficiently manage billing, inventory, employee roles, and other operational functions 
        through licensed access to our billing software and POS systems. Restaurants (Clients) can utilize Bromag Books to streamline various functionalities, 
        including (a) managing orders and payments, (b) processing bills and receipts, (c) creating roles for employees, and (d) performing other critical operational tasks. 
        Bromag Books further enables Clients to assign specific functionalities to employees based on their roles, such as inventory management, order processing, 
        and customer billing.

        Bromag Books offers ongoing technical support and software updates, helping Clients to ensure seamless integration with restaurant operations. 
        Our services encompass both Platform Services, including the management of licenses and employee roles within restaurants, 
        and POS Services, ensuring accurate billing and financial reporting through POS terminals. Bromag India acts as an intermediary, providing software and POS services 
        to enhance the efficiency of restaurant operations.

        Users of the Bromag Books Platform (Clients) will be charged a service fee for platform access, billing features, and POS functionalities. 
        This fee, inclusive of applicable taxes unless otherwise specified, is determined based on factors such as the number of software licenses, 
        scope of POS features, number of registered employees, and additional functionalities requested by Clients, which may vary as determined by Bromag India.
    `;

    return (
        <div className="relative">
            <div style={{ marginBottom: '5rem' }}>
                <Navbar />
            </div>

            <InfoBox title={title} content={content} />
        </div>
    );
};

export default TermAndCondition;
