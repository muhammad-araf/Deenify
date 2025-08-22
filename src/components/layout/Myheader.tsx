"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoImage from "../../../public/assets/images/image.jpg";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X, Home, Heart, MessageCircle, BookOpen, Book, RotateCcw, Info } from "lucide-react";
import Link from "next/link";

const Myheader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const path = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/i-am-feeling", label: "I am Feeling", icon: Heart },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/quran", label: "Quran", icon: BookOpen },
    { href: "/hadith", label: "Hadith", icon: Book },
    { href: "/tasbeeh", label: "Tasbeeh", icon: RotateCcw },
    { href: "/about", label: "About", icon: Info },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return path === "/?" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src={LogoImage}
                alt="Deenify Logo"
                height={40}
                width={40}
                className="rounded-full ring-2 ring-green-500/40 group-hover:ring-green-500/40 transition-all duration-200"
              />
            </div>
            <span className={`text-xl font-bold transition-colors duration-200 ${
              scrolled ? 'text-gray-900' : 'text-green-400'
            } group-hover:text-green-600`}>
              Deenify
            </span>
          </Link>

          <nav className="hidden lg:flex">
            <div className={`flex items-center space-x-1 rounded-full px-2 py-2 transition-all duration-300 ${
              scrolled 
                ? 'bg-gray-50/80 backdrop-blur-sm' 
                : 'bg-white/10 backdrop-blur-lg border border-white/20'
            }`}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      active
                        ? scrolled
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-green-600 text-white shadow-md'
                        : scrolled
                          ? 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                          : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <button
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-green-400 hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden">
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl border-t border-gray-100">
            <nav className="max-w-7xl mx-auto px-4 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Myheader;
