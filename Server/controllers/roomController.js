/**
 * ROOM CONTROLLER
 *
 * This file handles all room-related operations including:
 * - Creating new rooms for hotels (with image upload to Cloudinary)
 * - Retrieving available rooms for customers
 * - Managing room availability for hotel owners
 * - Getting rooms owned by specific hotel owners
 *
 * Dependencies:
 * - Hotel model: For validating hotel ownership
 * - Room model: For room data operations
 * - Cloudinary: For image upload and storage
 */

import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

/**
 * CREATE NEW ROOM
 *
 * Allows hotel owners to add new rooms to their hotel. Handles multiple
 * image uploads to Cloudinary and stores room details in database.
 *
 * @route POST /api/rooms
 * @access Private (requires hotel owner authentication)
 * @param {Object} req - Express request object (contains room data and uploaded files)
 * @param {Object} res - Express response object
 * @body {string} roomType - Type of room (e.g., "Single Bed", "Double Bed")
 * @body {string} amenities - JSON string of room amenities array
 * @body {number} pricePerNight - Room price per night
 * @files {Array} images - Array of uploaded room images (max 4)
 * @returns {Object} JSON response with success message
 */
export const createRoom = async (req, res) => {
  try {
    const { roomType, amenities, pricePerNight } = req.body;

    // VALIDATION: Check if user owns a hotel
    // Only hotel owners can create rooms
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }

    // IMAGE UPLOAD: Upload all room images to Cloudinary
    // Convert each uploaded file to a secure URL for storage
    const uploadImages = (req.files || []).map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url; // Get the public URL for the uploaded image
    });

    // Wait for all image uploads to complete
    const images = await Promise.all(uploadImages);

    // CREATE ROOM: Save room data to database
    const room = await Room.create({
      hotel: hotel._id, // Link room to the hotel
      roomType,
      pricePerNight: +pricePerNight, // Convert string to number
      amenities: JSON.parse(amenities), // Parse JSON string to array
      images, // Array of Cloudinary image URLs
    });

    // SUCCESS RESPONSE: Room created successfully
    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    // Handle any database, Cloudinary, or server errors
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET ALL AVAILABLE ROOMS
 *
 * Retrieves all rooms that are currently available for booking.
 * Used by customers to browse and book rooms across all hotels.
 *
 * @route GET /api/rooms
 * @access Public (no authentication required)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with array of available rooms and hotel info
 */
export const getRooms = async (req, res) => {
  try {
    // FETCH AVAILABLE ROOMS: Get all rooms marked as available
    // Populate hotel and owner information for display
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel", // Get hotel information
        populate: {
          path: "owner", // Get hotel owner information
          select: "image", // Only include owner's profile image
        },
      })
      .sort({ createdAt: -1 }); // Sort by newest rooms first

    // SUCCESS RESPONSE: Return all available rooms
    res.json({ success: true, rooms });
  } catch (error) {
    // Handle any database or server errors
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET HOTEL OWNER'S ROOMS
 *
 * Retrieves all rooms owned by the authenticated hotel owner.
 * Used in the hotel management dashboard to display and manage rooms.
 *
 * @route GET /api/rooms/owner
 * @access Private (requires hotel owner authentication)
 * @param {Object} req - Express request object (contains authenticated user)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with array of owner's rooms
 */
export const getOwnerRooms = async (req, res) => {
  try {
    // FIND OWNER'S HOTEL: Get the hotel owned by authenticated user
    const hotelData = await Hotel.findOne({ owner: req.user._id });

    if (!hotelData) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found for this owner",
      });
    }

    // FETCH HOTEL'S ROOMS: Get all rooms belonging to this hotel
    // Populate hotel information for additional context
    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");

    // SUCCESS RESPONSE: Return owner's rooms
    res.json({ success: true, rooms });
  } catch (error) {
    // Handle any database or server errors
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * TOGGLE ROOM AVAILABILITY
 *
 * Allows hotel owners to mark rooms as available or unavailable.
 * Used for room maintenance, bookings, or temporary closures.
 *
 * @route POST /api/rooms/toggle-availability
 * @access Private (requires hotel owner authentication)
 * @param {Object} req - Express request object (contains room ID)
 * @param {Object} res - Express response object
 * @body {string} roomId - ID of the room to toggle availability
 * @returns {Object} JSON response with success message
 */
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    // FIND AND UPDATE ROOM: Toggle the availability status
    const room = await Room.findById(roomId);
    room.isAvailable = !room.isAvailable; // Flip the boolean value
    await room.save(); // Save the updated room data

    // SUCCESS RESPONSE: Room availability updated
    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    // Handle any database or server errors
    res.status(500).json({ success: false, message: error.message });
  }
};
