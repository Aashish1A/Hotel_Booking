/**
 * DATABASE CONFIGURATION
 *
 * This file handles MongoDB database connection setup using Mongoose ODM.
 * Provides centralized database configuration and connection management
 * for the Hotel Booking application.
 *
 * Key Features:
 * - Establishes MongoDB connection with connection status monitoring
 * - Handles connection errors and provides meaningful error messages
 * - Implements graceful process exit on connection failure
 * - Uses environment variables for database URL configuration
 *
 * Dependencies:
 * - Mongoose: MongoDB ODM for Node.js
 * - Environment Variables: MONGODB_URI for database connection string
 */

import mongoose from "mongoose";

/**
 * CONNECT TO MONGODB DATABASE
 *
 * Establishes connection to MongoDB database using Mongoose.
 * Includes connection event handling and error management.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} Promise that resolves when connection is established
 * @throws {Error} If connection fails, logs error and exits process
 *
 * Connection Details:
 * - Database Name: hotel-booking
 * - Connection String: From MONGODB_URI environment variable
 * - Error Handling: Graceful process exit on failure
 */
const connectDB = async () => {
  try {
    // CONNECTION EVENT LISTENER
    // Monitor connection status and log successful connections
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });

    // ESTABLISH CONNECTION
    // Connect to MongoDB using environment variable and database name
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
  } catch (error) {
    // ERROR HANDLING
    // Log connection error details and exit process gracefully
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure code
  }
};

export default connectDB;
