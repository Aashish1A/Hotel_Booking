import { clerkClient } from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Extract Clerk userId from the JWT that @clerk/express injected
    const { userId } = req.auth();
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Look up in MongoDB
    let user = await User.findById(userId);
    if (!user) {
      // Fetch the full user record from Clerk
      const clerkUser = await clerkClient.users.getUser(userId);
      const userData = {
        _id: clerkUser.id,
        userName: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Guest",
        email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
        image: clerkUser.profileImageUrl || "",
      };

      // Create in MongoDB
      user = await User.create(userData);
    }

    // Attach user and continue
    req.user = user;
    next();
  } catch (err) {
    console.error("protect() error:", err);
    res.status(500).json({ message: "Protect middleware failed" });
  }
};