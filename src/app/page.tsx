"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
<div className="font-sans grid grid-rows-[20px_1fr_20px] h-screen lg:h-[100vh] bg-gradient-to-b from-[#00000028] to-[rgba(19,54,31,0.38)] items-center justify-items-center p-8 pb-20  sm:p-20 ">

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center text-white">Welcome to <strong className="text-green-400">Denify</strong></h1>
        <p className="text-lg text-center text-gray-400">
          Your AI companion for <strong className="text-white">Islamic knowledge</strong> and <strong className="text-white">emotional support</strong>.
        </p>
        <p className="text-2xl text-center text-white"><strong className="text-green-200">Islamic News :</strong> <b>Added SOON!</b></p>
                <div className="flex justify-center gap-1 lg:gap-2 w-full">
                  
                </div>
      </main>
    </div>
  );
}
