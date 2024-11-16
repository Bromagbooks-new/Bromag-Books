import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookADemo from "./BookADemo";
import Navbar from "@/components/Landing/Navbar";
import TestimonialSlider from "@/components/Landing/TestimonialSlider";
import logoDesktop from "@/assets/images/BooksLogo.svg";
import logoMobile from "@/assets/images/BooksLogo.png";
import whitelogo from "@/assets/images/whitelogo.svg";
import WordsFromOurCommunityWebPage from "./WordsFromOurCommunityWebPage";
const WordFromCommunityPage = () => {
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
        <div className="" style={{ backgroundColor: "#1F303C" }} >
            <div style={{ backgroundColor: "#1F303C", marginBottom: '5rem' }}>
                <Navbar />
            </div>
            {isMobile ? (
                <TestimonialSlider />
            ) : (
                <WordsFromOurCommunityWebPage />
            )}

            {/* <BookADemo /> */}
        </div>
    );
};

export default WordFromCommunityPage;
