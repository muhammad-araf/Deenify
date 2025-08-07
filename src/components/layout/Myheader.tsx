"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import LogoImage from '../../../public/assets/images/image.jpg';
import { usePathname, useSearchParams } from 'next/navigation';
// import { Menu, X, User, LogOut, Settings, Moon, Sun } from 'lucide-react'
import {Moon, Sun } from 'lucide-react'
import Link from 'next/link';
const Myheader = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? '#292929ff' : '#ffffff'
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.body.style.transition = 'background-color 0.7s ease, color 0.7s ease';
  };
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const path = `${pathname}?${searchParams.toString()}`
  console.log(path)
  
  return (
    <div>
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white bg-transparent">
            {/* <h1 className="text-xl font-bold">My Website</h1> */}
            <div></div>
            <nav className='bg-[#333333]/60 rounded-lg backdrop-blur-sm backdrop-blur'>
            <ul className="flex space-x-5">
                <li className="p-4 px-8 py-2" ><Link href="/" className="hover:underline">
                <Image src={LogoImage} alt='My logo image' height={40} width={40}  className='rounded-lg' ></Image>
                </Link></li>
                <li className={`p-4 px-5  ${path==="/?"?'border-b-3-red':''}`} ><Link href="/" className="hover:text-white/80">Home</Link></li>
                <li className={`p-4 px-5  ${path==="/i-am-feeling?"?'border-b-4 border-red-400':''}`}><Link href="/i-am-feeling" className="hover:text-white/80">I am Feeling</Link></li>

                <li className={`p-4 px-5 ${path==="/"?'border-b-3':''}`}><Link href="/contact" className="hover:text-white/80">Chat</Link></li>
                <li className={`p-4 px-5 ${path==="/"?'border-b-3':''}`}><Link href="/contact" className="hover:text-white/80">Login</Link></li>
            </ul>
            </nav>
            <div className="div">
              {
              <button onClick={toggleDarkMode} className="bg-gray-200 p-2 rounded-full hover:bg-gray-200 focus:outline-none cursor-pointer" >
                {isDarkMode ? <Sun className="text-black" /> : <Moon className="text-black" />}
              </button>

              }
            </div>
        </header>
    </div>
  )
}

export default Myheader