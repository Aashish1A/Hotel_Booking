import React from "react";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Luxury Beach Resorts",
      description: "Wake up to pristine beaches and crystal-clear waters",
      image: "🏖️",
      features: [
        "Oceanfront views",
        "Private beaches",
        "Water sports",
        "Spa services",
      ],
    },
    {
      id: 2,
      title: "Mountain Retreats",
      description: "Escape to serene mountain landscapes and fresh air",
      image: "🏔️",
      features: [
        "Hiking trails",
        "Scenic views",
        "Cozy fireplaces",
        "Local cuisine",
      ],
    },
    {
      id: 3,
      title: "City Center Hotels",
      description: "Experience the pulse of the city from premium locations",
      image: "🏙️",
      features: [
        "Prime locations",
        "Modern amenities",
        "Business facilities",
        "Fine dining",
      ],
    },
    {
      id: 4,
      title: "Historic Properties",
      description: "Stay in beautifully restored heritage buildings",
      image: "🏰",
      features: [
        "Rich history",
        "Unique architecture",
        "Cultural tours",
        "Traditional decor",
      ],
    },
    {
      id: 5,
      title: "Eco-Friendly Stays",
      description: "Sustainable accommodations for conscious travelers",
      image: "🌿",
      features: [
        "Solar power",
        "Organic gardens",
        "Wildlife conservation",
        "Local community",
      ],
    },
    {
      id: 6,
      title: "Boutique Hotels",
      description: "Intimate and personalized luxury experiences",
      image: "✨",
      features: [
        "Unique design",
        "Personal service",
        "Local character",
        "Exclusive amenities",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      review:
        "The mountain retreat we booked exceeded all expectations. The views were breathtaking and the staff was incredibly welcoming.",
      rating: 5,
      experience: "Mountain Retreat",
    },
    {
      name: "Miguel Rodriguez",
      location: "Barcelona, Spain",
      review:
        "Perfect location in the city center. Everything was within walking distance and the hotel facilities were top-notch.",
      rating: 5,
      experience: "City Center Hotel",
    },
    {
      name: "Emma Chen",
      location: "Singapore",
      review:
        "The eco-friendly resort was amazing! We learned so much about sustainability while enjoying luxury amenities.",
      rating: 5,
      experience: "Eco-Friendly Stay",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-20">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Unforgettable Experiences
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Discover unique accommodations that create lasting memories
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">500+</span>
                <p className="text-sm opacity-90">Unique Properties</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">50+</span>
                <p className="text-sm opacity-90">Destinations</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">10k+</span>
                <p className="text-sm opacity-90">Happy Guests</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Types */}
      <div className="py-16">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Choose Your Perfect Experience
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From beachfront bliss to mountain adventures, from urban
                sophistication to rural tranquility - find the perfect
                accommodation that matches your travel dreams.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="text-4xl mb-4 text-center">
                      {experience.image}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center">
                      {experience.description}
                    </p>
                    <div className="space-y-2">
                      {experience.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-colors duration-300">
                      Explore Options
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              What Makes Our Experience Special
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Curated Selection
                </h3>
                <p className="text-sm text-gray-600">
                  Every property is handpicked for quality and uniqueness
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">
                  Round-the-clock assistance for a worry-free stay
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Best Price Guarantee
                </h3>
                <p className="text-sm text-gray-600">
                  Find a better price? We'll match it or refund the difference
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Personalized Service
                </h3>
                <p className="text-sm text-gray-600">
                  Tailored recommendations based on your preferences
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Testimonials */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              What Our Guests Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.review}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                    <p className="text-sm text-emerald-600 mt-1">
                      {testimonial.experience}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Perfect Experience Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Browse our curated collection of unique accommodations and create
              memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/rooms")}
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                Browse Hotels
              </button>
              <button
                onClick={() => (window.location.href = "/about")}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-colors duration-300"
              >
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
