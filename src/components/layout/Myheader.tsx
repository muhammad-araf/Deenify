"use client";
import React, { useState } from "react";
import Image from "next/image";
import LogoImage from "../../../public/assets/images/image.jpg";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Myheader = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  const pathname = usePathname();
  const searchParams = useSearchParams();
  const path = `${pathname}?${searchParams.toString()}`;

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-transparent text-white z-50">
      <Link href="/" className="flex items-center">
        <Image
          src={LogoImage}
          alt="My logo image"
          height={40}
          width={40}
          className="rounded-full"
          
        />
        <span className="ml-2 text-lg font-bold">Deeenify</span>

        
      </Link>

<nav className="hidden md:flex bg-[#57ff7331] backdrop-blur-lg rounded-3xl mr-45">
  <ul className="flex space-x-5">
    <li
      className={`relative p-4 px-5 ${
        path==='/?'
          ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:border-b-2 after:border-green-200" 
          : ""
      }`}
    >
      <Link href="/" className="hover:text-white/80">Home</Link>
    </li>

    <li
      className={`relative p-4 px-5 ${
        path.startsWith("/i-am-feeling") 
          ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:border-b-2 after:border-green-200" 
          : ""
      }`}
    >
      <Link href="/i-am-feeling" className="hover:text-white/80">I am Feeling</Link>
    </li>

    <li
      className={`relative p-4 px-5 ${
        path.startsWith('/chat')
          ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:border-b-2 after:border-green-200" 
          : ""
      }`}
    >
      <Link href="/chat" className="hover:text-white/80">Chat</Link>
    </li>

    <li
      className={`relative p-4 px-5 ${
        path .startsWith('/quran') 
          ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:border-b-2 after:border-green-200" 
          : ""
      }`}
    >
      <Link href="/quran" className="hover:text-white/80">Quran</Link>
    </li>
    <li
      className={`relative p-4 px-5 ${
        path .startsWith('/hadith') 
          ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:border-b-2 after:border-green-200" 
          : ""
      }`}
    >
      <Link href="/hadith" className="hover:text-white/80">Hadith</Link>
    </li>
    <li
      className={`relative p-4 px-5 ${
        path .startsWith('/tasbeeh') 
          ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:border-b-2 after:border-green-200" 
          : ""
      }`}
    >
      <Link href="/tasbeeh" className="hover:text-white/80">Tasbeeh</Link>
    </li>

    <li
      className={`relative p-4 px-5 ${
        path .startsWith('/about') 
          ? "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:border-b-2 after:border-green-200" 
          : ""
      }`}
    >
      <Link href="/about" className="hover:text-white/80">About</Link>
    </li>
  </ul>
</nav>


          <div></div>
      <button
        className="md:hidden p-2 ml-2 text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-[#1e672a87] backdrop-blur-lg shadow-lg md:hidden rounded-4xl">
          <ul className="flex flex-col">
            <li className="border-b-2 border-green-200 p-4">
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="border-b-2 border-green-200 p-4">
              <Link href="/i-am-feeling" onClick={() => setMenuOpen(false)}>I am Feeling</Link>
            </li>
            <li className="border-b-2 border-green-200 p-4">
              <Link href="/chat" onClick={() => setMenuOpen(false)}>Chat</Link>
            </li>
            <li className="border-b-2 border-green-200 p-4">
              <Link href="/quran" onClick={() => setMenuOpen(false)}>Quran</Link>
            </li>
            <li className="border-b-2 border-green-200 p-4">
              <Link href="/hadith" onClick={() => setMenuOpen(false)}>Hadith</Link>
            </li>
            <li className="border-b-2 border-green-200 p-4">
              <Link href="/tasbeeh" onClick={() => setMenuOpen(false)}>Tasbeeh</Link>
            </li>
            <li className="p-4">
              <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Myheader;
