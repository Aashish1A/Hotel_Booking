import Booking from "../models/Booking";
import Hotel from "../models/Hotel";
import Room from "../models/Room";

// Function to check availability of rooms
const checkRoomAvailability = async ({ checkInDate, CheckOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: CheckOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    return bookings.length === 0; // If no bookings overlap, room is available
  } catch (error) {
    throw new Error("Error checking room availability: " + error.message);
  }
};

// API to checking availability of rooms
// POST /api/bookings/check-availability
export const checkAvailabilityApi = async (req, res) => {
  const { checkInDate, checkOutDate, room } = req.body;

  try {
    const isAvailable = await checkRoomAvailability({ checkInDate, checkOutDate, room });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// API to create a booking
// POST /api/bookings/book
export const createBooking = async (req, res) => {
    try {
        const {room, checkInDate, checkOutDate, guests} = req.body;
        const user = req.user._id;

        // Before booking check availability
        const isAvailable = await checkRoomAvailability({ checkInDate, checkOutDate, room });
        if (!isAvailable) {
            return res.status(400).json({ success: false, message: "Room is not available for the selected dates." });
        }

        // Get toalPrice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // Calculate total price based on number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        totalPrice *= numberOfNights;

        // Create a new booking
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            totalPrice,
            guests: +guests,
        });
        res.json({ success: true, message: "Booking created successfully", booking });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to create booking" });
    }
}

// API to get all bookings for a user
// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate("room hotel").sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get all bookings for a hotel owner
// GET /api/bookings/hotel
export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.user_id });
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }
        const bookings = await Booking.find({ hotel: hotel._id }).populate("room user").sort({ createdAt: -1 });
        // Total bookings
        const totalBookings = bookings.length;
        // Total revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings}});
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
}