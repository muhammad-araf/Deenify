"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type EmotionData = { emotion: string }

const Page = () => {
  const [datas, setData] = useState<EmotionData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

      const colorArray = [
        '#E6FFE6', // light mint
        '#F0FFF4', // very soft off-white green
        '#D4F5E9', // pale aqua green
        '#E6F7FA', // icy teal
        '#F5FAE6', // light lemon-lime
        '#E6FAF0'  // soft pastel mint
      ];

  const randomColor = () => colorArray[Math.floor(Math.random() * colorArray.length)]

    useEffect(()=>{
          document.body.style.backgroundColor = "#292929ff";
    },[])
  useEffect(() => {
    document.body.style.backgroundColor = "#292929ff"
    const getData = async () => {
      try {
        const response = await fetch('/api/feeling')
        const res = await response.json()
        console.log("API response:", res)

        if (Array.isArray(res.emotions.emotions)) {
          setData(res.emotions.emotions)
        } else {
          console.error("emotions is not an array")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center bg-transparent px-4 mt-20">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 pt-10 text-white tracking-widest text-center">
        I am Feeling
      </h1>
      <p className="text-sm sm:text-base mb-8 text-green-200 tracking-wider text-center">
        Select your emotion
      </p>

      {isLoading ? (
        <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {datas.map((data, i) => (
            <div
              key={i}
              className="p-2 cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => router.push(`/i-am-feeling/${data.emotion.toLowerCase()}`)}
            >
              <div
                className="rounded-lg shadow-md flex justify-center items-center p-6 h-24 text-center"
                style={{ backgroundColor: randomColor() }}
              >
                <h2 className="text-base sm:text-lg font-semibold text-black">
                  {data.emotion}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
