import React from "react";
import { assets, cities } from "../assets/assets";
import { useState } from "react";
import { useAppContext } from "../context/appContext";

const Hero = () => {
  const { navigate, getToken, axios, setSearchedCities } = useAppContext();
  // State to manage the destination input
  const [destination, setDestination] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);
    // call api to save recent search cities
    try {
      const token = await getToken();
      await axios.post(
        "/api/user/store-recent-search",
        { recentSearchedCities: destination },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the context with the new searched cities
      setSearchedCities((prevCities) => {
        const updatedSearchedCities = [...prevCities, destination];
        if (updatedSearchedCities.length > 3) {
          updatedSearchedCities.shift(); // Keep only the last 3 cities
        }
        return updatedSearchedCities;
      });
    } catch (error) {
      console.error("Error saving recent search city:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium mb-8 border border-indigo-200">
            <span className="mr-2">🏨</span>
            Premium Hotel Booking Platform
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Stay Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
            Discover premium hotels and resorts across India. Book with
            confidence and create unforgettable memories.
          </p>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <form
              onSubmit={onSearch}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Destination */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <img
                      src={assets.locationIcon}
                      alt=""
                      className="h-4 w-4 mr-2"
                    />
                    Destination
                  </label>
                  <input
                    onChange={(e) => setDestination(e.target.value)}
                    value={destination}
                    list="destinations"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Where are you going?"
                    required
                  />
                  <datalist id="destinations">
                    {cities.map((city, index) => (
                      <option key={index} value={city.name} />
                    ))}
                  </datalist>
                </div>

                {/* Check-in */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <img
                      src={assets.calenderIcon}
                      alt=""
                      className="h-4 w-4 mr-2"
                    />
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Check-out */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <img
                      src={assets.calenderIcon}
                      alt=""
                      className="h-4 w-4 mr-2"
                    />
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full md:w-auto mx-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <img
                    src={assets.searchIcon}
                    alt=""
                    className="h-5 w-5 mr-2"
                  />
                  Search Hotels
                </button>
              </div>
            </form>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                500+
              </div>
              <div className="text-sm text-gray-600">Premium Hotels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                50+
              </div>
              <div className="text-sm text-gray-600">Indian Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                10k+
              </div>
              <div className="text-sm text-gray-600">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
