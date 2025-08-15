import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkAvailabilityApi, createBooking, getHotelBookings, getUserBookings, stripePayment } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityApi);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getHotelBookings);

bookingRouter.post("/stripe-payment", protect, stripePayment);


export default bookingRouter;