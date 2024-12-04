import React from "react";
import Logo from "../assets/Logo.png"; // Ensure the correct path to the logo file

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-1">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-10 lg:space-y-0">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <img
            src={Logo}
            alt="Go By Rail Logo"
            className="w-16 lg:w-20"
          />
          <h2 className="text-xl font-bold">Go By Rail</h2>
          <p className="text-sm text-gray-300 max-w-xs text-center lg:text-left">
            Your trusted partner for seamless and smart rail journeys.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="grid grid-cols-2 gap-4 lg:gap-6 text-center lg:text-left">
          <a href="#about" className="text-sm hover:underline">About Us</a>
          <a href="#mobile" className="text-sm hover:underline">Mobile</a>
          <a href="#privacy" className="text-sm hover:underline">Privacy</a>
          <a href="#terms" className="text-sm hover:underline">Terms of Use</a>
          <a href="#career" className="text-sm hover:underline">Careers</a>
          <a href="#support" className="text-sm hover:underline">Customer Support</a>
        </nav>

        {/* Newsletter Section */}
        <div className="w-full lg:w-auto text-center lg:text-left">
          <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
          <p className="text-sm text-gray-300 mb-4">
            Subscribe to our newsletter for travel updates, deals, and tips.
          </p>
          <form className="flex flex-col lg:flex-row items-center lg:items-stretch space-y-4 lg:space-y-0 lg:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full lg:w-auto p-3 rounded-lg focus:outline-none text-gray-800 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-3 border-t border-gray-700 pt-2 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Go By Rail. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
