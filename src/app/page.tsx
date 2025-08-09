"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
<div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen bg-gradient-to-b from-[#11182700] to-[#132d2499] items-center justify-items-center p-8 pb-20  sm:p-20">

   
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center text-white">Welcome to <strong className="text-green-400">Denify</strong></h1>
        <p className="text-lg text-center text-gray-400">
          Your AI companion for <strong className="text-white">Islamic knowledge</strong> and <strong className="text-white">emotional support</strong>.
        </p>
        <div className="flex justify-center gap-4">
                  <button
                    onClick={()=>router.push('/i-am-feeling')}
                    className="bg-green-200 text-black font-medium px-4 py-2 rounded-lg hover:bg-green-100 transition cursor-pointer"
                  >
                    I am Feeling
                  </button>
                  <button
                    onClick={()=>router.push('/quran')}
                    className="bg-green-200 text-black font-medium px-4 py-2 rounded-lg hover:bg-green-100 transition cursor-pointer"
                  >
                    Listen Quran
                  </button>
                  <button
                    onClick={()=>router.push('/chat')}
                    className="bg-green-200 text-black font-medium px-4 py-2 rounded-lg hover:bg-green-100 transition cursor-pointer"
                  >
                    Chat with AI
                  </button>
                  <button
                    onClick={()=>router.push('/tasbeeh')}
                    className="bg-green-200 text-black font-medium px-4 py-2 rounded-lg hover:bg-green-100 transition cursor-pointer"
                  >
                    Tasbeeh
                  </button>
                </div>
      </main>
    </div>
  );
}
