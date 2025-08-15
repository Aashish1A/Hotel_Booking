/**
 * HOTEL CONTROLLER
 *
 * This file handles all hotel-related operations including:
 * - Hotel registration for new hotel owners
 * - Retrieving hotel information for authenticated users
 *
 * Dependencies:
 * - Hotel model: For hotel data operations
 * - User model: For updating user roles and hotel references
 */

import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

/**
 * GET USER'S HOTEL INFORMATION
 *
 * Retrieves the hotel information for the currently authenticated user.
 * Used to check if a user owns a hotel and get hotel details.
 *
 * @route GET /api/hotels/my-hotel
 * @access Private (requires authentication)
 * @param {Object} req - Express request object (contains authenticated user)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with hotel data or null if no hotel found
 */
export const getUserHotel = async (req, res) => {
  try {
    const owner = req.user._id; // Get authenticated user's ID
    const hotel = await Hotel.findOne({ owner }); // Find hotel owned by this user

    if (hotel) {
      // Hotel found - return hotel information
      return res.json({ success: true, hotel });
    } else {
      // No hotel found - user hasn't registered a hotel yet
      return res.json({ success: true, hotel: null });
    }
  } catch (error) {
    // Handle any database or server errors
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * REGISTER NEW HOTEL
 *
 * Allows a user to register their property as a hotel. This is a one-time
 * registration that converts a regular user into a hotel owner.
 *
 * @route POST /api/hotels
 * @access Private (requires authentication)
 * @param {Object} req - Express request object (contains hotel data and authenticated user)
 * @param {Object} res - Express response object
 * @body {string} name - Hotel name
 * @body {string} address - Hotel address
 * @body {string} contact - Hotel contact information
 * @body {string} city - Hotel city location
 * @returns {Object} JSON response with success message
 */
export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body; // Extract hotel data from request
    const owner = req.user._id; // Get authenticated user's ID

    // VALIDATION: Check if user already has a hotel registered
    // Each user can only register one hotel
    const existingHotel = await Hotel.findOne({ owner });
    if (existingHotel) {
      return res.status(400).json({
        success: false,
        message: "You have already registered a hotel",
      });
    }

    // CREATE NEW HOTEL: Store hotel information in database
    const newHotel = await Hotel.create({
      name,
      address,
      contact,
      owner,
      city,
    });

    // UPDATE USER ROLE: Convert user to hotel owner and link hotel
    // This enables hotel owner features in the frontend
    await User.findByIdAndUpdate(owner, {
      role: "hotelOwner", // Change user role to enable hotel management features
      hotel: newHotel._id, // Link the hotel to the user for quick access
    });

    // SUCCESS RESPONSE: Hotel registration completed
    res.json({ success: true, message: "Hotel registered successfully" });
  } catch (error) {
    // Handle any database or server errors during registration
    res.status(500).json({ success: false, message: error.message });
  }
};
