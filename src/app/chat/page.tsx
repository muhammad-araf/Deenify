"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

type ChatRole = "user" | "assistant" | "system";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

const Page = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: message };

    const updatedHistory: ChatMessage[] = [
      {
        role: "system",
        content: `You are an Islamic scholar. Only provide answers related to Islam based on the Quran and authentic Hadith. Do not answer anything unrelated to Islam. If someone asks something irrelevant, politely say: 'I can only assist with Islamic-related questions.' if the user say i feel something and whatever here is my api https://deeenify.vercel.app/api/feeling u can take and provide the dua for that emotion Format your answers **clearly and structured** using the following style when relevant 1. ✦ **Quran Reference** (mention Surah and Ayah) 2. ✦ **Hadith Reference** (if available) 3. ✦ **Dua** (Arabic text) 4. ✦ **Transliteration** 5. ✦ **Translation** 6. ✦ Explanation or advice (keep it clear and emotionally supportive) Use markdown for formatting (e.g., **bold**, *italic*, lists). Avoid long paragraphs`,
      },
      ...chatHistory,
      userMessage,
    ];

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite-preview-06-17",
          messages: updatedHistory,
        }),
      });

      const data = await res.json();

      const reply: string =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't understand the response.";

      setChatHistory((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch{
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error fetching response. Please try again later.",
        },
      ]);
    }
  };

  return (
    <>
{/* <div className="fixed  left-0 w-full h-[80px] z-50 flex items-center justify-center shadow-md">
  <h1 className="text-white text-xl font-bold"></h1>
</div> */}
<div className="bg-gray-100 dark:bg-transparent text-black dark:text-black px-4 pt-[90px]">
  <div className="max-w-4xl mx-auto bg-transparent rounded-lg min-h-[80vh] pt-1 px-1 flex flex-col overflow-hidden">
        <div className="h-[535px] overflow-y-auto pr-2 pl-1 rounded-lg scroll-smooth overflow-x-hidden hide-scrollbar lg:h-[545px]">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-1 rounded-lg max-w-[95%] ${
                  msg.role === "user"
                    ? "bg-green-200/30 text-white px-3"
                    : "bg-green-100/5 text-white mt-5 mb-5"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

       <div className="flex rounded-full bg-green-400/10 h-10 mt-4 w-full">
  <input
    type="text"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleMessage();
    }}
    placeholder="Ask anything related to Islam"
    className="text-white flex-1 rounded-full bg-green-400/20 border-none outline-none pl-4"
  />
  <button
    onClick={handleMessage}
    className={`px-4 py-1 rounded-full transition cursor-pointer text-2xl ${
      message.trim() === ""
        ? "bg-gray-200/50 text-black hover:bg-gray-200/35"
        : "bg-white text-black hover:bg-gray-200"
    }`}
  >
    ➤
  </button>
</div>

      </div>
    </div>
    </>
  );
};

export default Page;
