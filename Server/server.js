import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhook from './controllers/clerkWebHooks.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

connectDB(); // Connect to MongoDB
connectCloudinary(); // Connect to Cloudinary

const app = express();
const PORT = process.env.PORT;  

app.use(cors()); // Enable Cross-Origin Resource Sharing

// Use Clerk middleware for authentication
app.use(clerkMiddleware());

// Middleware to parse JSON bodies
app.use(express.json());

// API to listen clerk webhooks
app.use("/api/clerk", clerkWebhook);

// Sample route
app.get('/', (req, res) => res.send('Welcome to the Hotel Booking API'));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});