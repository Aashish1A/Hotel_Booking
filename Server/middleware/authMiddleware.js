/**
 * AUTHENTICATION MIDDLEWARE
 *
 * This middleware provides authentication and user context for protected routes.
 * It integrates Clerk authentication with our MongoDB user system to ensure
 * seamless user experience and data consistency.
 *
 * Key Functions:
 * - Validates Clerk JWT tokens from authenticated requests
 * - Fetches or creates user records in our MongoDB database
 * - Attaches user object to request for use in route handlers
 * - Handles user synchronization between Clerk and our database
 *
 * Dependencies:
 * - Clerk Express SDK: For JWT validation and user data fetching
 * - User model: For database operations and user storage
 */

import { clerkClient } from "@clerk/express";
import User from "../models/User.js";

/**
 * PROTECT MIDDLEWARE
 *
 * Authentication middleware that validates user tokens and ensures
 * user data is available in request context. Automatically creates
 * user records if they don't exist in our database.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {401} If user is not authenticated
 * @throws {500} If middleware processing fails
 *
 * Usage: Apply to routes requiring authentication
 * Example: router.get('/protected', protect, routeHandler)
 */
export const protect = async (req, res, next) => {
  try {
    // AUTHENTICATION CHECK: Extract user ID from Clerk JWT
    // The req.auth() method is provided by @clerk/express middleware
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // USER LOOKUP: Check if user exists in our MongoDB database
    let user = await User.findById(userId);

    if (!user) {
      // USER CREATION: If user doesn't exist, fetch from Clerk and create locally
      // This handles cases where webhook didn't fire or user was created elsewhere
      const clerkUser = await clerkClient.users.getUser(userId);

      // Map Clerk user data to our User schema
      const userData = {
        _id: clerkUser.id, // Use Clerk ID as primary key
        userName:
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          "Guest",
        email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
        image: clerkUser.profileImageUrl || "",
      };

      // Create user record in our database
      user = await User.create(userData);
    }

    // USER CONTEXT: Attach user object to request for route handlers
    req.user = user;
    next(); // Continue to next middleware or route handler
  } catch (err) {
    // ERROR HANDLING: Log error and return server error response
    console.error("protect() error:", err);
    res.status(500).json({ message: "Protect middleware failed" });
  }
};
