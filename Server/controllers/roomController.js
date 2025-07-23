import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import {v2 as cloudinary} from "cloudinary";

// API to create a new room for hotel
export const createRoom = async (req, res) => {
    try {
        const { roomType, price, amenities } = req.body;

        // Check if the hotel exists and belongs to the user
        const hotel = await Hotel.findOne({ owner: req.auth.userId });
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found or you do not have permission to add rooms" });
        }

        // Upload image to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path); 
            return response.secure_url;
        });

        // wait for all images to be uploaded
        const images = await Promise.all(uploadImages);

        // Create a new room
        const room = await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images
        });

        res.json({ success: true, message: "Room created successfully"});
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get all rooms for a hotel
export const getRooms = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {
    try {
       
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}