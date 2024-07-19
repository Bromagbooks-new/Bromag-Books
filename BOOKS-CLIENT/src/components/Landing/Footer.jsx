import logo from '@/assets/images/landing-images/bromag_books_white_BGLESS.png';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';

import ellipse546 from '@/assets/images/landing-images/Ellipse 546.svg';
import group216 from '@/assets/images/landing-images/Group 216.svg';












const Footer = ()=> {


    return <footer className="flex flex-col items-center pt-24 gap-12 bg-[#182732]" style={{ background: "linear-gradient(90deg, #0D171E 0%, #0D171E 100%)" }}>
        <div className='flex flex-col lg:flex-row justify-center gap-32 w-full'>
            <div className='flex items-center'>
            <img src={logo} className=' w-48 h-48 z-10'/>

            </div>
            <div className='flex flex-col gap-4'>
                <p className='text-3xl text-white font-bold'>Contact Us</p>
                <ul className='text-gray-500 flex flex-col gap-2 text-xl'>
                    <li className='flex gap-2'>
                        <Phone />
                        <p className=''>+91 9150289762</p>
                    </li>
                    <li className='flex gap-2'>
                        <Mail />
                        <p className=''>mag@bromagindia.com</p>
                    </li>
                    <li className='flex gap-2'>
                        <MapPin />
                        <p className=''>Velachery, Chennai</p>
                    </li>
                </ul>
            </div>
            <div className='flex flex-col gap-4'>
                <p className='text-3xl text-white font-bold'>About Us</p>
                <ul className='text-gray-500 flex flex-col gap-2 text-xl'>
                    <li className='flex gap-2'>
                        
                        Who we are
                    </li>
                    <li className='flex gap-2'>
                        
                        Privacy Policy
                    </li>
                    <li className='flex gap-2'>
                        
                        Terms and Conditions
                    </li>
                </ul>
            </div>
            <div className='z-10 '>
                < p className='text-3xl text-white font-bold'>Connect Us</p>
                
                <div className='flex gap-4 justify-end pt-4'>
                   
                    <div className='rounded-full border-2 border-gray-400  text-gray-500 flex items-center justify-center p-2'>
                        <Instagram className='w-8 h-8'/>
                    </div>
                    <div className='rounded-full border-2 border-gray-400  text-gray-500 flex items-center justify-center p-2'>
                        <Youtube className='w-8 h-8'/>
                    </div>
                    <div className='rounded-full border-2 border-gray-400  text-gray-500 flex items-center justify-center p-2'>
                        <BsWhatsapp  className='w-8 h-8'/>
                    </div>
                    <div className='rounded-full border-2 border-gray-400  text-gray-500 flex items-center justify-center p-2'>
                        <Linkedin className='w-8 h-8'/>
                    </div>
                </div>
            </div>
        </div>
            <p className='text-gray-500 text-xl'>Copyrights reserved Bromag india PVT LTD</p>
            <div className="relative h-0">
        <img className="relative z-0 h-[22rem] opacity-60 bottom-[19rem] right-[110%]" src={ellipse546} />
      </div>
            <div className="relative h-0">
        <img className="relative z-0 h-[28rem] opacity-60 bottom-[28rem] left-[55%]" src={group216} />
      </div>
        
    </footer>
};

export default Footer;