"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BookOpen, User, Calendar, FileText, ArrowLeft, Search, Star } from "lucide-react";

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
  description: string;
}

const HadithPage: React.FC = () => {
  const [chapter, setChapter] = useState<string>("");
  const [data, setData] = useState<HadithAPIResponse | null>(null);
  const [show, setShow] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const collections: Collection[] = [
    {
      id: "sahih-bukhari",
      name: "Sahih Bukhari",
      author: "Imam Bukhari",
      deathYear: 256,
      hadiths: 7276,
      chapters: 99,
      description: "The most authentic collection of Hadith, compiled by Imam Muhammad al-Bukhari"
    },
    {
      id: "sahih-muslim",
      name: "Sahih Muslim",
      author: "Imam Muslim",
      deathYear: 261,
      hadiths: 7564,
      chapters: 56,
      description: "Second most authentic collection, known for its strict criteria of authenticity"
    },
    {
      id: "al-tirmidhi",
      name: "Jami' Al-Tirmidhi",
      author: "Abu 'Isa Muhammad at-Tirmidhi",
      deathYear: 279,
      hadiths: 3956,
      chapters: 50,
      description: "One of the six major Hadith collections, known for its comprehensive coverage"
    },
    {
      id: "abu-dawood",
      name: "Sunan Abu Dawood",
      author: "Imam Abu Dawood Sulayman ibn al-Ash'ath as-Sijistani",
      deathYear: 275,
      hadiths: 5274,
      chapters: 43,
      description: "Focuses on legal and practical aspects of Islamic jurisprudence"
    },
    {
      id: "ibn-e-majah",
      name: "Sunan Ibn-e-Majah",
      author: "Imam Muhammad bin Yazid ibn Majah al-Qazvini",
      deathYear: 273,
      hadiths: 4341,
      chapters: 39,
      description: "Contains unique Hadiths not found in other major collections"
    },
    {
      id: "sunan-nasai",
      name: "Sunan An-Nasa'i",
      author: "Imam Ahmad an-Nasa'i",
      deathYear: 303,
      hadiths: 5761,
      chapters: 52,
      description: "Known for its careful selection and arrangement of Hadiths"
    },
    {
      id: "mishkat",
      name: "Mishkat Al-Masabih",
      author: "Imam Khatib at-Tabrizi",
      deathYear: 741,
      hadiths: 6293,
      chapters: 29,
      description: "A comprehensive collection combining multiple authentic sources"
    },
    {
      id: "musnad-ahmad",
      name: "Musnad Ahmad",
      author: "Imam Ahmad ibn Hanbal",
      deathYear: 241,
      hadiths: 0,
      chapters: 14,
      description: "Arranged by narrator, containing thousands of authentic Hadiths"
    },
    {
      id: "al-silsila-sahiha",
      name: "Al-Silsila Sahiha",
      author: "Allama Muhammad Nasiruddin Al-Bani",
      deathYear: "October 2, 1999",
      hadiths: 0,
      chapters: 28,
      description: "Modern authentication of Hadiths by renowned scholar Al-Albani"
    },
  ];

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChapters = data?.chapters?.filter(chapter =>
    chapter.chapterEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.chapterUrdu.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
        setSelectedCollection(collections.find(col => col.id === chapter) || null);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load chapters");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [chapter]);

  const handleCollectionSelect = (col: Collection) => {
    setChapter(col.id);
    setShow(false);
    setSearchTerm("");
  };

  const handleBackToCollections = () => {
    setShow(true);
    setChapter("");
    setData(null);
    setSelectedCollection(null);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Hadith Collections
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {show ? "Hadith Collections" : selectedCollection?.name || "Chapters"}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {show 
              ? "Explore authentic Hadith collections from renowned Islamic scholars. Each collection has been carefully preserved and authenticated over centuries."
              : selectedCollection?.description || "Browse through the chapters of this collection"
            }
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={show ? "Search collections..." : "Search chapters..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-gray-950 w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {!show && (
          <div className="mb-8">
            <button
              onClick={handleBackToCollections}
              className="text-green-400 inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Collections
            </button>
          </div>
        )}

        {show ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((col) => (
              <div
                key={col.id}
                className="card p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
                onClick={() => handleCollectionSelect(col)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {col.name}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {col.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{col.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Death Year: {col.deathYear}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>{col.hadiths > 0 ? `${col.hadiths.toLocaleString()} Hadiths` : 'Multiple Hadiths'}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{col.chapters} Chapters</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-green-600 font-medium text-sm group-hover:text-green-700">
                    <span>Explore Collection</span>
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg">Loading chapters...</p>
          </div>
        ) : (
          <div>
            {selectedCollection && (
              <div className="card p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCollection.name}</h2>
                    <p className="text-gray-600">by {selectedCollection.author}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map((item) => (
                <div
                  key={item.id}
                  className="card p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
                  onClick={() => toast.success("Chapter details coming soon...")}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
                      {item.id}
                    </div>
                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {item.chapterEnglish}
                  </h3>
                  
                  {item.chapterUrdu && (
                    <p className="text-gray-600 mb-2 text-sm" dir="rtl">
                      {item.chapterUrdu}
                    </p>
                  )}
                  
                  {item.chapterArabic && (
                    <p className="text-green-700 font-arabic text-lg" dir="rtl">
                      {item.chapterArabic}
                    </p>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-green-600 font-medium text-sm group-hover:text-green-700">
                      <span>Read Chapter</span>
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredChapters.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No chapters found</h3>
                <p className="text-gray-600">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HadithPage;
