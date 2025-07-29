import { Webhook } from "svix";
import User from "../models/User.js";

/**
 * Clerk webhook handler:
 * - Verifies signature via Svix
 * - Handles user.created, user.updated, user.deleted events
 * - Creates/updates/deletes User in MongoDB
 */

const handler = async (req, res) => {
  try {
    // 1) Read raw payload for verification
    const rawPayload = req.rawBody.toString();

    // 2) Verify incoming webhook signature
    const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const { type, data } = svix.verify(rawPayload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // 3) Map Clerk data to our User schema fields
    const userData = {
      _id: data.id,
      userName: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "Guest",
      email: data.email_addresses?.[0]?.email_address || "",
      image: data.profile_image_url || "",
    };

    // 4) Perform DB operation based on event type
    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
      default:
        // Other events are ignored
        break;
    }

    // 5) Respond success for Clerk
    return res.status(200).json({ success: true });
  } catch (error) {
    // On verification or database errors
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default handler;