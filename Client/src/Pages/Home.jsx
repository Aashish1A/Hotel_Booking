import React from "react";
import Hero from "../Components/Hero";
import FeaturedDestination from "../Components/FeaturedDestination";
import ExclusiveOffer from "../Components/ExclusiveOffer";
import UserTestimonial from "../Components/UserTestimonial";
import NewsLetter from "../Components/NewsLetter";
import RecommendedHotels from "../Components/RecommendedHotels";

/**
 * Home Page Component
 * Landing page that displays all main sections of the hotel booking site
 */
const Home = () => {
  return (
    <>
      <Hero />
      <RecommendedHotels />
      <FeaturedDestination />
      <ExclusiveOffer />
      <UserTestimonial />
      <NewsLetter />
    </>
  );
};

export default Home;
