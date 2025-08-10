import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import {v2 as cloudinary} from "cloudinary";

// API to create a new room for hotel
export const createRoom = async (req, res) => {
    try {
        
        const { roomType, amenities, pricePerNight } = req.body;

        const hotel = await Hotel.findOne({ owner: req.auth().userId });
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        const uploadImages = (req.files || []).map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });

        const images = await Promise.all(uploadImages);

        const room = await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images
        });

        res.json({ success: true, message: "Room created successfully" });

    } catch (error) {
        console.error("Error in createRoom:", error); // <== See this log
        res.status(500).json({ success: false, message: error.message });
    }
};


// API to get all rooms for a hotel
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({isAvailable : true}).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({ createdAt: -1 });
        res.json({ success: true, rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel.findOne({ owner: req.auth().userId });
        if (!hotelData) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");
        res.json({ success: true, rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// API to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const room = await Room.findById(roomId);
        room.isAvailable = !room.isAvailable;
        await room.save();
        res.json({ success: true, message:"Room availability updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
