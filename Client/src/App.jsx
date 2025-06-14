import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import {Routes, Route, useLocation} from "react-router-dom";

function App() {

  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App