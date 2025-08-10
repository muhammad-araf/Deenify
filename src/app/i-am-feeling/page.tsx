"use client";
import { useEffect, useState } from "react";

type Dua = {
  arabic: string;
  transliteration: string;
  translation: string;
};

type QuranicVerse = {
  reference: string;
  translation: string;
};

type EmotionData = {
  emotion: string;
  duas?: Dua[];
  quranic_verse?: QuranicVerse;
  note?: string;
};

const colorArray = [
  "#E6FFE6",
  "#F0FFF4",
  "#D4F5E9",
  "#E6F7FA",
  "#F5FAE6",
  "#E6FAF0",
];

export default function Page() {
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const randomColor = () =>
    colorArray[Math.floor(Math.random() * colorArray.length)];

  useEffect(() => {
    document.body.style.backgroundColor = "#292929ff";
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/feeling");
        const res = await response.json();

        if (Array.isArray(res?.emotions.emotions)) {
          setEmotions(res.emotions.emotions);
        } else {
          console.error("Invalid emotions data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (selectedEmotion) {
    const emotionData = emotions.find(
      (e) => e.emotion.toLowerCase() === selectedEmotion
    );

return (
  <div className="flex flex-col items-center min-h-screen w-full px-4 mt-20">
    <p className="text-2xl mb-4 pt-10 text-white tracking-widest text-center">
      <b>I am Feeling</b>{" "}
      <strong className="text-green-300">{emotionData?.emotion}</strong>
    </p>

    <div className="bg-[#1f4037] text-white p-6 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/2 space-y-6">
      
      {emotionData?.quranic_verse && (
        <div className="text-center">
          <p className="italic text-lg font-semibold">
            {emotionData.quranic_verse.reference}
          </p>
          <p className="mt-2">{emotionData.quranic_verse.translation}</p>
        </div>
      )}

      <div>
        {emotionData?.duas?.map((dua, i) => (
          <div key={i} className="bg-green-200/10 text-black rounded-lg p-4 mb-4">
            <h1 className="text-white font-bold text-2xl mt-2">
              {dua.arabic}
            </h1>
            <p className="mt-2">{dua.transliteration}</p>
            <p className="mt-2 text-white/60">{dua.translation}</p>
          </div>
        ))}
      </div>

      {emotionData?.note && (
        <div className="bg-yellow-100/40 text-black p-4 rounded-lg text-center">
          <p className="font-medium">
            <strong>Note: </strong>{emotionData.note}
          </p>
        </div>
      )}
    </div>

    <button
      onClick={() => setSelectedEmotion(null)}
      className="mt-6 px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-500 transition"
    >
      ◀ Back
    </button>
  </div>
);
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 mt-20">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 pt-10 text-white tracking-widest text-center">
        I am Feeling
      </h1>
      <p className="text-sm sm:text-base mb-8 text-green-200 tracking-wider text-center">
        Select your emotion
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {emotions.map((emotion, i) => (
          <div
            key={i}
            className="p-2 cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setSelectedEmotion(emotion.emotion.toLowerCase())}
          >
            <div
              className="rounded-lg shadow-md flex justify-center items-center p-6 h-24 text-center"
              style={{ backgroundColor: randomColor() }}
            >
              <h2 className="text-base sm:text-lg font-semibold text-black">
                {emotion.emotion}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

