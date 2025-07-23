import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhook from './controllers/clerkWebHooks.js';

connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;  

app.use(cors()); // Enable Cross-Origin Resource Sharing

// Use Clerk middleware for authentication
app.use(clerkMiddleware());

// Middleware to parse JSON bodies
app.use(express.json());

// API to listen clerk webhooks
app.use("/api/clerk", clerkWebhook);

// Sample route
app.get('/', (req, res) => {      
    res.send('Welcome to the Hotel Booking API');
    }
);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});