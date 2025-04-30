// src/components/Heroes.jsx
import React from 'react';

const Heroes = ({ title, subtitle }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white text-center bg-black">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/Horse.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Text content */}
      <div className="relative z-20 max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-xl md:text-2xl font-light mt-6">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default Heroes;
