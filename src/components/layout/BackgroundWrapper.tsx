"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isQuran = pathname === "/quran";
  const isFeeling = pathname.startsWith("/i-am-feeling");
  const isTasbeeh = pathname.startsWith("/tasbeeh");
  const isAbout = pathname.startsWith("/about");
  const isChat = pathname.startsWith("/chat");

  return (
    <div className="relative   text-black dark:text-white">
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
      {isChat && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{ backgroundImage: "url('/assets/images/tasbeehbg.jpg')" }}
        />
      )}
      {isAbout && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: "url('/assets/images/aboutbg.jpg')" }}
        />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>

  );
}
