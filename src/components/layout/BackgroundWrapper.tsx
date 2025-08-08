"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isQuran = pathname === "/quran";
  console.log(isQuran)
  useEffect(() => {
    if (isHome) {
      document.body.style.backgroundColor = "#000000";
    }else if (isQuran) {
      document.body.style.backgroundColor = "#000000"; 
    }else{
      document.body.style.backgroundColor = "#292929";
    }
  }, [isHome]);

  return (
    <div className="relative min-h-screen overflow-hidden text-black dark:text-white">
      {isHome && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/assets/images/image.png')" }}
        />
      )}
      {isQuran && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/assets/images/quran.jpg')" }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>

  );
}
