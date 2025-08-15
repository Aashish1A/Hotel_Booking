/**
 * CLOUDINARY CONFIGURATION
 *
 * This file configures Cloudinary service for image upload and storage
 * in the Hotel Booking application. Handles room images, hotel photos,
 * and user profile pictures with cloud-based storage.
 *
 * Key Features:
 * - Centralized Cloudinary configuration management
 * - Secure API credential handling via environment variables
 * - Integration with image upload workflows
 * - Supports multiple image formats and transformations
 *
 * Dependencies:
 * - Cloudinary SDK v2: For cloud-based image storage and management
 * - Environment Variables: For secure API credential storage
 */

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

/**
 * CONFIGURE CLOUDINARY CONNECTION
 *
 * Initializes Cloudinary service with API credentials from environment variables.
 * This configuration enables image upload, storage, and transformation capabilities
 * throughout the application.
 *
 * @function connectCloudinary
 * @returns {void} Configures the global Cloudinary instance
 *
 * Required Environment Variables:
 * - CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name
 * - CLOUDINARY_API_KEY: Your Cloudinary API key
 * - CLOUDINARY_API_SECRET: Your Cloudinary API secret
 *
 * Usage:
 * - Call once during server startup to initialize Cloudinary
 * - After configuration, use cloudinary.uploader.upload() for image uploads
 * - Supports automatic image optimization and transformation
 */
const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary account identifier
    api_key: process.env.CLOUDINARY_API_KEY, // Public API key for authentication
    api_secret: process.env.CLOUDINARY_API_SECRET, // Private API secret for secure operations
  });
};

export default connectCloudinary;
