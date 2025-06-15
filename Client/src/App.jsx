import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar"
import AllRooms from "./Pages/AllRooms";
import Home from "./Pages/Home"
import {Routes, Route, useLocation} from "react-router-dom";
import RoomDetails from "./Pages/RoomDetails";
import MyBooking from "./Pages/MyBooking";

function App() {

  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<AllRooms />} />
        <Route path='/rooms/:id' element={<RoomDetails />} />
        <Route path='/my-bookings' element={<MyBooking />} />
      </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App