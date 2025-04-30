import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Sign Up/In', path: '/auth' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Reports', path: '/reports' },
    { name: 'Settings', path: '/settings' }
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            RetireMe
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
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