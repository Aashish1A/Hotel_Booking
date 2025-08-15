import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    room: { type: String, ref: "Room", required: true },
    hotel: { type: String, ref: "Hotel", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    guests: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentMethod: { type: String, required: true, default: "Pay At Hotel" },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Add compound index to prevent duplicate bookings for same user+room+dates
bookingSchema.index(
  { user: 1, room: 1, checkInDate: 1, checkOutDate: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["pending", "confirmed"] },
    },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
