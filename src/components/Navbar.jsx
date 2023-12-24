import React from "react";
import useScrollDirection from "../hooks/useScrollDirection";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const scrollDirection = useScrollDirection();
  return (
    <header
      className={`sticky ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      } h-20 bg-orange-600 flex justify-center items-center`}
    >
      <nav className="w-4/5 mx-auto text-white flex justify-between items-center">
        <img
          className="scale-50"
          src="src/assets/suitmedia_logo.webp"
          alt="Suitmedia Logo"
        />
        <ul className="flex gap-10">
          <li>
            <NavLink className="pb-2" to="/work">
              Work
            </NavLink>
          </li>
          <li>
            <NavLink className="pb-2" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="pb-2" to="/services">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink className="pb-2" to="/ideas">
              Ideas
            </NavLink>
          </li>
          <li>
            <NavLink className="pb-2" to="/career">
              Careers
            </NavLink>
          </li>
          <li>
            <NavLink className="pb-2" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
