"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart, BookOpen, Sparkles } from "lucide-react";

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
const emotionColors = [
  "from-pink-100 to-rose-100 border-pink-200 hover:border-pink-300",
  "from-blue-100 to-indigo-100 border-blue-200 hover:border-blue-300",
  "from-green-100 to-emerald-100 border-green-200 hover:border-green-300",
  "from-purple-100 to-violet-100 border-purple-200 hover:border-purple-300",
  "from-amber-100 to-orange-100 border-amber-200 hover:border-amber-300",
  "from-teal-100 to-cyan-100 border-teal-200 hover:border-teal-300",
];

export default function Page() {
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const getEmotionColor = (index: number) =>
    emotionColors[index % emotionColors.length];

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          {/* <p className="text-gray-600 text-lg">Loading emotions...</p> */}
        </div>
      </div>
    );
  }

  if (selectedEmotion) {
    const emotionData = emotions.find(
      (e) => e.emotion.toLowerCase() === selectedEmotion
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Emotional Support
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              I am Feeling{" "}
              <span className="text-green-600">{emotionData?.emotion}</span>
            </h1>
            
            <p className="text-gray-600 text-lg">
              Find comfort and guidance through Islamic wisdom
            </p>
          </div>

          <div className="space-y-8">
            {emotionData?.quranic_verse && (
              <div className="card p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-green-600 mr-2" />
                  <span className="text-green-600 font-semibold">Quranic Guidance</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {emotionData.quranic_verse.reference}
                </h3>
                
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  &quot;{emotionData.quranic_verse.translation}&quot;
                </p>
              </div>
            )}

            {emotionData?.duas && emotionData.duas.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Recommended Duas
                  </h2>
                  <p className="text-gray-600">
                    Supplications to help you through this feeling
                  </p>
                </div>

                {emotionData.duas.map((dua, i) => (
                  <div key={i} className="card p-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                        Dua {i + 1}
                      </div>
                    </div>

                    <div className="text-center mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <p className="text-2xl md:text-3xl font-arabic text-gray-900 leading-relaxed" dir="rtl">
                        {dua.arabic}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Transliteration
                      </h4>
                      <p className="text-lg text-gray-700 italic">
                        {dua.transliteration}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Translation
                      </h4>
                      <p className="text-lg text-gray-700">
                        {dua.translation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {emotionData?.note && (
              <div className="card p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <div className="flex items-start">
                  <Sparkles className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Note</h4>
                    <p className="text-amber-700">{emotionData.note}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setSelectedEmotion(null)}
              className="btn btn-secondary flex items-center space-x-2 mx-auto cursor-pointer"
            >
              <ArrowLeft size={20} />
              <span>Back to Emotions</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6 fade-in">
            <Heart className="w-4 h-4 mr-2" />
            Emotional Support
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 slide-up">
            I am Feeling
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto slide-up">
            Select your current emotion to receive personalized Islamic guidance, 
            duas, and Quranic verses for comfort and support.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {emotions.map((emotion, i) => (
            <button
              key={i}
              className={`group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-102 hover:shadow-lg bg-gradient-to-br ${getEmotionColor(i)} fade-in cursor-pointer`}
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => setSelectedEmotion(emotion.emotion.toLowerCase())}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white/70 transition-colors">
                  <Heart className="w-6 h-6 text-gray-700" />
                </div>
                
                <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {emotion.emotion}
                </h3>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12 mb-0">
          <p className="animate-glow text-l font-bold text-green-600">
            Can&apos;t find your emotion? Try the closest one that matches your feelings.
          </p>
        </div>
      </div>
    </div>
  );
}

