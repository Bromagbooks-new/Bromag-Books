// Imports for logo, styled-components, React, Bootstrap, icons, data, and components
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from '@/components/Landing/Navbar';
import Button from 'react-bootstrap/Button';
import { IoPerson } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import landingData from '../utils/LandingPageData';
import { BgVector, LandingImg } from '../assets/images/landing-images';
import Hero from '@/components/Landing/Hero';
import LandingFeatures from '@/components/Landing/LandingFeatures';
import Upgrades from '@/components/Landing/Upgrades';
import Footer from '@/components/Landing/Footer';
import QueryForm from '@/components/Landing/QueryForm';
import GrowthAcrossIndia from '@/components/Landing/DrivingGrowthAcrossIndia';
import TestimonialSlider from '@/components/Landing/TestimonialSlider';
import GrowthAcrossIndiaWebPage from './GrowthAcrossIndiaWebPage';
import WordsFromOurCommunityWebPage from './WordsFromOurCommunityWebPage';
import { useEffect, useState } from 'react';

const Landing = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check the screen width and set the state
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Mobile breakpoint at 768px
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='w-screen'>
            <Navbar />
            <Hero />
            <LandingFeatures />
            <Upgrades />

            {isMobile ? (
                <>
                    <GrowthAcrossIndia />
                    <TestimonialSlider />
                </>
            ) : (
                <>
                    <GrowthAcrossIndiaWebPage />
                    <WordsFromOurCommunityWebPage />
                </>
            )}

            <Footer />
        </div>
    );
};

export default Landing;
