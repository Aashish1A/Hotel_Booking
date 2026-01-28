import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "../Components/StarRating";
import { useAppContext } from "../context/appContext";
import { useMemo } from "react";

// Reusable checkbox component for filters
const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

// Reusable radio button component for sorting options
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

/**
 * All Rooms Page Component
 * Displays available rooms with filtering and sorting capabilities
 */
const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();

  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState("");

  // Filter options for room search
  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  // Function to handle filter changes
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type].push(value);
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  };

  // Function to handle sort option change
  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  // Function to check if a room matches the selected room types
  const matchesRoomType = (room) => {
    return (
      selectedFilters.roomType.length === 0 ||
      selectedFilters.roomType.includes(room.roomType)
    );
  };

  // Function to check if a room matches the selected price range
  const matchesPriceRange = (room) => {
    if (selectedFilters.priceRange.length === 0) return true;
    const price = room.pricePerNight;
    return selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(" to ").map(Number);
      return price >= min && price < (max || Infinity);
    });
  };

  // Function to sort rooms based on selected sort option
  const sortRooms = (a, b) => {
    if (!selectedSort) return 0;
    switch (selectedSort) {
      case "Price Low to High":
        return a.pricePerNight - b.pricePerNight;
      case "Price High to Low":
        return b.pricePerNight - a.pricePerNight;
      case "Newest First":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  };

  // Filter Destination
  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    return (
      !destination ||
      room.hotel.city.toLowerCase().includes(destination.toLowerCase())
    );
  };

  // Filter rooms based on selected filters and sort them
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesRoomType(room) &&
          matchesPriceRange(room) &&
          filterDestination(room)
      )
      .sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  // clear all filter
  const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort("");
    setSearchParams({});
  };

  return (
    <div className="pt-24 md:pt-28 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 pb-10">
      {/* Header */}
      <div className="flex flex-col items-start text-left mb-6 md:mb-8 w-full">
        <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl">Hotel Rooms</h1>
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-3xl">
          Discover our collection of premium hotel rooms. More options coming
          soon with enhanced features and amenities.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Filters - Top on mobile, Right sidebar on desktop */}
        <div className="w-full lg:w-1/3 xl:w-1/4 lg:order-2">
          <div className="bg-white border border-gray-300 rounded-lg text-gray-600 shadow-sm lg:sticky lg:top-24">
            <div className={`flex items-center justify-between px-4 md:px-5 py-3 border-b border-gray-300`}>
              <p className="text-base font-medium text-gray-800">FILTERS</p>
              <div className="flex gap-4">
                <span
                  onClick={() => setOpenFilters(!openFilters)}
                  className="lg:hidden text-xs font-medium cursor-pointer hover:text-gray-900"
                >
                  {openFilters ? "HIDE" : "SHOW"}
                </span>
                <span 
                  onClick={clearFilters}
                  className="text-xs font-medium cursor-pointer hover:text-gray-900"
                >
                  CLEAR
                </span>
              </div>
            </div>

            <div
              className={`${
                openFilters ? "max-h-[1000px]" : "max-h-0 lg:max-h-[1000px]"
              } overflow-hidden transition-all duration-500 ease-in-out`}
            >
              <div className="px-4 md:px-5 pt-5">
                <p className="font-medium text-gray-800 pb-2">Popular filters</p>
                {roomTypes.map((room, index) => (
                  <CheckBox
                    key={index}
                    label={room}
                    selected={selectedFilters.roomType.includes(room)}
                    onChange={(checked) =>
                      handleFilterChange(checked, room, "roomType")
                    }
                  />
                ))}
              </div>
              <div className="px-4 md:px-5 pt-5">
                <p className="font-medium text-gray-800 pb-2">Price Range</p>
                {priceRanges.map((range, index) => (
                  <CheckBox
                    key={index}
                    label={`${currency} ${range}`}
                    selected={selectedFilters.priceRange.includes(range)}
                    onChange={(checked) =>
                      handleFilterChange(checked, range, "priceRange")
                    }
                  />
                ))}
              </div>
              <div className="px-4 md:px-5 pt-5 pb-6">
                <p className="font-medium text-gray-800 pb-2">Sort By</p>
                {sortOptions.map((option, index) => (
                  <RadioButton
                    key={index}
                    label={option}
                    selected={selectedSort === option}
                    onChange={() => handleSortChange(option)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Room List - Left side on desktop */}
        <div className="w-full lg:w-2/3 xl:w-3/4 lg:order-1">
          {filteredRooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-6 md:py-8 gap-4 md:gap-6 border-b border-gray-300 last:border-0"
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotel-img"
                title="View Room Details"
                className="w-full md:w-72 lg:w-80 h-48 md:h-56 lg:h-64 rounded-xl shadow-lg object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-gray-500 text-sm">{room.hotel.city}</p>
                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  className="text-gray-800 text-2xl md:text-3xl font-playfair cursor-pointer hover:text-gray-600"
                >
                  {room.hotel.name}
                </p>
                <div className="flex items-center">
                  <StarRating />
                  <p className="ml-2 text-sm">200+ reviews</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="locationIcon" className="w-4 h-4" />
                  <span className="line-clamp-1">{room.hotel.address}</span>
                </div>
                {/* Room Amenities */}
                <div className="flex flex-wrap items-center mt-3 mb-4 gap-2 md:gap-3">
                  {room.amenities.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f5f5ff]/70"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-4 h-4"
                      />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-xs text-gray-500">+{room.amenities.length - 4} more</span>
                  )}
                </div>
                {/* Room price per night */}
                <p className="text-lg md:text-xl font-medium text-gray-700">
                  ${room.pricePerNight} /night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
