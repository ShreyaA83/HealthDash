import React from 'react';
import CustomCursor from './CustomCursor';
import Footer from './Footer';

const Layout = ({ children, headingText, headingClass }) => {
  return (
    <div className="relative min-h-screen w-full bg-custom-gradient">
      <CustomCursor />
      <div className="relative z-10 container mx-auto px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-10 lg:py-12 xl:py-16">
        <h1 className={`text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ${headingClass}`}>
          <span className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {headingText || 'Nutrition Hub'}
          </span>
        </h1>
        <div className="pb-10 md:pb-20">
          {children}
          <CustomCursor />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
