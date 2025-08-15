/**
 * USER CONTROLLER
 *
 * This file handles all user-related operations including:
 * - Retrieving user profile data and preferences
 * - Managing user's recent searched cities for better UX
 * - Handling user role and hotel ownership information
 *
 * Dependencies:
 * - User model: For user data operations
 * - Authentication middleware: For accessing authenticated user data
 */

/**
 * GET USER DATA
 *
 * Retrieves essential user information including role, recent searches,
 * and hotel ownership details. Used for user dashboard and personalization.
 *
 * @route GET /api/user
 * @access Private (requires authentication)
 * @param {Object} req - Express request object (contains authenticated user)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user role, recent cities, and hotel info
 */
export const getUserData = async (req, res) => {
  try {
    // VALIDATION: Ensure user is properly authenticated
    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "User not set in request" });
    }

    // EXTRACT USER DATA: Get essential user information
    // - role: 'customer' or 'hotelOwner' for access control
    // - recentSearchedCities: Array of recently searched locations
    // - hotel: Hotel information if user is a hotel owner
    const { role, recentSearchedCities, hotel } = req.user;

    // SUCCESS RESPONSE: Return user data for frontend use
    res.json({ success: true, role, recentSearchedCities, hotel });
  } catch (error) {
    // Handle any server or database errors
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * STORE RECENT SEARCHED CITIES
 *
 * Manages user's recent search history to provide better search suggestions
 * and improved user experience. Maintains a rolling list of last 3 cities.
 *
 * @route POST /api/user/recent-cities
 * @access Private (requires authentication)
 * @param {Object} req - Express request object (contains city data)
 * @param {Object} res - Express response object
 * @body {string} recentSearchCity - Name of the recently searched city
 * @returns {Object} JSON response with success message
 */
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchCity } = req.body;
    const user = await req.user;

    // MANAGE SEARCH HISTORY: Maintain maximum of 3 recent cities
    if (user.recentSearchedCities.length < 3) {
      // Add new city if under limit
      user.recentSearchedCities.push(recentSearchCity);
    } else {
      // Remove oldest city and add new one (FIFO - First In, First Out)
      user.recentSearchedCities.shift(); // Remove the oldest city
      user.recentSearchedCities.push(recentSearchCity); // Add the new city
    }

    // SAVE CHANGES: Update user data in database
    await user.save();

    // SUCCESS RESPONSE: Confirm cities were updated
    res.json({
      success: true,
      message: "Recent searched cities updated successfully",
    });
  } catch (error) {
    // Handle any database or server errors
    res.status(500).json({ success: false, message: error.message });
  }
};
