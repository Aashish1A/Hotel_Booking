/**
 * CLERK WEBHOOKS CONTROLLER
 *
 * This file handles Clerk authentication webhooks to synchronize user data
 * between Clerk authentication service and our MongoDB database.
 *
 * Key Functions:
 * - Verifies webhook signatures for security
 * - Handles user lifecycle events (create, update, delete)
 * - Maintains user data consistency between Clerk and our database
 * - Maps Clerk user data to our User model schema
 *
 * Dependencies:
 * - Svix: For webhook signature verification and security
 * - User model: For database operations
 * - Clerk Webhook Secret: Environment variable for authentication
 */

import { Webhook } from "svix";
import User from "../models/User.js";

/**
 * CLERK WEBHOOK HANDLER
 *
 * Main webhook endpoint that processes Clerk user events and synchronizes
 * user data with our MongoDB database. Ensures data consistency across
 * authentication and application layers.
 *
 * @route POST /api/clerk/webhooks
 * @access Public (secured via webhook signature verification)
 * @param {Object} req - Express request object (contains webhook payload)
 * @param {Object} res - Express response object
 * @headers {string} svix-id - Webhook ID from Clerk
 * @headers {string} svix-timestamp - Webhook timestamp from Clerk
 * @headers {string} svix-signature - Webhook signature for verification
 * @returns {Object} JSON response confirming webhook processing
 *
 * Supported Events:
 * - user.created: Creates new user in our database
 * - user.updated: Updates existing user information
 * - user.deleted: Removes user from our database
 */
const handler = async (req, res) => {
  try {
    // PAYLOAD EXTRACTION: Get raw webhook data for signature verification
    // Raw body is required for proper signature validation
    const rawPayload = req.rawBody.toString();

    // SECURITY VERIFICATION: Validate webhook signature using Svix
    // This ensures the webhook actually comes from Clerk and prevents tampering
    const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const { type, data } = svix.verify(rawPayload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // EVENT PROCESSING: Handle different Clerk webhook events
    switch (type) {
      case "user.created":
        // DATA MAPPING: Transform Clerk user data for user creation
        const newUserData = {
          _id: data.id, // Use Clerk ID as primary key for consistency
          userName:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
            "Guest",
          email: data.email_addresses?.[0]?.email_address || "", // Primary email
          image: data.profile_image_url || "", // Profile picture URL
        };
        // NEW USER: Create user record in our database
        await User.create(newUserData);
        break;

      case "user.updated":
        // DATA MAPPING: Transform Clerk user data for user update
        const updateUserData = {
          _id: data.id, // Use Clerk ID as primary key for consistency
          userName:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
            "Guest",
          email: data.email_addresses?.[0]?.email_address || "", // Primary email
          image: data.profile_image_url || "", // Profile picture URL
        };
        // USER UPDATE: Sync changes from Clerk to our database
        await User.findByIdAndUpdate(data.id, updateUserData);
        break;

      case "user.deleted":
        // USER DELETION: Remove user from our database
        await User.findByIdAndDelete(data.id);
        break;

      default:
        // UNKNOWN EVENTS: Ignore unhandled event types
        // This allows for graceful handling of new Clerk events
        break;
    }

    // SUCCESS RESPONSE: Confirm successful webhook processing to Clerk
    return res.status(200).json({ success: true });
  } catch (error) {
    // ERROR HANDLING: Handle signature verification or database errors
    // Return 400 status to indicate webhook processing failure
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default handler;