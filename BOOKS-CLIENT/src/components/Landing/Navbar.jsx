import logo from "@/assets/images/BooksLogo.svg";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-0 relative top-20 -mt-12 w-screen px-10 py-4 flex items-center justify-between z-50">
      <div className="">
        <img src={logo} className="w-52 h-52" />
      </div>
      <div className="flex gap-10 items-center text-lg font-space-grotesk">
        <NavLink
          className={({ isActive }) => isActive && "underline text-blue-600"}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive && "underline text-blue-600"}
          to="/features"
        >
          Features
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive && "underline text-blue-600"}
          to="/upgrade"
        >
          Upgrade
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive && "underline text-blue-600"}
          to="/who-we-are"
        >
          Who We Are
        </NavLink>
        <NavLink
          className={({ isActive }) => `flex gap-1 ${isActive && "underline text-blue-600"}`}
          to="/login"
        >
            <User />
          Login
        </NavLink>
        <Button className="bg-landing-secondary p-4 text-lg font-extrabold">
          Book a Demo
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
