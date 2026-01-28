import React from "react";
import { UserButton } from "@clerk/clerk-react";

/**
 * Hotel Owner Navigation Bar Component
 * Top navigation bar for hotel owner dashboard with user controls
 */
const NavBar = () => {
  return (
    <div className="flex items-center justify-end px-4 md:px-8 border-b border-gray-300 py-5 bg-white transition-all duration-300">
      {/* User profile and logout controls */}
      <UserButton />
    </div>
  );
};

export default NavBar;
