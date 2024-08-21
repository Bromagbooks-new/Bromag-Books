import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";











const LandingLayout = ()=> {



    return<div>
        <Navbar />
        <Outlet />
        <footer>
            
        </footer>
    </div> 

};


export default LandingLayout;