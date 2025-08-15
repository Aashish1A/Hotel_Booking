import React, { useEffect, useState } from "react";
// import { roomsDummyData } from '../../assets/assets';
import Title from "../../Components/Title";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

/**
 * List Rooms Component
 * Displays all rooms owned by the hotel owner with availability toggle
 */
const ListRoom = () => {
  const [rooms, setRooms] = useState([]); // Hotel owner's rooms

  const { currency, axios, getToken, user } = useAppContext();

  // Fetch rooms for the authenticated hotel owner
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setRooms(data.rooms || []);
      } else {
        toast.error(data.message || "Failed to load rooms");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error loading rooms");
    }
  };

  // Toggle room availability status
  const toggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        "/api/rooms/toggle-availability",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchRooms(); // Refresh the room list after toggling
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Load rooms when component mounts or user changes
  useEffect(() => {
    fetchRooms();
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />
      <p className="mt-4 text-gray-800">All Rooms</p>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Price / night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((room) => (
              <tr
                key={room._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-800">{room.roomType}</td>
                <td className="py-3 px-4 text-gray-800 max-sm:hidden">
                  {room.amenities.join(", ")}
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {currency}
                  {room.pricePerNight} / night
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => toggleAvailability(room._id)}
                    className={`px-3 py-1 rounded ${
                      room.isAvailable
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {room.isAvailable
                      ? "Mark as Unavailable"
                      : "Mark as Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
