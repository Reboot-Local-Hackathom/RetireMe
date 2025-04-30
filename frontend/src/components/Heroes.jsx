import React from 'react';
import './styles/heroes.css';

const Heroes = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/Horse.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-center">{title}</h1>
        <p className="text-xl md:text-2xl mt-4 text-center">{subtitle}</p>
      </div>
    </div>
  );
};

export default Heroes;
