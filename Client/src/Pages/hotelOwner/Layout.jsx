import React from 'react'
import NavBar from '../../Components/hotelOwner/NavBar'
import SideBar from '../../Components/hotelOwner/SideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex h-screen flex-col'>
        <NavBar />
        <div className='flex h-full'>
            <SideBar />
            <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Layout