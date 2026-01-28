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
    <div className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop')` }}>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 md:px-16 lg:px-24 xl:px-32 py-32 md:py-20">
        <div className="text-left">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-2xl text-white mb-4 leading-tight">
            Discover Your Perfect Getaway Destination
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-white/90 mb-8 md:mb-12">
            Unparalleled luxury and comfort await at the world's most exclusive
            <br />
            hotels and resorts. Start your journey today.
          </p>

          {/* Search Form */}
          <div className="max-w-5xl">
            <form
              onSubmit={onSearch}
              className="bg-white rounded-xl shadow-2xl p-4 max-w-5xl"
            >
              <div className="flex flex-wrap lg:flex-nowrap gap-3 items-end">
                {/* Destination */}
                <div className="w-full sm:flex-1 sm:min-w-[160px] lg:w-auto">
                  <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                    <img
                      src={assets.locationIcon}
                      alt=""
                      className="h-3 w-3 mr-1"
                    />
                    Destination
                  </label>
                  <input onChange={(e) => setDestination(e.target.value)} value={destination} list="destinations" type="text" className="w-full px-3 py-2.5 border-0 focus:outline-none text-sm" placeholder="Dubai" required />
                  <datalist id="destinations">
                    {cities.map((city, index) => (
                      <option key={index} value={city.name} />
                    ))}
                  </datalist>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px h-12 bg-gray-200"></div>

                {/* Check-in */}
                <div className="w-full sm:flex-1 sm:min-w-[150px] lg:w-auto">
                  <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                    <img
                      src={assets.calenderIcon}
                      alt=""
                      className="h-3 w-3 mr-1"
                    />
                    Check in
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2.5 border-0 focus:outline-none text-sm"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px h-12 bg-gray-200"></div>

                {/* Check-out */}
                <div className="w-full sm:flex-1 sm:min-w-[150px] lg:w-auto">
                  <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                    <img
                      src={assets.calenderIcon}
                      alt=""
                      className="h-3 w-3 mr-1"
                    />
                    Check out
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2.5 border-0 focus:outline-none text-sm"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px h-12 bg-gray-200"></div>

                {/* Guests */}
                <div className="w-full sm:w-24 lg:w-20">
                  <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                    <img
                      src={assets.guestsIcon}
                      alt=""
                      className="h-3 w-3 mr-1"
                    />
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="2"
                    className="w-full px-3 py-2.5 border-0 focus:outline-none text-sm"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                >
                  <img
                    src={assets.searchIcon}
                    alt=""
                    className="h-4 w-4 mr-2 brightness-0 invert"
                  />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
