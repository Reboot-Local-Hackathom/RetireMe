import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">About Free Pizza Team</h1>
        <p className="text-lg text-gray-600 mt-4">
          Discover the story behind Free Pizza Team and our commitment to excellence.
        </p>
      </header>

      <section className="mb-12">
        <div className="bg-gray-100 shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-700 mt-4">
            Our mission is to empower individuals through high-quality experiences. We believe in the
            power of teamwork and dedication to transform projects and outcomes for the better.
          </p>
        </div>
      </section>

      <div className="my-12 border-t border-gray-300"></div>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Jordan Taylor", role: "Project Manager" },
            { name: "Ben Snellgrove", role: "Backend Developer" },
            { name: "Mattew Hamer", role: "Frontend Developer" },
            { name: "Alex Terry", role: "Frontend Developer" },
            { name: "Troy Cooper", role: "Full-Stack Developer" },
            { name: "Jeno Manivcsuk", role: "Infrastructure Developer" },
            { name: "Muhammad Rehman Zulfiquar", role: "Frontend Developer" },
          ].map((member, index) => (
            <div key={index} className="shadow-lg p-6 text-center rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
