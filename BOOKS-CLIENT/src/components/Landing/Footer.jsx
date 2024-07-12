import logo from '@/assets/images/BooksLogo.svg';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';














const Footer = ()=> {


    return <footer className="border-t-2 mt-20 border-landing-primary font-space-grotesk flex flex-col lg:flex-row p-10 gap-32">
        <div className='flex flex-col lg:flex-row items-center justify-center'>
            <img src={logo} className='-mt-10'/>
            <div className='-ml-12 mt-8 text-center'>
                <p className='font-roboto text-4xl lg:text-[80px] font-semibold uppercase text-landing-primary'>BROMAG BOOKS</p>
                <p className='uppercase lg:text-2xl lg:-mt-5'>Copyrights owned by bromag india private limited.</p>
                <div className='flex gap-2 justify-end pt-4'>
                    <div className='rounded-2xl border-2 border-gray-400 flex items-center justify-center p-2'>
                        <Facebook className='w-8 h-8'/>
                    </div>
                    <div className='rounded-2xl border-2 border-gray-400 flex items-center justify-center p-2'>
                        <Instagram className='w-8 h-8'/>
                    </div>
                    <div className='rounded-2xl border-2 border-gray-400 flex items-center justify-center p-2'>
                        <Twitter className='w-8 h-8'/>
                    </div>
                    <div className='rounded-2xl border-2 border-gray-400 flex items-center justify-center p-2'>
                        <BsWhatsapp  className='w-8 h-8'/>
                    </div>
                    <div className='rounded-2xl border-2 border-gray-400 flex items-center justify-center p-2'>
                        <Youtube className='w-8 h-8'/>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-3 lg:text-xl font-bold text-center'>
            <span className='p-4 rounded-2xl border-3 border-gray-500 uppercase'>
                Terms & Conditions
            </span>
            <span className='rounded-2xl p-4 border-3 border-gray-500 uppercase'>
                Privacy Policy
            </span>
            <span className='rounded-2xl p-4 border-3 border-gray-500 uppercase'>
            © All Right Reserved
            </span>
        </div>
    </footer>
};

export default Footer;