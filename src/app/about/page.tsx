"use client"
import React from 'react';
import {  Heart } from "lucide-react";


const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center pt-24 pb-16 px-4">
      <section className="w-full max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6 fade-in">
            By Muhammad Araf
            <Heart className="w-4 h-4 ml-2" />
            
          </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 slide-up">
          About ME
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto slide-up">
          <span className="font-semibold text-green-600">Deenify</span> is your AI companion for <span className="font-semibold text-green-600">Islamic knowledge</span> and <span className="font-semibold text-green-600">emotional support</span>.<br />
          My mission is to offer a meaningful platform where users can explore Islamic teachings, seek guidance, and find comfort in their everyday lives.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="card p-8 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-2">Whether you are searching for answers, emotional healing, or simply want to learn more about Islam, <span className="font-semibold text-green-600">Deenify is here to support you.</span></p>
          </div>
          <div className="card p-8 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Promise</h2>
            <p className="text-gray-600 mb-2">Thank you for choosing <span className="font-semibold text-green-600">Deenify</span> as your companion on this journey of knowledge and self-discovery.</p>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl w-full max-w-md shadow-lg mx-auto">
          <p className="text-md text-gray-700 mb-4">For any inquiries or feedback, feel free to reach out to us:</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/muhammad-araf-b978b6333/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/muhammad-araf/Deenify"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Source Code
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
