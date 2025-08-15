/**
 * BOOKING CONTROLLER
 *
 * This file handles all booking-related operations including:
 * - Checking room availability for specific date ranges
 * - Creating new bookings with price calculations
 * - Retrieving user bookings and hotel booking analytics
 * - Managing booking data for both customers and hotel owners
 *
 * Dependencies:
 * - Booking model: For booking data operations
 * - Hotel model: For hotel information and ownership validation
 * - Room model: For room details and pricing
 */

import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import stripe from "stripe"

/**
 * CHECK ROOM AVAILABILITY HELPER FUNCTION
 *
 * Internal utility function to determine if a room is available
 * for a specific date range by checking for conflicting bookings.
 *
 * @param {Object} params - Availability check parameters
 * @param {Date} params.checkInDate - Desired check-in date
 * @param {Date} params.checkOutDate - Desired check-out date
 * @param {string} params.room - Room ID to check availability for
 * @param {string} params.userId - Optional user ID for additional checks
 * @returns {Object} Availability result with status and message
 * @throws {Error} If database query fails
 */
const checkRoomAvailability = async ({
  checkInDate,
  checkOutDate,
  room,
  userId = null,
}) => {
  try {
    // Convert dates to proper Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // OVERLAP DETECTION: Find bookings that conflict with requested dates
    const overlappingBookings = await Booking.find({
      room,
      $or: [
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn },
        },
      ],
    });

    // If user is provided, check if they already have a booking for this room
    if (userId) {
      const userExistingBooking = overlappingBookings.find(
        (booking) => booking.user.toString() === userId.toString()
      );

      if (userExistingBooking) {
        return {
          isAvailable: false,
          message:
            "You already have a booking for this room during the selected dates.",
        };
      }
    }

    // Check if room is available (no overlapping bookings from other users)
    const isAvailable =
      overlappingBookings.length === 0 ||
      (userId &&
        overlappingBookings.every(
          (booking) => booking.user.toString() === userId.toString()
        ));

    return {
      isAvailable,
      message: isAvailable
        ? "Room is available"
        : "Room is not available for the selected dates",
    };
  } catch (error) {
    throw new Error("Error checking room availability: " + error.message);
  }
};

/**
 * CHECK AVAILABILITY API
 *
 * Public endpoint to check if a room is available for booking
 * during specific dates. Used before allowing users to proceed with booking.
 *
 * @route POST /api/bookings/check-availability
 * @access Public (with optional authentication)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @body {Date} checkInDate - Desired check-in date
 * @body {Date} checkOutDate - Desired check-out date
 * @body {string} room - Room ID to check availability for
 * @returns {Object} JSON response with availability status
 */
