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
    <div className="bg-gray-100 h-full dark:bg-transparent text-black dark:text-black px-4">
      <div className="max-w-4xl mx-auto bg-transparent rounded-lg min-h-[80vh] pt-1 px-4 flex flex-col overflow-hidden">
        <div className="h-[650px] overflow-y-auto pr-4 pl-4 rounded-lg scroll-smooth overflow-x-hidden hide-scrollbar lg:h-[545px]">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-[#2E2E2E] text-white py-1"
                    : "bg-transparent text-white"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        <div className="flex rounded-full bg-[#2E2E2E] h-14 mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleMessage();
            }}
            placeholder="Ask anything related to Islam"
            className="text-white flex-1 p-2 rounded-full bg-[#2E2E2E] border-none outline-none"
          />
          {
            message.trim() === "" ? null : (
          <button
            onClick={handleMessage}
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Send
          </button>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Page;
