import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets';
import Title from '../../Components/Title';

const ListRoom = () => {

  const [rooms] = useState(roomsDummyData); // Placeholder for room data

  return (
    <div>
        <Title align='left' font='outfit' title='Room Listings' subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.' />
        <p className='mt-4 text-gray-800'>All Rooms</p>
        
        <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
              <th className='py-3 px-4 text-gray-800 font-medium'>Price / night</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Action</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {rooms.map((list, index) => (
              <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                <td className='py-3 px-4 border-t text-gray-700 border-gray-300'>{list.roomType}</td>
                <td className='py-3 px-4 border-t text-gray-700 border-gray-300 max-sm:hidden'>{list.amenities.join(', ')}</td>
                <td className='py-3 px-4 border-t text-gray-700 border-gray-300'>${list.pricePerNight}</td>
                <td className='py-3 px-4 border-t text-red-500 border-gray-300 text-center'>
                  <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                    <input type="checkbox" className='sr-only peer' checked={list.isAvailable} />
                    <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200 relative'>
                      <span className='absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform duration-200'></span>   
                    </div>   
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListRoom