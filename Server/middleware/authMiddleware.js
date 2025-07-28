import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => { 
    const {userId} = req.auth();
    if(!userId) {
        return res.status(401).json({message: "Unauthorized access"});
    }else{
        const user = await User.findById(userId);
        req.user = user;
        next();
    }
}