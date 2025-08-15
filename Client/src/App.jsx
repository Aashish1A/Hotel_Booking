import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import AllRooms from "./Pages/AllRooms";
import Home from "./Pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import RoomDetails from "./Pages/RoomDetails";
import MyBooking from "./Pages/MyBooking";
import HotelReg from "./Components/HotelReg";
import Layout from "./Pages/hotelOwner/Layout";
import DashBoard from "./Pages/hotelOwner/DashBoard";
import AddRoom from "./Pages/hotelOwner/AddRoom";
import ListRoom from "./Pages/hotelOwner/ListRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/appContext";

/**
 * Main App Component
 * Handles routing and global layout based on user type (customer vs hotel owner)
 */
function App() {
  // Check if current route is hotel owner dashboard
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppContext();

  return (
    <>
      <Toaster />
      {/* Show main navbar only for customer pages */}
      {!isOwnerPath && <Navbar />}
      {/* Hotel registration modal overlay */}
      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          {/* Customer routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBooking />} />

          {/* Hotel owner routes with nested layout */}
          <Route path="/owner" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
