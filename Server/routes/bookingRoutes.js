import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkAvailabilityApi, createBooking, getHotelBookings, getUserBookings } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityApi);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getHotelBookings);


export default bookingRouter;