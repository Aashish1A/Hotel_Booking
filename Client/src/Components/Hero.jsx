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
    <div className="relative min-h-screen overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white min-h-screen">
        {/* Badge */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mt-20 mb-6">
          <span className="text-sm font-medium">
            ✨ The Ultimate Hotel Experience
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-tight mb-6">
          Discover Your Perfect
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Gateway Destination
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-12 leading-relaxed">
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey with us today.
        </p>

        {/* Search Form */}
        <form
          onSubmit={onSearch}
          className="bg-white/95 backdrop-blur-sm text-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 w-full max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Destination Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <img
                  src={assets.locationIcon}
                  alt="location"
                  className="h-5 w-5"
                />
                <label htmlFor="destinationInput" className="font-medium">
                  Destination
                </label>
              </div>
              <input
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
                list="destinations"
                id="destinationInput"
                type="text"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Where are you going?"
                required
              />
              <datalist id="destinations">
                {cities.map((city, index) => (
                  <option key={index} value={city.name} />
                ))}
              </datalist>
            </div>

            {/* Check-in Date */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <img
                  src={assets.calenderIcon}
                  alt="calendar"
                  className="h-5 w-5"
                />
                <label className="font-medium">Check-in</label>
              </div>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <img
                  src={assets.calenderIcon}
                  alt="calendar"
                  className="h-5 w-5"
                />
                <label className="font-medium">Check-out</label>
              </div>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <img src={assets.searchIcon} alt="search" className="h-5 w-5" />
              Search Hotels
            </button>
          </div>
        </form>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full max-w-4xl">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold mb-1">500+</div>
            <div className="text-sm text-gray-300">Premium Hotels</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold mb-1">50+</div>
            <div className="text-sm text-gray-300">Global Cities</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold mb-1">10k+</div>
            <div className="text-sm text-gray-300">Happy Guests</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold mb-1">24/7</div>
            <div className="text-sm text-gray-300">Support</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
