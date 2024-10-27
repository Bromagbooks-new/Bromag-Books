import React, { useState } from "react";
import logoDesktop from "@/assets/images/BooksLogo.svg";
import logoMobile from "@/assets/images/BooksLogo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

const Navbar = () => {
  const [showUpgradeList, setShowUpgradeList] = useState(false);
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    setShowUpgradeList(!showUpgradeList);
  };

  const handleUpgradeOptionClick = () => {
    setShowUpgradeList(false);
    navigate("/coming-soon");
  };

  return (
    <nav className="h-0 relative top-20 -mt-12 w-screen pr-4 lg:px-10 py-4 flex items-center justify-between z-50">
      <NavLink
        className={({ isActive }) => isActive && "font-bold text-black"}
        to="/"
      >
        <div>
          <img src={logoDesktop} className="hidden md:block w-20 h-20 md:w-36 md:h-36" alt="Desktop Logo" />
          <img src={logoMobile} className="block md:hidden w-16 h-16 ml-1" alt="Mobile Logo" />
        </div>
      </NavLink>
      <div className="hidden lg:flex gap-10 items-center text-lg font-roboto text-muted">
        <NavLink
          className={({ isActive }) => isActive && "font-bold text-black"}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive && "font-bold text-black"}
          to="/features"
        >
          Features
        </NavLink>
        {/* <div className="relative">
          <button onClick={handleUpgradeClick} className="font-roboto">
            Upgrade
          </button>
          {showUpgradeList && (
            <div className="absolute mt-2 p-2 bg-white shadow-lg rounded">
              <button onClick={handleUpgradeOptionClick}>Option 1</button>
              <button onClick={handleUpgradeOptionClick}>Option 2</button>
              <button onClick={handleUpgradeOptionClick}>Option 3</button>
            </div>
          )}
        </div> */}
        <NavLink
          className={({ isActive }) => isActive && "font-bold text-black"}
          to="/upgrade"
        >
          Upgrade
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive && "font-bold text-black"}
          to="/coming-soon"
        >
          Who We Are
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex gap-1 ${isActive && "font-bold text-black"}`
          }
          to="/book-a-demo"
        >
          Book a Demo
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex gap-1 ${isActive && "underline text-blue-600"}`
          }
          to="/login"
        >
          <Button className="bg-landing-secondary p-4 text-lg font-extrabold">
            <User />
            Login
          </Button>
        </NavLink>
      </div>
      <Drawer>
        <DrawerTrigger className="block lg:hidden">
          <Menu className="w-10 h-10" />
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col p-10 gap-10 items-center text-lg font-space-grotesk">
            <NavLink
              className={({ isActive }) =>
                isActive && "underline text-blue-600"
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive && "underline text-blue-600"
              }
              to="/features"
            >
              Features
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive && "underline text-blue-600"
              }
              to="/upgrade"
            >
              Upgrade
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive && "underline text-blue-600"
              }
              to="/coming-soon"
            >
              Who We Are
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex gap-1 ${isActive && "underline text-blue-600"}`
              }
              to="/login"
            >
              <User />
              Login
            </NavLink>
            <Link to="/book-a-demo">
              <Button className="bg-landing-secondary p-4 text-lg font-extrabold">
                Book a Demo
              </Button>
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default Navbar;
