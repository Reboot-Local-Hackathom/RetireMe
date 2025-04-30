import React from 'react';
import { Link } from 'react-router-dom';
import horseLogo from '../assets/horselogo.png'; // Correct path

const NavBar = () => {
  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Category Report', path: '/report' },
    { name: 'Account', path: '/auth' }
  ];

  return (
    <nav className="bg-[#00543C] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-white text-2xl font-bold">
            <img src={horseLogo} alt="RetireMe Logo" className="h-10 w-10 object-contain" />
            <span className="text-white">RetireMe</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
                style={{ color: 'white' }} // Force white color for categories
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
