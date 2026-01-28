import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

/**
 * Modern Hotel Card Component
 * Displays room information in a sleek card format with modern styling
 */
const HotelCard = ({ room, index }) => {
  return (
    <Link to={"/rooms/" + room._id} onCanPlay={() => scrollTo(0, 0)} key={room._id} className="group relative w-full bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block" >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img src={room.images[0]} alt={room.hotel.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Best Seller Badge */}
        {index % 2 === 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
            ✨ Best Seller
          </div>
        )}

        {/* Heart Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-white">
          <img src={assets.heartIcon} alt="favorite" className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
            {room.hotel.name}
          </h3>
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
            <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-700">4.5</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4 opacity-70" />
          <span className="text-sm">{room.hotel.address}</span>
        </div>

        {/* Amenities Preview */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <img src={assets.freeWifiIcon} alt="wifi" className="w-4 h-4" />
            <span>Free WiFi</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={assets.freeBreakfastIcon} alt="breakfast" className="w-4 h-4" />
            <span>Breakfast</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={assets.poolIcon} alt="pool" className="w-4 h-4" />
            <span>Pool</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-800">
              ${room.pricePerNight}
            </span>
            <span className="text-gray-500 ml-1">/night</span>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
