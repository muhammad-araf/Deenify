"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Chapter {
  id: number;
  chapterEnglish: string;
  chapterUrdu: string;
  chapterArabic: string;
}

interface HadithAPIResponse {
  chapters: Chapter[];
}

interface Collection {
  id: string;
  name: string;
  author: string;
  deathYear: number | string;
  hadiths: number;
  chapters: number;
}

const HadithPage: React.FC = () => {
  const [chapter, setChapter] = useState<string>("");
  const [data, setData] = useState<HadithAPIResponse | null>(null);
  const [show, setShow] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const collections: Collection[] = [
    {
      id: "sahih-bukhari",
      name: "Sahih Bukhari",
      author: "Imam Bukhari",
      deathYear: 256,
      hadiths: 7276,
      chapters: 99,
    },
    {
      id: "sahih-muslim",
      name: "Sahih Muslim",
      author: "Imam Muslim",
      deathYear: 261,
      hadiths: 7564,
      chapters: 56,
    },
    {
      id: "al-tirmidhi",
      name: "Jami' Al-Tirmidhi",
      author: "Abu 'Isa Muhammad at-Tirmidhi",
      deathYear: 279,
      hadiths: 3956,
      chapters: 50,
    },
    {
      id: "abu-dawood",
      name: "Sunan Abu Dawood",
      author: "Imam Abu Dawood Sulayman ibn al-Ash'ath as-Sijistani",
      deathYear: 275,
      hadiths: 5274,
      chapters: 43,
    },
    {
      id: "ibn-e-majah",
      name: "Sunan Ibn-e-Majah",
      author: "Imam Muhammad bin Yazid ibn Majah al-Qazvini",
      deathYear: 273,
      hadiths: 4341,
      chapters: 39,
    },
    {
      id: "sunan-nasai",
      name: "Sunan An-Nasa'i",
      author: "Imam Ahmad an-Nasa'i",
      deathYear: 303,
      hadiths: 5761,
      chapters: 52,
    },
    {
      id: "mishkat",
      name: "Mishkat Al-Masabih",
      author: "Imam Khatib at-Tabrizi",
      deathYear: 741,
      hadiths: 6293,
      chapters: 29,
    },
    {
      id: "musnad-ahmad",
      name: "Musnad Ahmad",
      author: "Imam Ahmad ibn Hanbal",
      deathYear: 241,
      hadiths: 0,
      chapters: 14,
    },
    {
      id: "al-silsila-sahiha",
      name: "Al-Silsila Sahiha",
      author: "Allama Muhammad Nasiruddin Al-Bani",
      deathYear: "October 2, 1999",
      hadiths: 0,
      chapters: 28,
    },
  ];

  useEffect(() => {
    if (!chapter) return;
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://hadithapi.com/api/${chapter}/chapters?apiKey=$2y$10$RgqYzdFHt06wwvwnumtXPeUFbvkt0fP4eIEgS3XvVHYyap1li5c0O`
        );
        const res: HadithAPIResponse = await response.json();
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [chapter]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="mt-25 p-6 text-white w-[80%]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Hadith Collections
        </h1>

        {show ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-6">
            {collections.map((col) => (
              <div
                key={col.id}
                className="border border-white p-4 text-center rounded-lg cursor-pointer hover:bg-white/20 transition bg-green-100/15"
                onClick={() => {
                  setChapter(col.id);
                  setShow(false);
                }}
              >
                <h3 className="text-xl font-semibold">{col.name}</h3>
                <p>Author: {col.author}</p>
                <p>Death Year: {col.deathYear}</p>
                <p>Total Hadiths: {col.hadiths}</p>
                <p>Chapters: {col.chapters}</p>
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          data?.chapters && (
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
              {data.chapters.map((item) => (
                <div
                  key={item.id}
                  className="border border-white p-4 text-center rounded hover:bg-white/10 transition"
                  onClick={()=>toast.success("Added Soon...")}
                >
                  <h3 className="text-xl font-semibold">
                    Chapter {item.id}: {item.chapterEnglish}
                  </h3>
                  <p>{item.chapterUrdu}</p>
                  <p>{item.chapterArabic}</p>
                </div>
              ))}
              <button className="bg-green-300/20 rounded-full transition cursor-pointer"
                onClick={()=>setShow(true)}
              >Back</button>
            </div>
            
          )
        )}
      </div>
    </div>
  );
};

export default HadithPage;
