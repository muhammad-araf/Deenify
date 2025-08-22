"use client";
import { useEffect, useState } from "react";
import { BookOpen, Play, Download, Volume2, Search, Star } from "lucide-react";

interface AudioItem {
  reciter: string;
  url: string;
}
interface SurahData {
  surahName: string;
  surahNameTranslation: string;
  surahNo: number;
  audio?: Record<string, AudioItem>;
}

const Page = () => {
  const [reciter, setReciter] = useState("");
  const [audioURL, setAudioUrl] = useState("");
  const [index, setIndex] = useState("");
  const [data, setData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const surahs = [
  { value: "1", name: "Al-Fatihah", translation: "The Opening" },
  { value: "2", name: "Al-Baqarah", translation: "The Cow" },
  { value: "3", name: "Al-'Imran", translation: "The Family of Imran" },
  { value: "4", name: "An-Nisa'", translation: "The Women" },
  { value: "5", name: "Al-Ma'idah", translation: "The Table" },
  { value: "6", name: "Al-An'am", translation: "The Cattle" },
  { value: "7", name: "Al-A'raf", translation: "The Heights" },
  { value: "8", name: "Al-Anfal", translation: "The Spoils of War" },
  { value: "9", name: "At-Taubah", translation: "The Repentance" },
  { value: "10", name: "Yunus", translation: "Jonah" },
  { value: "11", name: "Hud", translation: "Hud" },
  { value: "12", name: "Yusuf", translation: "Joseph" },
  { value: "13", name: "Ar-Ra'd", translation: "The Thunder" },
  { value: "14", name: "Ibrahim", translation: "Abraham" },
  { value: "15", name: "Al-Hijr", translation: "The Rocky Tract" },
  { value: "16", name: "An-Nahl", translation: "The Bee" },
  { value: "17", name: "Al-Isra", translation: "The Night Journey" },
  { value: "18", name: "Al-Kahf", translation: "The Cave" },
  { value: "19", name: "Maryam", translation: "Mary" },
  { value: "20", name: "Ta Ha", translation: "Ta Ha" },
  { value: "21", name: "Al-Anbiya", translation: "The Prophets" },
  { value: "22", name: "Al-Hajj", translation: "The Pilgrimage" },
  { value: "23", name: "Al-Mu'minun", translation: "The Believers" },
  { value: "24", name: "An-Nur", translation: "The Light" },
  { value: "25", name: "Al-Furqan", translation: "The Criterion" },
  { value: "26", name: "Ash-Shu'ara", translation: "The Poets" },
  { value: "27", name: "An-Naml", translation: "The Ant" },
  { value: "28", name: "Al-Qasas", translation: "The Stories" },
  { value: "29", name: "Al-Ankabut", translation: "The Spider" },
  { value: "30", name: "Ar-Rum", translation: "The Romans" },
  { value: "31", name: "Luqman", translation: "Luqman" },
  { value: "32", name: "As-Sajdah", translation: "The Prostration" },
  { value: "33", name: "Al-Ahzab", translation: "The Confederates" },
  { value: "34", name: "Saba", translation: "Sheba" },
  { value: "35", name: "Fatir", translation: "The Originator" },
  { value: "36", name: "Ya Sin", translation: "Ya Sin" },
  { value: "37", name: "As-Saffat", translation: "Those Ranged in Rows" },
  { value: "38", name: "Sad", translation: "Sad" },
  { value: "39", name: "Az-Zumar", translation: "The Groups" },
  { value: "40", name: "Ghafir", translation: "The Forgiver" },
  { value: "41", name: "Fussilat", translation: "Explained in Detail" },
  { value: "42", name: "Ash-Shura", translation: "The Consultation" },
  { value: "43", name: "Az-Zukhruf", translation: "The Gold Adornments" },
  { value: "44", name: "Ad-Dukhan", translation: "The Smoke" },
  { value: "45", name: "Al-Jathiyah", translation: "The Crouching" },
  { value: "46", name: "Al-Ahqaf", translation: "The Wind-Curved Sandhills" },
  { value: "47", name: "Muhammad", translation: "Muhammad" },
  { value: "48", name: "Al-Fath", translation: "The Victory" },
  { value: "49", name: "Al-Hujurat", translation: "The Rooms" },
  { value: "50", name: "Qaf", translation: "Qaf" },
  { value: "51", name: "Adh-Dhariyat", translation: "The Winnowing Winds" },
  { value: "52", name: "At-Tur", translation: "The Mount" },
  { value: "53", name: "An-Najm", translation: "The Star" },
  { value: "54", name: "Al-Qamar", translation: "The Moon" },
  { value: "55", name: "Ar-Rahman", translation: "The Beneficent" },
  { value: "56", name: "Al-Waqi'ah", translation: "The Inevitable" },
  { value: "57", name: "Al-Hadid", translation: "The Iron" },
  { value: "58", name: "Al-Mujadila", translation: "The Woman Who Disputes" },
  { value: "59", name: "Al-Hashr", translation: "The Exile" },
  { value: "60", name: "Al-Mumtahanah", translation: "The Woman to be Examined" },
  { value: "61", name: "As-Saff", translation: "The Ranks" },
  { value: "62", name: "Al-Jumu'ah", translation: "The Congregation" },
  { value: "63", name: "Al-Munafiqun", translation: "The Hypocrites" },
  { value: "64", name: "At-Taghabun", translation: "The Mutual Disillusion" },
  { value: "65", name: "At-Talaq", translation: "The Divorce" },
  { value: "66", name: "At-Tahrim", translation: "The Prohibition" },
  { value: "67", name: "Al-Mulk", translation: "The Sovereignty" },
  { value: "68", name: "Al-Qalam", translation: "The Pen" },
  { value: "69", name: "Al-Haqqah", translation: "The Inevitable" },
  { value: "70", name: "Al-Ma'arij", translation: "The Ascending Stairways" },
  { value: "71", name: "Nuh", translation: "Noah" },
  { value: "72", name: "Al-Jinn", translation: "The Jinn" },
  { value: "73", name: "Al-Muzzammil", translation: "The Enshrouded One" },
  { value: "74", name: "Al-Muddaththir", translation: "The Cloaked One" },
  { value: "75", name: "Al-Qiyamah", translation: "The Resurrection" },
  { value: "76", name: "Al-Insan", translation: "Man" },
  { value: "77", name: "Al-Mursalat", translation: "The Emissaries" },
  { value: "78", name: "An-Naba", translation: "The Tidings" },
  { value: "79", name: "An-Nazi'at", translation: "Those Who Drag Forth" },
  { value: "80", name: "Abasa", translation: "He Frowned" },
  { value: "81", name: "At-Takwir", translation: "The Overthrowing" },
  { value: "82", name: "Al-Infitar", translation: "The Cleaving" },
  { value: "83", name: "Al-Mutaffifin", translation: "Defrauding" },
  { value: "84", name: "Al-Inshiqaq", translation: "The Splitting Open" },
  { value: "85", name: "Al-Buruj", translation: "The Mansions of the Stars" },
  { value: "86", name: "At-Tariq", translation: "The Morning Star" },
  { value: "87", name: "Al-A'la", translation: "The Most High" },
  { value: "88", name: "Al-Ghashiyah", translation: "The Overwhelming" },
  { value: "89", name: "Al-Fajr", translation: "The Dawn" },
  { value: "90", name: "Al-Balad", translation: "The City" },
  { value: "91", name: "Ash-Shams", translation: "The Sun" },
  { value: "92", name: "Al-Layl", translation: "The Night" },
  { value: "93", name: "Ad-Duhaa", translation: "The Morning Hours" },
  { value: "94", name: "Ash-Sharh", translation: "The Relief" },
  { value: "95", name: "At-Tin", translation: "The Fig" },
  { value: "96", name: "Al-'Alaq", translation: "The Clot" },
  { value: "97", name: "Al-Qadr", translation: "The Power" },
  { value: "98", name: "Al-Bayyina", translation: "The Clear Proof" },
  { value: "99", name: "Az-Zalzalah", translation: "The Earthquake" },
  { value: "100", name: "Al-Adiyat", translation: "The Courser" },
  { value: "101", name: "Al-Qari'ah", translation: "The Calamity" },
  { value: "102", name: "At-Takathur", translation: "Rivalry in World Increase" },
  { value: "103", name: "Al-Asr", translation: "The Declining Day" },
  { value: "104", name: "Al-Humazah", translation: "The Traducer" },
  { value: "105", name: "Al-Fil", translation: "The Elephant" },
  { value: "106", name: "Quraysh", translation: "Quraysh" },
  { value: "107", name: "Al-Ma'un", translation: "Small Kindnesses" },
  { value: "108", name: "Al-Kawthar", translation: "Abundance" },
  { value: "109", name: "Al-Kafirun", translation: "The Disbelievers" },
  { value: "110", name: "An-Nasr", translation: "The Divine Support" },
  { value: "111", name: "Al-Masad", translation: "The Palm Fiber" },
  { value: "112", name: "Al-Ikhlas", translation: "The Sincerity" },
  { value: "113", name: "Al-Falaq", translation: "The Daybreak" },
  { value: "114", name: "An-Nas", translation: "Mankind" }
]
;

  const filteredSurahs = surahs.filter(surah => 
    surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!index) return;

    const handleSurah = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://quranapi.pages.dev/api/${index}.json`);
        const res: SurahData = await response.json();
        setData(res);

        const firstKey = Object.keys(res.audio ?? {})[0];
        if (firstKey && res.audio) {
          setReciter(res.audio[firstKey].reciter);
          setAudioUrl(res.audio[firstKey].url);
        } else {
          setReciter("");
          setAudioUrl("");
        }
      } catch (err) {
        console.error("Error fetching surah:", err);
      }
      setLoading(false);
    };

    handleSurah();
  }, [index]);

  const handleDownload = () => {
    if (audioURL) {
      const link = document.createElement('a');
      link.href = audioURL;
      link.download = `${data?.surahName}_${reciter}.mp3`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6 fade-in">
            <BookOpen className="w-4 h-4 mr-2" />
            Quran Audio
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 slide-up">
            Qur&apos;an Audio
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto slide-up">
            Listen to beautiful Quranic recitations from renowned reciters around the world.
            Choose a Surah and immerse yourself in the divine words.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-green-600" />
                Select a Surah
              </h2>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Surahs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-gray-950 w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto ">
                {filteredSurahs.map((surah) => (
                  <button
                    key={surah.value}
                    onClick={() => setIndex(surah.value)}
                    className={`p-4 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      index === surah.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{surah.value}. {surah.name}</h3>
                        <p className="text-sm text-gray-600">{surah.translation}</p>
                      </div>
                      {index === surah.value && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Play className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {!loading && data && data.audio && (
              <div className="card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Volume2 className="w-5 h-5 mr-2 text-green-600" />
                  Select Reciter
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(data.audio).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setReciter(val.reciter);
                        setAudioUrl(val.url);
                      }}
                      className={`p-3 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        reciter === val.reciter
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{val.reciter}</span>
                        {reciter === val.reciter && (
                          <Star className="w-4 h-4 text-green-500 fill-current" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {data && (
                <div className="card p-6 mb-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {data.surahName}
                    </h3>
                    <p className="text-gray-600 mb-4">{data.surahNameTranslation}</p>
                    
                    {reciter && (
                      <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        <Volume2 className="w-4 h-4 mr-1" />
                        {reciter}
                      </div>
                    )}
                  </div>

                  {audioURL && (
                    <div className="space-y-4">
                      <div className="text-center py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <p className="text-3xl text-green-600 font-arabic mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                        <p className="text-sm text-gray-600">In the name of Allah, the Most Gracious, the Most Merciful</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <audio 
                          controls 
                          className="w-full"
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        >
                          <source src={audioURL} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>

                      <button
                        onClick={handleDownload}
                        className="w-full btn btn-secondary flex items-center justify-center space-x-2"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download Audio</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {loading && (
                <div className="card p-6 text-center">
                  <div className="w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading Surah...</p>
                </div>
              )}

              {!index && (
                <div className="card p-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Surah</h3>
                  <p className="text-gray-600 text-sm">Choose a Surah from the list to start listening</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
