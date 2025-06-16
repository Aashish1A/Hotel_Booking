import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar"
import AllRooms from "./Pages/AllRooms";
import Home from "./Pages/Home"
import {Routes, Route, useLocation} from "react-router-dom";
import RoomDetails from "./Pages/RoomDetails";
import MyBooking from "./Pages/MyBooking";
import HotelReg from "./Components/HotelReg";
import Layout from "./Pages/hotelOwner/Layout";
import DashBoard from "./Pages/hotelOwner/DashBoard";
import AddRoom from "./Pages/hotelOwner/AddRoom";
import ListRoom from "./Pages/hotelOwner/ListRoom";

function App() {

  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<AllRooms />} />
        <Route path='/rooms/:id' element={<RoomDetails />} />
        <Route path='/my-bookings' element={<MyBooking />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="list-room" element={<ListRoom />} />
        </Route>
      </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App