import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import horseLogo from '../assets/horselogo.png'; // Correct path

const Footer = () => {

  return (
    <footer className="bg-[#00543C] text-white p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-2xl mb-4 text-white">RetireMe</h3>
          <p className="text-sm text-gray-300">
            Retirement Journey
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="text-sm hover:underline text-gray-300">
                Home
              </Link>
              <li>
              <Link to="/AboutUs" className="text-sm hover:underline text-gray-300">
                AboutUs
              </Link>
            </li>
            </li>
            {/* Add other links as needed */}
          </ul>
        </div>

        {/* Social Media */}
        <div className="mt-6 md:mt-0">
          <h3 className="font-bold text-xl mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-300">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="container mx-auto text-center text-sm mt-8 border-t border-gray-700 pt-4">
        <div className="mb-2">
          <Link to="/privacy-policy" className="hover:underline text-gray-400">
            Privacy Policy
          </Link>{' '}
          | © 2025 RetireMe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
