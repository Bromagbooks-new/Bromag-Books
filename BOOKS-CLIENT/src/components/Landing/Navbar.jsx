

import logo from '@/assets/images/logo-bb.png';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';



const Navbar = ()=> {


    return <nav className="fixed top-0 w-screen px-20 py-4 flex items-center justify-between z-50">
        <div className="">
            <img src={logo} className='w-30 h-30' />
        </div>
        <div className='flex gap-10 items-center font-bold'>
            <Link to="/">Home</Link>
            <Link to="#">Features</Link>
            <Link to="#">Upgrade</Link>
            <Link to="#">Who We Are</Link>
            <Link to="/login">Login</Link>
            <Button className="bg-blue-950 font-extrabold">Book a Demo</Button>
        </div>
    </nav>
};


export default Navbar;