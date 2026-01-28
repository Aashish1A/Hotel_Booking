import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/appContext'

const FeaturedDestination = () => {
    const {rooms, navigate} = useAppContext();

    return rooms.length > 0 &&  (
        <div className='flex flex-col items-center px-6 md:px-17 lg:px-24 bg-slate-50 py-20'>
            <Title title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.' />
            <div className='flex flex-wrap justify-center gap-6 mt-20 w-full max-w-7xl'>
                {rooms.slice(0,4).map((room, index) => (
                    <div key={room._id} className='w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] border border-slate-200 rounded-xl overflow-hidden'>
                        <HotelCard room={room} index={index}/>
                    </div>
                ))}
            </div>

            <button onClick={() => {navigate("/rooms"); scrollTo(0,0)} } className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>View All Destination</button>
        </div>
  )
}

export default FeaturedDestination