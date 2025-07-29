// Get /api/user
export const getUserData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not set in request" });
    }

    const { role, recentSearchedCities } = req.user;
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    console.error("getUserData error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Store User Recent Searched Cities
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchCity } = req.body;
    const user = await req.user;

    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchCity);
    } else {
      user.recentSearchedCities.shift(); // Remove the oldest city
      user.recentSearchedCities.push(recentSearchCity); // Add the new city
    }
    await user.save();
    res.json({
      success: true,
      message: "Recent searched cities updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
