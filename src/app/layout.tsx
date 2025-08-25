import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Myheader from "@/components/layout/Myheader";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deeenify | Islamic AI Chatbot for Quran, Hadith & Duas",
  description:
    "Deeenify is an Islamic AI chatbot that provides authentic answers from the Quran and Hadith. Ask questions about Islam, Duas, prayers, and teachings — all in a structured and respectful format.",
  keywords: [
    "Islamic chatbot",
    "AI Islamic guidance",
    "Quran chatbot",
    "Hadith chatbot",
    "Dua app",
    "Muslim app",
    "Islamic advice online",
    "Islamic guidance chatbot",
    "Ask Islamic questions",
    "Deeenify",
  ],
  icons: {
    icon: "/image.ico",
  },
  openGraph: {
    title: "Deeenify | Islamic AI Chatbot",
    description:
      "Ask questions about Islam, Quran, Hadith, and Duas with Deeenify — an AI-powered Islamic chatbot for authentic guidance.",
    url: "https://deeenify.vercel.app",
    siteName: "Deeenify",
    images: [
      {
        url: "/og-image.png", // create this in /public
        width: 1200,
        height: 630,
        alt: "Deeenify Islamic AI Chatbot",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeenify | Islamic AI Chatbot",
    description:
      "An Islamic AI chatbot that provides authentic answers from the Quran and Hadith. Ask Islamic questions, learn Duas, and more.",
    images: ["/og-image.png"], // same image for Twitter preview
    creator: "@yourhandle", // optional
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
        <Toaster position="top-center" reverseOrder={true} />
        <Suspense fallback={<div>Loading header...</div>}>
          <Myheader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
