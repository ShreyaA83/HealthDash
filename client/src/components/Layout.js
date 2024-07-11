// Layout.js

import React from 'react';
import CustomCursor from './CustomCursor';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-custom-gradient">
      <CustomCursor />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-20 pt-10">
        <h1 className=" text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pb-5">
          <span className="text-7xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Nutrition Hub</span>
        </h1>
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
