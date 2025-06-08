import React from 'react'
import { Link } from 'react-router-dom'

const HotelCard = ({room, index}) => {
  return (
    <Link  to={`/rooms/${room._id}`} onCanPlay={() => scrollTo(0, 0)} key={room._id}>
        <img src={room.images[0]} alt="" />
        
    </Link>
  )
}

export default HotelCard