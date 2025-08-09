"use client";

import { useEffect, useState } from "react";
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
  const [audioURL, setAudioUrl] = useState<string>("");
  const [index, setIndex] = useState("");
  const [data, setData] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSurah = async () => {
      if (index === "") {
        setLoading(false);
        return;
      }
      if (parseInt(index) < 1 || parseInt(index) > 114) {
        console.error("Invalid Surah index:", index);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://quranapi.pages.dev/api/${index}.json`);
        const res = await response.json();
        setData(res);
        console.log("Fetched result:", res);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching surah:", err);
        setLoading(false);
      }
    };

    handleSurah();
  }, [index]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#11182700] to-[#132d24] text-white flex flex-col items-center p-6 ">
      <div className="mt-20">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4 text-center drop-shadow-md">
        Qur&apos;an Audio
      </h1>
      <p className="text-white/70 text-center mb-10 max-w-xl">
        Listen to recitations of the Noble Qur&apos;an in beautiful voices. Choose a Surah and then select your favorite reciter and also download it.
      </p>

      {/* SURAH SELECT CARD */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-xl mb-10">
        <label className="block text-lg font-medium text-white mb-2">
          Select a Surah
        </label>
        <select
          className="w-full p-3 rounded-lg bg-white text-black text-base shadow focus:ring-2 focus:ring-green-400"
          onChange={(e) => {
            setLoading(true);
            const value = e.target.value;
            setIndex(value);
            setReciter("");
            setAudioUrl("");
          }}
        >
                      <option className="text-gray-500" value=""> Choose a Surah</option>
            <option value="1">1. Al-Fatihah</option>
            <option value="2">2. Al-Baqarah</option>
            <option value="3">3. Al-&apos;Imran</option>
            <option value="4">4. An-Nisa&apos;</option>
            <option value="5">5. Al-Ma&apos;idah</option>
            <option value="6">6. Al-An&apos;am</option>
            <option value="7">7. Al-A&apos;raf</option>
            <option value="8">8. Al-Anfal</option>
            <option value="9">9. At-Taubah</option>
            <option value="10">10. Yunus</option>
            <option value="11">11. Hud</option>
            <option value="12">12. Yusuf</option>
            <option value="13">13. Ar-Ra&apos;d</option>
            <option value="14">14. Ibrahim</option>
            <option value="15">15. Al-Hijr</option>
            <option value="16">16. An-Nahl</option>
            <option value="17">17. Al-Isra</option>
            <option value="18">18. Al-Kahf</option>
            <option value="19">19. Maryam</option>
            <option value="20">20. Ta Ha</option>
            <option value="21">21. Al-Anbiya&apos;</option>
            <option value="22">22. Al-Hajj</option>
            <option value="23">23. Al-Mu&apos;minun</option>
            <option value="24">24. An-Nur</option>
            <option value="25">25. Al-Furqan</option>
            <option value="26">26. Ash-Shu&apos;ara&apos;</option>
            <option value="27">27. An-Naml</option>
            <option value="28">28. Al-Qasas</option>
            <option value="29">29. Al-&apos;Ankabut</option>
            <option value="30">30. Ar-Rum</option>
            <option value="31">31. Luqman</option>
            <option value="32">32. As-Sajdah</option>
            <option value="33">33. Al-Ahzab</option>
            <option value="34">34. Saba&apos;</option>
            <option value="35">35. Fatir</option>
            <option value="36">36. Ya Sin</option>
            <option value="37">37. As-Saffat</option>
            <option value="38">38. Sad</option>
            <option value="39">39. Az-Zumar</option>
            <option value="40">40. Ghafir</option>
            <option value="41">41. Fussilat</option>
            <option value="42">42. Ash-Shura</option>
            <option value="43">43. Az-Zukhruf</option>
            <option value="44">44. Ad-Dukhan</option>
            <option value="45">45. Al-Jathiyah</option>
            <option value="46">46. Al-Ahqaf</option>
            <option value="47">47. Muhammad</option>
            <option value="48">48. Al-Fath</option>
            <option value="49">49. Al-Hujurat</option>
            <option value="50">50. Qaf</option>
            <option value="51">51. Ad-Dhariyat</option>
            <option value="52">52. At-Tur</option>
            <option value="53">53. An-Najm</option>
            <option value="54">54. Al-Qamar</option>
            <option value="55">55. Ar-Rahman</option>
            <option value="56">56. Al-Waqi&apos;ah</option>
            <option value="57">57. Al-Hadid</option>
            <option value="58">58. Al-Mujadilah</option>
            <option value="59">59. Al-Hashr</option>
            <option value="60">60. Al-Mumtahanah</option>
            <option value="61">61. As-Saff</option>
            <option value="62">62. Al-Jumu&apos;ah</option>
            <option value="63">63. Al-Munafiqun</option>
            <option value="64">64. At-Taghabun</option>
            <option value="65">65. At-Talaq</option>
            <option value="66">66. At-Tahrim</option>
            <option value="67">67. Al-Mulk</option>
            <option value="68">68. Al-Qalam</option>
            <option value="69">69. Al-Haqqah</option>
            <option value="70">70. Al-Ma&apos;arij</option>
            <option value="71">71. Nuh</option>
            <option value="72">72. Al-Jinn</option>
            <option value="73">73. Al-Muzzammil</option>
            <option value="74">74. Al-Muddaththir</option>
            <option value="75">75. Al-Qiyamah</option>
            <option value="76">76. Al-Insan</option>
            <option value="77">77. Al-Mursalat</option>
            <option value="78">78. An-Naba&apos;</option>
            <option value="79">79. An-Nazi&apos;at</option>
            <option value="80">80. &apos;Abasa</option>
            <option value="81">81. At-Takwir</option>
            <option value="82">82. Al-Infitar</option>
            <option value="83">83. Al-Mutaffifin</option>
            <option value="84">84. Al-Inshiqaq</option>
            <option value="85">85. Al-Buruj</option>
            <option value="86">86. At-Tariq</option>
            <option value="87">87. Al-A&apos;la</option>
            <option value="88">88. Al-Ghashiyah</option>
            <option value="89">89. Al-Fajr</option>
            <option value="90">90. Al-Balad</option>
            <option value="91">91. Ash-Shams</option>
            <option value="92">92. Al-Lail</option>
            <option value="93">93. Ad-Duha</option>
            <option value="94">94. Ash-Sharh</option>
            <option value="95">95. At-Tin</option>
            <option value="96">96. Al-&apos;Alaq</option>
            <option value="97">97. Al-Qadr</option>
            <option value="98">98. Al-Bayyinah</option>
            <option value="99">99. Al-Zilzal</option>
            <option value="100">100. Al-&apos;Adiyat</option>
            <option value="101">101. Al-Qari&apos;ah</option>
            <option value="102">102. At-Takathur</option>
            <option value="103">103. Al-&apos;Asr</option>
            <option value="104">104. Al-Humazah</option>
            <option value="105">105. Al-Fil</option>
            <option value="106">106. Quraish</option>
            <option value="107">107. Al-Ma&apos;un</option>
            <option value="108">108. Al-Kauthar</option>
            <option value="109">109. Al-Kafirun</option>
            <option value="110">110. An-Nasr</option>
            <option value="111">111. Al-Masad</option>
            <option value="112">112. Al-Ikhlas</option>
            <option value="113">113. Al-Falaq</option>
            <option value="114">114. An-Nas</option>
        </select>
      </div>

      {/* SURAH DETAIL + RECITER CARD */}
      {!loading && data && (
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-green-400 mb-2">{data.surahName}</h2>
          <p className="text-white/70 mb-1">
             Place of Revelation: <span className="text-white">{data.surahNameTranslation}</span>
          </p>
          <p className="text-white/70 mb-4">
             Revelation Order: <span className="text-white">{data.surahNo}</span>
          </p>

          <label className="block text-lg font-medium text-white mb-2 mt-4">
            🎙️ Choose Reciter
          </label>
          <select
            className="w-full p-3 rounded-lg bg-white text-black text-base shadow focus:ring-2 focus:ring-green-400 mb-4"
            onChange={(e) => {
              const selectedKey = e.target.value;
              const selectedAudio = data.audio?.[selectedKey];
              if(selectedAudio){
              setReciter(selectedAudio.reciter);
              setAudioUrl(selectedAudio.url);
              }
            }}
          >
            <option value="">-- Select Reciter --</option>
            {Object.entries(data.audio??{}).map(([key, value]) => (
              <option key={key} value={key}>
                {value.reciter}
              </option>
            ))}
          </select>

          {audioURL && (
            <div className="mt-6 text-center">
              <p className="text-green-300 font-extrabold mb-5 text-3xl ">﷽</p>
              <p className="text-green-300 font-medium mb-2 ">
                🎧 Now Playing: <span className="text-white">{reciter}</span>
              </p>
              <audio controls className="w-full rounded-md shadow-md">
                <source src={audioURL} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default Page;
