import React, { useEffect, useState, useCallback } from "react";
import Title from "../../Components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

/**
 * Hotel Owner Dashboard Component
 * Displays booking analytics and recent reservations for hotel owners
 */
const DashBoard = () => {
  const { currency, user, axios, getToken } = useAppContext();
  const [loading, setLoading] = useState(true);

  // Dashboard analytics state
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  // Fetch hotel booking analytics and recent bookings
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/bookings/owner", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setDashboardData(
          data.dashboardData || {
            bookings: [],
            totalBookings: 0,
            totalRevenue: 0,
          }
        );
      } else {
        toast.error(data.message || "Failed to load dashboard data");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [axios, getToken]); // Add dependencies for useCallback

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  return (
    <div className="">
      <Title
        align="left"
        font="outfit"
        title="DashBoard"
        subTitle="Monitor your room listings, track bookings and analyze revenue-all in one place."
      />

      <div className="flex gap-4 my-8">
        <div className="bg-primary/3 border border-primary/10 rounded p-4 pr-8 flex ">
          <img
            src={assets.totalBookingIcon}
            alt=""
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">
              {dashboardData?.totalBookings || 0}
            </p>
          </div>
        </div>
        <div className="bg-primary/3 border border-primary/10 rounded p-4 pr-8 flex ">
          <img
            src={assets.totalRevenueIcon}
            alt=""
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              {currency} {dashboardData?.totalRevenue || 0}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Bookings
      </h2>
      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Total Amount
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData?.bookings?.length > 0 ? (
              dashboardData.bookings.map((booking, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    {booking.user?.userName || "Unknown User"}
                  </td>
                  <td className="py-3 px-4 max-sm:hidden">
                    {booking.room?.roomType || "Unknown Room"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {currency} {booking.totalPrice || 0}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        booking.isPaid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoard;
