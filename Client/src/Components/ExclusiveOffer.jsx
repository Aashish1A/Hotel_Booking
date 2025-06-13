import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'
import Title from './Title'

const ExclusiveOffer = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-17 lg:px-24 xl:px-32 pt-20 pb-30'>
        <div className='flex flex-col md:flex-row items-center justify-between w-full'>
            <Title align='left' title='Exclusive Offers' subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.' />
            <button className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>
                View All Offers
                <img src={assets.arrowIcon} alt="arrow-icon"  className='group-hover:translate-x-1 transition-all'/>
            </button>
        </div>
        <div>
            {exclusiveOffers.map((item) => (
                <div>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default ExclusiveOffer