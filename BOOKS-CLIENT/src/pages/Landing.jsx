//logo import
import Logo from '../components/Logo'
//styled-component import
import Wrapper from '../assets/wrappers/LandingPage'
//react imports
import { Link } from 'react-router-dom'
//bootstap imports
import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import Navbar from '@/components/Landing/Navbar';
import Button from 'react-bootstrap/Button';
//icon imports
import { IoPerson } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
//data imports from utils 
import landingData from '../utils/LandingPageData';
//component imports
//image imports
import { BgVector, LandingImg } from '../assets/images/landing-images';
import Hero from '@/components/Landing/Hero';
import LandingFeatures from '@/components/Landing/LandingFeatures';
import Upgrades from '@/components/Landing/Upgrades';
import Footer from '@/components/Landing/Footer';

const Landing = () => {
    return (
       <div className=''>
            <Navbar />
            <Hero />
            <LandingFeatures />
            <Upgrades />
            <Footer />
       </div>
    )
}
export default Landing