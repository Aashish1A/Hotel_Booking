import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import connectDB from './configs/db.js';

connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;  

app.use(cors()); // Enable Cross-Origin Resource Sharing

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {      
    res.send('Welcome to the Hotel Booking API');
    }
);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});