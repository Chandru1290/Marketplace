import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/home" className="text-2xl font-bold">DKMART</Link>
        <div className={`hidden lg:flex ${isOpen ? 'flex' : ''} flex-col lg:flex-row`}>
          <Link to="/home" className="text-white ml-4 py-2 lg:py-0">Home</Link>
          <Link to="/profile" className="text-white ml-4 py-2 lg:py-0">Profile</Link>
          <Link to="/login" className="text-white ml-4 py-2 lg:py-0">Login</Link>
        </div>
        <button className="text-white lg:hidden" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
