import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel, getUserHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post("/", protect, registerHotel);
hotelRouter.get("/my-hotel", protect, getUserHotel);

export default hotelRouter;
