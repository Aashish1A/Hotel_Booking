import React, { useState } from "react";
import Title from "../../Components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

/**
 * Add Room Component
 * Allows hotel owners to add new rooms to their property
 */
const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  // Image upload state (up to 4 images per room)
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  // Room details form state
  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free Wi-Fi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const [loading, setLoading] = useState(false);

  // Handle room creation form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validate all required fields and images
    if (
      !input.roomType ||
      !input.pricePerNight ||
      !Object.values(input.amenities) ||
      !Object.values(images).every((image) => image)
    ) {
      toast.error("Please fill all the fields and upload images.");
      return;
    }

    setLoading(true);
    try {
      // Prepare form data for multipart upload
      const formData = new FormData();
      formData.append("roomType", input.roomType);
      formData.append("pricePerNight", input.pricePerNight);

      // Convert amenities object to array of enabled amenities
      const amenities = Object.keys(input.amenities).filter(
        (amenity) => input.amenities[amenity]
      );
      formData.append("amenities", JSON.stringify(amenities));

      // Append room images for upload
      Object.values(images).forEach((file) => {
        formData.append("images", file);
      });

      const { data } = await axios.post("/api/rooms", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        toast.success("Room added successfully!");
        setInput({
          roomType: "",
          pricePerNight: "",
          amenities: {
            "Free Wi-Fi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
      } else {
        toast.error("Failed to add room. Please try again.");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Title
        align="left"
        font="outfit"
        title="AddRoom"
        subTitle="Fill in the details carefully and accurate room details, pricing, and amenities to enhance the user booking experience."
      />

      {/* Upload Area of Images */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            value={input.roomType}
            onChange={(e) => setInput({ ...input, roomType: e.target.value })}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/night</span>
          </p>
          <input
            value={input.pricePerNight}
            onChange={(e) =>
              setInput({ ...input, pricePerNight: e.target.value })
            }
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
          />
        </div>
      </div>

      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
        {Object.keys(input.amenities).map((amenity, index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={input.amenities[amenity]}
              onChange={(e) =>
                setInput({
                  ...input,
                  amenities: {
                    ...input.amenities,
                    [amenity]: e.target.checked,
                  },
                })
              }
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>

      <button
        className="bg-cyan-300 text-white px-8 py-2 rounded mt-8 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Adding Room..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRoom;
