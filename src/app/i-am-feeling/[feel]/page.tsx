"use client";
import { useEffect, useState } from "react";

type Dua = {
  arabic: string;
  transliteration: string;
  translation: string;
};

type EmotionData = {
  emotion: string;
  duas: Dua[];
};

const Page = () => {
  const [data, setData] = useState<EmotionData | null>(null);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const extractedEmotion =
      currentUrl.split("/").pop()?.replace(/\?.*$/, "") || " ";

    const getData = async () => {
      const response = await fetch(`/api/feeling/${extractedEmotion}`);
      const res = await response.json();
      setData(res);
    };
    getData();
  }, []);

  return (
    <>
      {data ? (
        <div className="flex flex-col items-center min-h-screen bg-transparent w-full">
          <p className="text-2xl mb-4 pt-10 text-white tracking-widest">
            I am Feeling <strong>{data.emotion}</strong>
          </p>

          <div className="w-[92%] sm:w-1/2 md:w-1/3">
            {data.duas.map((dua, i: number) => (
              <div
                key={i}
                className="rounded-tl-[70px] rounded-br-[70px] shadow-md h-auto w-auto mx-auto flex flex-col justify-center items-center bg-[#ffeddc] text-black mb-4"
              >
                <div className="flex flex-col items-center m-10 text-center">
                  <strong>
                    <h2>#{i + 1}</h2>
                  </strong>
                  <strong>
                    <h1 className="text-orange-400">&quot;{dua.arabic}&quot;</h1>
                  </strong>
                  <br />
                  {dua.transliteration}
                  <br />
                  <br />
                  {dua.translation}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-10 h-10 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default Page;
