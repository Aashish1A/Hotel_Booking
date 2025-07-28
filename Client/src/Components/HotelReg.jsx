import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/appContext";
import toast from "react-hot-toast";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/hotels",
        { name, contact, address, city },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
      >
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-xl hidden md:block"
        />

        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt="closeIcon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
            onClick={() => setShowHotelReg(false)}
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          {/* Hotel Name */}
          <div className="w-full mt-4">
            <label htmlFor="hotelName" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              type="text"
              id="hotelName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Hotel Name"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* Contact */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter Phone No"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* Address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* Select City Drop Down */}
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-indigo-500 font-light"
              required
            >
              <option value="" disabled selected>
                Select City
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
