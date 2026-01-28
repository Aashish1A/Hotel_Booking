import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'
import { useEffect } from 'react'

const RecommendedHotels = () => {

    const {rooms, searchedCities} = useAppContext();
    const [recommended, setRecommended] = useState([]);

    const filterHotels = () => {
        const filteredHotels = rooms.slice().filter(room => 
            searchedCities.includes(room.hotel.city)
        );
        setRecommended(filteredHotels);
    }

    useEffect(() => {
      filterHotels();
    }, [searchedCities, rooms]);

  return recommended.length > 0 &&  (
    <div className='flex flex-col items-center px-6 md:px-17 lg:px-24 bg-slate-50 py-20'>
        <Title title='Recommended Hotel' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.' />
        <div className='flex flex-wrap justify-center gap-6 mt-20 w-full max-w-7xl'>
            {recommended.slice(0,4).map((room, index) => (
                <div key={room._id} className='w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] border border-slate-200 rounded-xl overflow-hidden'>
                    <HotelCard room={room} index={index}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default RecommendedHotels;