export const checkAvailabilityApi = async (req, res) => {
  const { checkInDate, checkOutDate, room } = req.body;

  try {
    // Get user ID if available (for authenticated requests)
    const userId = req.user?._id || null;

    // CHECK AVAILABILITY: Use helper function to determine room availability
    const availabilityResult = await checkRoomAvailability({
      checkInDate,
      checkOutDate,
      room,
      userId,
    });

    // SUCCESS RESPONSE: Return availability status with message
    res.json({
      success: true,
      isAvailable: availabilityResult.isAvailable,
      message: availabilityResult.message,
    });
  } catch (error) {
    // Handle any database or server errors
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * CREATE BOOKING
 *
 * Creates a new booking after validating room availability and calculating
 * total price based on number of nights and room rate.
 *
 * @route POST /api/bookings/book
 * @access Private (requires customer authentication)
 * @param {Object} req - Express request object (contains booking data and user)
 * @param {Object} res - Express response object
 * @body {string} room - Room ID to book
 * @body {Date} checkInDate - Check-in date
 * @body {Date} checkOutDate - Check-out date
 * @body {number} guests - Number of guests
 * @returns {Object} JSON response with booking confirmation
 */
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;

    // AVAILABILITY VALIDATION: Check if room is available and user doesn't have existing booking
    const availabilityResult = await checkRoomAvailability({
      checkInDate,
      checkOutDate,
      room,
      userId: user,
    });

    if (!availabilityResult.isAvailable) {
      return res.status(400).json({
        success: false,
        message: availabilityResult.message,
      });
    }

    // PRICE CALCULATION: Get room data and calculate total cost
    const roomData = await Room.findById(room).populate("hotel");
    if (!roomData) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Calculate total price based on number of nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const numberOfNights = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = roomData.pricePerNight * numberOfNights;

    // CREATE BOOKING: Save booking data to database
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalPrice,
      guests: +guests,
    });

    // Send email confirmation
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email, // Use user's email from request context
      subject: "Booking Confirmation",
      html: `
        <h2>Your Booking Details</h2>
        <p>Dear ${req.user.userName},</p>
        <p>Thank you for booking with us! Here are your booking details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${booking._id}</li>
          <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
          <li><strong>Location:</strong> ${roomData.hotel.address}</li>
          <li><strong>Check-in:</strong> ${booking.checkInDate.toDateString()}</li>
          <li><strong>Check-out:</strong> ${booking.checkOutDate.toDateString()}</li>
          <li><strong>Total Price:</strong> $${booking.totalPrice}</li>
        </ul>
        <p>We look forward to welcoming you!</p>
        <p>Best regards,</p>
        <p>Your Hotel Booking Team</p>
      `,
    };
    await transporter.sendMail(mailOptions);

    // SUCCESS RESPONSE: Booking created successfully
    res.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    // Handle any database, calculation, or server errors
    console.error("Booking creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking: " + error.message,
    });
  }
};

/**
 * GET USER BOOKINGS
 *
 * Retrieves all bookings made by the authenticated user.
 * Used in customer dashboard to display booking history.
 *
 * @route GET /api/bookings/user
 * @access Private (requires customer authentication)
 * @param {Object} req - Express request object (contains authenticated user)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with array of user's bookings
 */
export const getUserBookings = async (req, res) => {
  try {
    // FETCH USER BOOKINGS: Get all bookings for authenticated user
    // Populate room and hotel data for complete booking information
    const bookings = await Booking.find({ user: req.user._id })
      .populate("room hotel") // Include room and hotel details
      .sort({ createdAt: -1 }); // Sort by newest bookings first

    // SUCCESS RESPONSE: Return user's booking history
    res.json({ success: true, bookings });
  } catch (error) {
    // Handle any database or server errors
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET HOTEL BOOKINGS & ANALYTICS
 *
 * Retrieves all bookings for a hotel owner's property along with
 * analytics data (total bookings and revenue). Used in hotel dashboard.
 *
 * @route GET /api/bookings/hotel
 * @access Private (requires hotel owner authentication)
 * @param {Object} req - Express request object (contains authenticated user)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with bookings and analytics data
 */
export const getHotelBookings = async (req, res) => {
  try {
    // FIND OWNER'S HOTEL: Get hotel owned by authenticated user
    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found for this owner" });
    }

    // FETCH HOTEL BOOKINGS: Get all bookings for this hotel
    // Populate room and user data for detailed booking information
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate({
        path: "room",
        select: "roomType pricePerNight images",
      })
      .populate({
        path: "user",
        select: "userName email",
      })
      .sort({ createdAt: -1 }); // Sort by newest bookings first

    // ANALYTICS CALCULATION: Generate dashboard metrics
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    // SUCCESS RESPONSE: Return bookings with analytics data
    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    // Handle any database or server errors
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings" });
  }
};


export const stripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Retrieve the booking details from the database
    const booking = await Booking.findById(bookingId);
    const roomData = await Room.findById(booking.room).populate("hotel");
    const totalPrice = booking.totalPrice;
    const {origin} = req.headers;

    const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [
      {
        price_data:{
          currency: 'usd', // Use the appropriate currency
          product_data: {
            name: `Booking for ${roomData.hotel.name}`,
            description: `Room Type: ${roomData.roomType}`,
          },
          unit_amount: totalPrice * 100, // Convert to cents
        },
        quantity: 1,
      }
    ]

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${origin}/loader/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      metadata: {
        bookingId
      }
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    res.json({ success: false, message: "Payment Failed" });
  }
};