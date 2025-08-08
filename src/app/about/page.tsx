"use client"
import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-transparent text-white text-center">
      <h1 className="text-4xl font-semibold tracking-widest mb-6">About Us</h1>

      <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
        <strong>Deeenify</strong> is your AI companion for <strong>Islamic knowledge</strong> and <strong>emotional support.</strong><br />
        Our mission is to offer a meaningful platform where users can explore Islamic teachings, seek guidance, and find comfort in their everyday lives.
      </p>

      <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mt-6">
        Whether you are searching for answers, emotional healing, or simply want to learn more about Islam, <strong>Deeenify is here to support you.</strong>
      </p>

      <p className="text-lg text-gray-200 max-w-2xl leading-relaxed mt-6">
        Thank you for choosing Deeenify as your companion on this journey of knowledge and self-discovery.
      </p>

      <div className="bg-white/10 backdrop-blur-md mt-10 p-6 rounded-xl w-full max-w-md shadow-lg">
        <p className="text-md text-gray-300 mb-4">For any inquiries or feedback, feel free to reach out to us:</p>
        <div className="flex justify-center gap-4">
          <a
            href="https://linkedin.com/in/muhammad-araf/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-400 text-black font-medium px-4 py-2 rounded-lg hover:bg-amber-300 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/muhammad-araf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-400 text-black font-medium px-4 py-2 rounded-lg hover:bg-amber-300 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
