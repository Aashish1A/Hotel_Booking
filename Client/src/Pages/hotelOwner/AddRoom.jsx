import React, { useState } from 'react'
import Title from '../../Components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })

  const [input, setInput] = useState({
    roomType: '',
    pricePerNight: '',
    amenities: {
      'Free Wi-Fi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    }
  })

  return (
    <form>
      <Title align='left' font='outfit' title='AddRoom' subTitle='Fill in the details carefully and accurate room details, pricing, and amenities to enhance the user booking experience.' /> 

      {/* Upload Area of Images */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key)=> (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
            <input type="file" accept='image/*' id={`roomImage${key}`} hidden  onChange={e=> setImages({...images, [key] : e.target.files[0]})}/>
          </label>
        ))}
      </div>

      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>

        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select value={input.roomType} onChange={e=> setInput({...input, roomType: e.target.value})} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <p className='mt-4 text-gray-800'>
            Price <span className='text-xs'>/night</span>
          </p>
          <input value={input.pricePerNight} onChange={e => setInput({...input, pricePerNight: e.target.value})} type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24' />
        </div>
      </div>

      <p className='text-gray-800 mt-4'>Amenities</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2'>
        {Object.keys(input.amenities).map((amenity, index) => (
          <label key={index} className='flex items-center gap-2'>
            <input type="checkbox" checked={input.amenities[amenity]} onChange={e => setInput({
              ...input,
              amenities: {
                ...input.amenities,
                [amenity]: e.target.checked
              }
            })} />
            <span>{amenity}</span>
          </label>
        ))}
      </div>

      <button className='bg-cyan-300 text-white px-8 py-2 rounded mt-8 cursor-pointer'>Add Room</button>
    </form>
  )
}

export default AddRoom