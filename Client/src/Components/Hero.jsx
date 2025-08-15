import React from 'react'
import { assets, cities } from '../assets/assets'
import { useState } from 'react'
import { useAppContext } from '../context/appContext';

const Hero = () => {

    const {navigate, getToken, axios, setSearchedCities} = useAppContext();
    // State to manage the destination input
    const [destination, setDestination] = useState("");

    const onSearch = async (e) => {
        e.preventDefault();
        navigate(`/rooms?destination=${destination}`);
        // call api to save recent search cities
        try {
            const token = await getToken();
            await axios.post(
                "/api/user/store-recent-search",
                { recentSearchedCities: destination },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Update the context with the new searched cities
            setSearchedCities((prevCities) => {
                const updatedSearchedCities = [...prevCities, destination];
                if(updatedSearchedCities.length > 3) {
                    updatedSearchedCities.shift(); // Keep only the last 3 cities
                }
                return updatedSearchedCities;
            });
        } catch (error) {
            console.error("Error saving recent search city:", error);
        }
    }

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-cover bg-no-repeat bg-center h-screen w-full'>
        <p className='bg-[#49b9ff]/50 px-3.5 py-1 rounded-full mt-20'>The Ultimate Hotel Experience</p>
        <h1 className='font-playFair text-2xl md:text-5xl md:text-[56px] md:leading[56px] font-bold md:font-extrabold max-w-xl mt-4'>Discover Your Perfect Gateway Destination</h1>
        <p className='max-w-130 mt-2 text-sm md:text-base'>Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.</p>

        <form onSubmit={onSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calenderIcon" className='h-4' />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input onChange={(e) => setDestination(e.target.value)} value={destination} list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                    {cities.map((city, i) => (
                        <option key={i} value={city} />
                    ))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calenderIcon" className='h-4' />    
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calenderIcon" className='h-4' />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src={assets.searchIcon} alt="searchIcon" className='h-7' />
                <span>Search</span>

            </button>
        </form>
    </div>
  )
}

export default Hero