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
  console.log(path)

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-transparent text-white relative z-50">
      {/* Left: Logo */}
      <Link href="/">
        <Image
          src={LogoImage}
          alt="My logo image"
          height={40}
          width={40}
          className="rounded-lg"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex bg-[#333333]/60 rounded-full backdrop-blur-sm">
        <ul className="flex space-x-5">
          <li className={`p-4 px-5 ${
              path === "/?" ? "border-b-4 border-white-400" : ""
            }`}>
            <Link href="/" className="hover:text-white/80">
              Home
            </Link>
          </li>
          <li
            className={`p-4 px-5 ${
              path === "/i-am-feeling?" ? "border-b-4 border-white-400" : ""
            }`}
          >
            <Link href="/i-am-feeling" className="hover:text-white/80">
              I am Feeling
            </Link>
          </li>
          <li className={`p-4 px-5 ${
              path === "/chat?" ? "border-b-4 border-white-400" : ""
            }`}>
            <Link href="/chat" className="hover:text-white/80">
              Chat
            </Link>
          </li>
          <li className="p-4 px-5">
            <Link href="/about" className="hover:text-white/80">
              About
            </Link>
          </li>
        </ul>
      </nav>

          <div></div>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 ml-2 text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-[#1f1f1f] backdrop-blur-lg shadow-lg md:hidden">
          <ul className="flex flex-col">
            <li className="border-b border-gray-600 p-4">
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="border-b border-gray-600 p-4">
              <Link href="/i-am-feeling" onClick={() => setMenuOpen(false)}>I am Feeling</Link>
            </li>
            <li className="border-b border-gray-600 p-4">
              <Link href="/chat" onClick={() => setMenuOpen(false)}>Chat</Link>
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
