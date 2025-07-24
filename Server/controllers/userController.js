// Get /api/user
export const getUserData = async (req, res) => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({success: true, role, recentSearchedCities});
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
}

// Store User Recent Searched Cities
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const {recentSearchCity} = req.body;
        const user = await req.user;

        if(user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchCity); 
        }else{
            user.recentSearchedCities.shift(); // Remove the oldest city
            user.recentSearchedCities.push(recentSearchCity); // Add the new city
        }
        await user.save();
        res.json({success: true, message: 'Recent searched cities updated successfully'});

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}