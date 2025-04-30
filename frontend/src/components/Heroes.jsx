import React from 'react';

const Heroes = ({ title, subtitle }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black pt-16">
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

      {/* Overlay (optional for darkening) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      {/* Foreground content */}
      <div className="relative z-20 flex items-center justify-center w-full h-full text-white text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight text-white">
            {title}
          </h1>
          <p className="text-xl md:text-2xl font-light mt-6">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Heroes;
