import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <Link to="/" className="text-xl font-bold">
          RetireMe
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
