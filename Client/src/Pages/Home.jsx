import React from 'react'
import Hero from '../Components/Hero'
import FeaturedDestination from '../Components/FeaturedDestination'
import ExclusiveOffer from '../Components/ExclusiveOffer'
import UserTestimonial from '../Components/UserTestimonial'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedDestination />
        <ExclusiveOffer />
        <UserTestimonial />
        <NewsLetter />
    </>
  )
}

export default Home