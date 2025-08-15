/**
 * APPLICATION CONTEXT
 *
 * This file provides global state management for the Hotel Booking application.
 * It centralizes user authentication state, hotel ownership status, and common
 * utilities that need to be shared across components.
 *
 * Key Features:
 * - User authentication state management with Clerk integration
 * - Hotel owner role detection and persistence
 * - Global navigation and utility functions
 * - Loading states and error handling
 * - Local storage integration for state persistence
 *
 * Dependencies:
 * - Clerk React: For user authentication and token management
 * - Axios: For API communication with backend
 * - React Context: For global state management
 * - React Hot Toast: For user notifications
 */

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

// AXIOS CONFIGURATION
// Set default base URL for all API requests
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// CREATE CONTEXT
// Initialize React Context for global state management
const AppContext = createContext();

/**
 * APP PROVIDER COMPONENT
 *
 * Main context provider that wraps the entire application and provides
 * global state and utilities to all child components.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Context provider with global state
 */
export const AppProvider = ({ children }) => {
  // ENVIRONMENT CONFIGURATION
  const currency = import.meta.env.VITE_CURRENCY || "$";

  // HOOKS INITIALIZATION
  const navigate = useNavigate();
  const { user } = useUser(); // Clerk user object
  const { getToken } = useAuth(); // Clerk token function

  // STATE MANAGEMENT
  const [isOwner, setIsOwner] = useState(false); // Hotel owner status
  const [showHotelReg, setShowHotelReg] = useState(false); // Hotel registration modal
  const [searchedCities, setSearchedCities] = useState([]); // Recent search history
  const [loading, setLoading] = useState(true); // Global loading state
  const [rooms, setRooms] = useState([]); // Hotel rooms data

  const fetchRooms = async () => {
    try {
      const {data} = await axios.get("/api/rooms");
      if(data.success){
        setRooms(data.rooms);
      }else{
        toast.error(data.message || "Failed to load rooms");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  /**
   * FETCH USER DATA
   *
   * Retrieves user information from backend API and determines hotel ownership status.
   * Handles authentication tokens and localStorage synchronization.
   *
   * @async
   * @function fetchUser
   * @returns {Promise<void>} Updates user state based on API response
   */
  const fetchUser = async () => {
    try {
      setLoading(true);

      // AUTHENTICATION CHECK: Ensure user is logged in
      if (!user) {
        setIsOwner(false);
        return;
      }

      // API REQUEST: Get user data with authentication token
      const token = await getToken();
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        // OWNERSHIP DETECTION: Check if user owns a hotel
        // User is considered owner if they have a hotel property
        const isHotelOwner = !!data.hotel;
        setIsOwner(isHotelOwner);

        // PERSISTENCE: Store ownership status in localStorage
        if (isHotelOwner) {
          localStorage.setItem("isHotelOwner", "true");
        } else {
          localStorage.removeItem("isHotelOwner");
        }
      } else {
        // FALLBACK: Clear ownership status on API failure
        setIsOwner(false);
        localStorage.removeItem("isHotelOwner");
      }
    } catch (error) {
      // ERROR HANDLING: Clear ownership status on error
      setIsOwner(false);
      localStorage.removeItem("isHotelOwner");
    } finally {
      setLoading(false);
    }
  };

  /**
   * USER EFFECT HANDLER
   *
   * Manages user authentication state changes and ownership persistence.
   * Handles login/logout scenarios and localStorage synchronization.
   */
  useEffect(() => {
    if (user) {
      // QUICK LOAD: Check localStorage first for immediate UI update
      if (localStorage.getItem("isHotelOwner") === "true") {
        setIsOwner(true);
      }
      // VERIFICATION: Fetch fresh data from API to confirm status
      fetchUser();
    } else {
      // LOGOUT CLEANUP: Clear state when user logs out
      setLoading(false);
      setIsOwner(false);
      localStorage.removeItem("isHotelOwner");
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();
  }, []);

  /**
   * CONTEXT VALUE OBJECT
   *
   * Defines all state and functions available to child components
   * through the context provider.
   */
  const value = {
    // CONFIGURATION
    currency, // App currency symbol
    navigate, // React Router navigation function

    // USER & AUTHENTICATION
    user, // Clerk user object
    getToken, // Function to get authentication token
    isOwner, // Boolean: is user a hotel owner
    setIsOwner, // Function to update owner status

    // UI STATE
    showHotelReg, // Boolean: show hotel registration modal
    setShowHotelReg, // Function to toggle registration modal
    loading, // Boolean: global loading state
    setLoading, // Function to update loading state
    rooms, // Array: list of hotel rooms
    setRooms, // Function to update rooms

    // SEARCH FUNCTIONALITY
    searchedCities, // Array: recent searched cities
    setSearchedCities, // Function to update searched cities

    // UTILITIES
    axios, // Configured axios instance
    fetchUser, // Function to refresh user data
    toast, // Toast notification function
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * CUSTOM HOOK: useAppContext
 *
 * Provides easy access to the application context in any component.
 *
 * @returns {Object} All context values and functions
 * @throws {Error} If used outside of AppProvider
 */
export const useAppContext = () => useContext(AppContext);
