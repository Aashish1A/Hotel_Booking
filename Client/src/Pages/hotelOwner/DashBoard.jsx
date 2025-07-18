import React, { useState } from 'react'
import Title from '../../Components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'

const DashBoard = () => {

  // Placeholder for total bookings data
  const [dashboardData] = useState(dashboardDummyData);

  return (
    <div className=''>
      <Title align='left' font='outfit' title='DashBoard' subTitle='Monitor your room listings, track bookings and analyze revenue-all in one place. Stay updated with real-time insights to ensure smooth operations.' />

      <div className='flex gap-4 my-8'>
        {/* --------------Total Bookings-------------- */}
        <div className='bg-primary/3 border border-primary/10 rounded p-4 pr-8 flex '>
          <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Bookings</p>
            <p className='text-neutral-400 text-base'>{dashboardData.totalBookings}</p>
          </div>
        </div>
        {/* -------------Total Revenue-------------- */}
        <div className='bg-primary/3 border border-primary/10 rounded p-4 pr-8 flex '>
          <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10' />
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Revenue</p>
            <p className='text-neutral-400 text-base'>${dashboardData.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* -----------------Recent Bookings--------------- */}
      <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {dashboardData.bookings.map((booking, index) => (
              <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                <td className='py-3 px-4'>{booking.user.username}</td>
                <td className='py-3 px-4 max-sm:hidden'>{booking.room.roomType}</td>
                <td className='py-3 px-4 text-center'>${booking.totalPrice}</td>
                <td className='py-3 px-4 text-center'>
                  <span className={`px-2 py-1 rounded-full ${booking.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {booking.isPaid ? 'Paid' : 'Unpaid' }
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashBoard