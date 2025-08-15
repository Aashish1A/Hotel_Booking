import React, { useEffect } from "react";
import NavBar from "../../Components/hotelOwner/NavBar";
import SideBar from "../../Components/hotelOwner/SideBar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

/**
 * Hotel Owner Layout Component
 * Protected layout wrapper for hotel owner dashboard pages
 * Includes sidebar navigation and access control
 */
const Layout = () => {
  const { isOwner, loading, navigate } = useAppContext();

  // Redirect non-owners to home page
  useEffect(() => {
    if (!loading && !isOwner) {
      navigate("/");
    }
  }, [isOwner, loading, navigate]);

  // Show loading indicator while checking user status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not owner, don't render anything (will redirect)
  if (!isOwner) return null;

  return (
    <div className="flex">
      {/* Left sidebar with navigation */}
      <SideBar />
      <div className="flex-1">
        {/* Top navigation bar */}
        <NavBar />
        {/* Main content area */}
        <main className="p-4 sm:p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
