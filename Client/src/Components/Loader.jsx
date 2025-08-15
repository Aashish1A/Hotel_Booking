import React from "react";
import { useAppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Loader = () => {
  const { navigate } = useAppContext();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`); // Navigate to the next URL
      }, 8000); // Redirect after 8 seconds
    }
  }, [nextUrl]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-[#4A90E2]"></div>
    </div>
  );
};

export default Loader;
