import React from "react";
import { assets } from "../assets/assets";
import Title from "./Title";

const NewsLetter = () => {
  return (
    <div className="flex justify-center px-4 md:px-6">
      <div className="relative max-w-6xl w-full rounded-3xl overflow-hidden my-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-8 py-16 md:py-20 text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Inspired
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join our newsletter and be the first to discover new destinations,
              exclusive offers, and travel inspiration delivered straight to
              your inbox.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              className="flex-1 bg-white/10 backdrop-blur-sm px-6 py-4 border border-white/20 rounded-xl outline-none text-white placeholder-white/70 focus:border-white/50 focus:bg-white/20 transition-all w-full md:w-auto"
              placeholder="Enter your email address"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 w-full md:w-auto justify-center">
              Subscribe
              <img
                src={assets.arrowIcon}
                alt="arrow"
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          <p className="text-blue-200 mt-6 text-sm opacity-80">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
