import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../Components/StarRating";
import { useAppContext } from "../context/appContext";
import toast from "react-hot-toast";

/**
 * Room Details Page Component
 * Displays detailed room information and handles booking functionality
 */
const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken, axios, navigate } = useAppContext();

  // Room and booking state
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // Check room availability for selected dates
  const checkAvailability = async () => {
    try {
      // Validate date selection
      if (checkInDate >= checkOutDate) {
        toast.error("Check-In date must be before Check-Out date");
        return;
      }

      const { data } = await axios.post(
        "/api/bookings/check-availability",
        {
          checkInDate,
          checkOutDate,
          room: id,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available for booking");
        } else {
          setIsAvailable(false);
          // Show specific message if user already has booking
          const errorMessage =
            data.message || "Room is not available for the selected dates";
          toast.error(errorMessage);
        }
      } else {
        toast.error(data.message || "Failed to check availability");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handle booking form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!checkInDate || !checkOutDate || !guests) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      // Check availability first if not already checked
      if (!isAvailable) {
        return checkAvailability();
      }

      // Create booking
      const { data } = await axios.post(
        "/api/bookings/book",
        {
          checkInDate,
          checkOutDate,
          guests,
          room: id,
          paymentMethod: "Cash on Arrival",
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      // Handle booking success
      if (data.success) {
        toast.success(data.message || "Room booked successfully");
        navigate("/my-bookings");
        scrollTo(0, 0);
      } else {
        toast.error(data.message || "Failed to book room");
      }
    } catch (error) {
      // Handle specific error messages from server
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id == id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, [rooms, id]);

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 mt-2 text-gray-500">
          <img src={assets.locationIcon} alt="locationIcon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="roomImage"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="room image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image && "outline-3 outline-orange-500"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Room Highlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-6 mt-3">
              {room.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[amenity]}
                    alt="facilityIcons"
                    className="w-5 h-5"
                  />
                  <p className="text-xs font-inter">{amenity}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Room Price */}
          <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
        </div>

        {/* CheckIn CheckOut Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <input
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                type="date"
                id="checkInDate"
                placeholder="Check-In"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate}
                disabled={!checkInDate}
                type="date"
                id="checkOutDate"
                placeholder="Check-Out"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                onChange={(e) => setGuests(e.target.value)}
                value={guests}
                type="number"
                id="guests"
                placeholder="1"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#2563EB] hover:bg-[#2563EB]/90 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </form>

        {/* Common Specifications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="w-6.5"
              />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Room Description */}
        <div className="max-w-3xl border-y border-gray-300 my-15 text-gray-500 py-10">
          <p className="">
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>

        {/* Posted By */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <img
              src={room.hotel.owner.image}
              alt="Host"
              className="h-14 w-14 md:h-18 md:w-18 rounded-full"
            />
            <div>
              <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
              <div className="flex items-center mt-1">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 mt-4 rounded text-white bg-[#2563EB] hover:bg-[#2563EB]/90 transition-all cursor-pointer">
            Contact Now
          </button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
