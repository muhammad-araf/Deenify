import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Myheader from "@/components/layout/Myheader";
import BackgroundWrapper from "@/components/layout/BackgroundWrapper";
import { Suspense } from "react";
import Image from "next/image";

<Image
  src="/image.ico"  // Since it's in /public
  alt="Site Logo"
  width={40}
  height={40}
  className="rounded-full"
/>


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Denify",
  description: "An Feeling Dua and Islamic AI chatbot that provides authentic answers from the Quran and Hadith. Ask questions about Islam, Duas, prayers, and teachings — all in a structured and respectful format.",
  icons: {
    icon: "/image.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BackgroundWrapper>
          <Suspense fallback={<div>Loading header...</div>}>
            <Myheader />
          </Suspense>
          {children}
        </BackgroundWrapper>
      </body>
    </html>
  );
}
