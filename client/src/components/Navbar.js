// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-2 mx-auto w-full max-w-screen-lg shadow-lg rounded-xl z-50 px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <CustomCursor />
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Clinanalytics</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'} className="text-white focus:outline-none">
            {/* Animated Hamburger */}
            <div className={`hamburger ${isOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Links for Desktop */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-white hover:text-blue-400">Home</Link></li>
          <li><Link to="/about" className="text-white hover:text-blue-400">About</Link></li>
          <li><Link to="/services" className="text-white hover:text-blue-400">Services</Link></li>
          <li><Link to="/contact" className="text-white hover:text-blue-400">Contact</Link></li>
        </ul>

        {/* Links for Mobile */}
        <ul className={`flex flex-col space-y-4 bg-gray-800 md:hidden fixed top-0 left-0 w-full h-screen items-center justify-center transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <li><Link onClick={toggleMenu} to="/" className="text-white text-2xl hover:text-blue-400">Home</Link></li>
          <li><Link onClick={toggleMenu} to="/about" className="text-white text-2xl hover:text-blue-400">About</Link></li>
          <li><Link onClick={toggleMenu} to="/services" className="text-white text-2xl hover:text-blue-400">Services</Link></li>
          <li><Link onClick={toggleMenu} to="/contact" className="text-white text-2xl hover:text-blue-400">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
