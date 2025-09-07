import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

/**
 * Hotel Owner Navigation Bar Component
 * Top navigation bar for hotel owner dashboard with logo and user controls
 */
const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      {/* Logo - links back to main site */}
      <Link to="/">
        <img
          src={assets.logoWhite}
          alt="StayFinder Logo"
          className="h-12 object-contain"
        />
      </Link>
      {/* User profile and logout controls */}
      <UserButton />
    </div>
  );
};

export default NavBar;
