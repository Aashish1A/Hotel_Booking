import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <img src={assets.logoWhite} alt="StayFinder Logo" />
          <p className="text-gray-300 text-sm leading-relaxed my-6">
            StayFinder is your gateway to exceptional accommodations worldwide.
            We connect travelers with unique properties and unforgettable
            experiences.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <img src={assets.facebookIcon} alt="facebook" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              <img src={assets.instagramIcon} alt="instagram" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
              <img src={assets.twitterIcon} alt="twitter" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
              <img src={assets.linkendinIcon} alt="linkedin" className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-lg text-white font-bold mb-4">COMPANY</p>
          <ul className="flex flex-col gap-3 text-sm">
            <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            <li><a href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
            <li><a href="/press" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
            <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <p className="text-lg text-white font-bold mb-4">SUPPORT</p>
          <ul className="flex flex-col gap-3 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Safety Information</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cancellation Policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Accessibility</a></li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="text-lg text-white font-bold mb-4">STAY UPDATED</p>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            Subscribe to our newsletter for travel inspiration, exclusive deals,
            and special offers.
          </p>
          <div className="flex items-center">
            <input type="email" className="flex-1 bg-white/10 border border-white/20 rounded-l-lg h-12 px-4 outline-none text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Enter your email"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 h-12 px-6 rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              <img
                src={assets.arrowIcon}
                alt="subscribe"
                className="w-4 h-4 brightness-0 invert"
              />
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 mt-12 mb-8" />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-8">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} StayFinder. All rights reserved.
        </p>
        <ul className="flex items-center gap-6 text-sm">
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;