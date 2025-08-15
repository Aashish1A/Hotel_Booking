/**
 * HOTEL BOOKING API SERVER
 *
 * Main server file that sets up and configures the Express.js application
 * for the Hotel Booking platform. This file handles:
 *
 * - Database and Cloudinary connections
 * - Middleware configuration (CORS, authentication, body parsing)
 * - API route mounting and organization
 * - Clerk webhook integration for user management
 * - Server startup and port configuration
 *
 * Architecture:
 * - RESTful API design with organized route modules
 * - Clerk authentication integration for secure user management
 * - Cloudinary integration for image upload and storage
 * - MongoDB database with Mongoose ODM
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhook from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// INITIALIZE CONNECTIONS
// Connect to MongoDB database and Cloudinary service
connectDB();
connectCloudinary();

// EXPRESS APP SETUP
const app = express();
const PORT = process.env.PORT;

// CORS CONFIGURATION
// Enable Cross-Origin Resource Sharing for frontend communication
app.use(cors());

// API to listen to stripe webhooks
app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// CLERK WEBHOOK MIDDLEWARE
// Handle Clerk authentication webhooks with raw body parsing
// This must come BEFORE express.json() to preserve raw body for signature verification
app.use("/api/clerk", express.raw({ type: "*/*" }), clerkWebhook);

// BODY PARSING MIDDLEWARE
// Parse incoming JSON requests (placed after webhook to avoid conflicts)
app.use(express.json());

// AUTHENTICATION MIDDLEWARE
// Integrate Clerk authentication for protected routes
app.use(clerkMiddleware());

// API ROUTES CONFIGURATION
// Root endpoint for API health check
app.get("/", (req, res) => res.send("Welcome to the Hotel Booking API"));

// Mount route modules for organized API structure
app.use("/api/user", userRouter); // User profile and preferences
app.use("/api/hotels", hotelRouter); // Hotel registration and management
app.use("/api/rooms", roomRouter); // Room CRUD operations
app.use("/api/bookings", bookingRouter); // Booking and availability management

// SERVER STARTUP
// Start the Express server on the configured port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
