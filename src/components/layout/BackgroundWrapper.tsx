"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isQuran = pathname === "/quran";
  const isFeeling = pathname.startsWith("/i-am-feeling");
  const isTasbeeh = pathname.startsWith("/tasbeeh");
  
  useEffect(() => {
      if (isHome) {
        document.body.style.backgroundColor = "#000000";
      }else if (isQuran) {
        document.body.style.backgroundColor = "#000000"; 
        
      }else if(isFeeling){
        document.body.style.backgroundColor = "#000000"; 
      
      }else if(isTasbeeh){
        document.body.style.backgroundColor = "#000000"; 
      }
      else{
        document.body.style.backgroundColor = "#292929";
      }
  }, [isHome]);

  return (
    <div className="relative min-h-screen overflow-hidden text-black dark:text-white">
      {isHome && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/assets/images/image.png')" }}
        />
      )}
      {isQuran && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/assets/images/quran.jpg')" }}
        />
      )}
      {isFeeling && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/assets/images/feelingbg.jpg')" }}
        />
      )}
      {isTasbeeh && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/assets/images/tasbeehbg.jpg')" }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>

  );
}
