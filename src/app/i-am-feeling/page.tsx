"use client"

import { useEffect, useState } from "react"
type EmotionData = { emotion: string };
import { useRouter } from "next/navigation";

const Page = () => {
    const [datas, setData] = useState<EmotionData[]>([]);
    const colorArray = ['#E6F0FA', '#F0E6F0', '#E0F4E0', '#FAE6E6', '#F4F0E0', '#E6F0E6'];
    const randomColor = () => {
        return colorArray[Math.floor(Math.random() * colorArray.length)];
    }
    const[isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
    const getData = async () => {
        try {
        const response = await fetch('/api/feeling');
        const res = await response.json();
        console.log("API response:", res);

        if (Array.isArray(res.emotions.emotions)) {
            setIsLoading(false);
            setData(res.emotions.emotions);
        } else {
            setIsLoading(false);
            console.error("emotions is not an array");
            setData([]);
        }
        } catch (error) {
            setIsLoading(false);
        console.error("Error fetching data:", error);
        setData([]);
        }
    };
    getData();
    }, []);

  return (
    <div>
        <div className="flex flex-col items-center  min-h-screen bg-transparent w-full">
        <h1 className="text-3xl font-bold mb-4 pt-10 text-red-400 tracking-widest  ">I am Feeling...</h1>
        <p className="text-sm mb-8 text-[#E26EE5] tracking-widest ">Select your emotion</p>
        {
            isLoading?
            <div className="w-10 h-10 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>:
            null
        }
        
            <div className="flex flex-wrap w-170">
            {datas.map((data, i) => (
                <div
                key={i}
                className="w-full sm:w-1/2 md:w-1/3 p-2"
                >
                <div
                className="rounded-lg shadow-md h-30 flex flex-col justify-center items-center cursor-pointer transition-transform transform hover:scale-105 p-4"
                style={{ backgroundColor: randomColor() }}
                onClick={() => {
                    router.push(`/i-am-feeling/${data.emotion.toLowerCase()}`);
                }}
                >
                    <h2 className="text-lg font-semibold text-black">{data.emotion}</h2>
                    {/* <p className="text-gray-600">Hii</p> */}
                </div>
                </div>
            ))}
        </div>
        </div>

        
    </div>
  )
}

export default Page