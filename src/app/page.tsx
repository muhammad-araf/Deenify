"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
   
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center text-white">Welcome to <strong>Denify</strong></h1>
        <p className="text-lg text-center text-gray-400">
          Your AI companion for <strong className="text-white">Islamic knowledge</strong> and <strong className="text-white">emotional support</strong>.
        </p>
        <button className="bg-[#ffffff] text-black tracking-wides px-4 py-2 rounded-lg hover:bg-[#d3d3d3] transition-colors cursor-pointer w-[80%]" onClick={()=>router.push('/chat')}><strong>Chat</strong></button>
      </main>
    </div>
  );
}
