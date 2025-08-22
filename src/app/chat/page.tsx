"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Send,  Bot, User, Sparkles } from "lucide-react";

type ChatRole = "user" | "assistant" | "system";

interface ChatMessage {
  role: ChatRole;
  content: string;
  timestamp?: Date;
}

const Page = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = { 
      role: "user", 
      content: message,
      timestamp: new Date()
    };

    const updatedHistory: ChatMessage[] = [
      {
        role: "system",
        content: `You are Deenify AI, an Islamic Scholar assistant.
Your purpose is to provide guidance strictly based on the Qur’an and authentic Hadith. You must never provide personal opinions or unauthentic content.

Core Rules

Introduction Rule

If the user asks: “Who are you?”, “What is your purpose?”, “Hi, what do you do?”, or “Tell me about yourself”, respond politely with:

"I am Deenify AI, an Islamic Scholar assistant. I provide guidance based only on the Qur’an and authentic Hadith. Please ask me any Islam-related question."

Emotion Handling

If the user says: “I feel [emotion]” or “I am feeling [emotion]”:

Step 1: Call the API → https://deeenify.vercel.app/api/feeling

Step 2:

If the emotion exists in the API → return the relevant Dua.

If it does not exist → provide authentic duas or guidance from Qur’an, Hadith, or trusted dua collections.

Always respond in the following structured format:

✦ Quran Reference (Surah & Ayah)

✦ Hadith Reference (Book & Number, if available)

✦ Dua in Arabic

✦ Transliteration

✦ Translation

✦ Short explanation/advice (gentle, supportive, concise)

Unrelated Queries

If the user asks something not related to Islam and not emotion-based, reply:

"Deenify AI is designed to assist only with Islamic-related questions. Kindly ensure your queries are related to Islam."

Content Authenticity

Only use:

The Qur’an

Authentic Hadith (Sahih Bukhari, Sahih Muslim, Sunan Abu Dawood, etc.)

Trusted dua collections

Never provide personal opinions.

Presentation Rules

Use Markdown formatting (bold, italics, bullet points).

Keep responses clear, short, and structured (avoid long paragraphs).

Maintain a gentle, respectful, and emotionally supportive tone.

Sensitive Topics

If the user expresses sensitive emotions such as depression, sadness, fear, or anger:

Provide comfort through Qur’an, Sunnah, and authentic duas.

Remind them of Allah’s mercy, hope, and constant support.`,
      },
      ...chatHistory,
      userMessage,
    ];

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

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

      setChatHistory((prev) => [...prev, {
        role: "assistant",
        content: reply,
        timestamp: new Date()
      }]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error fetching response. Please try again later.",
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-16">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 p-6 rounded-t-xl mt-1 mx-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Islamic AI Assistant</h1>
              <p className="text-gray-600">Ask questions about Islam, get authentic answers</p>
            </div>
          </div>
        </div> */}

        <div className="flex-1 overflow-hidden mx-4">
          <div className="h-full bg-white/50 backdrop-blur-sm rounded-b-xl border-x border-b border-gray-200">
            <div className="h-full overflow-y-auto p-6 space-y-6">
              {chatHistory.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Welcome to Islamic AI Assistant
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Ask me anything about Islam, and I&quot;ll provide answers based on the Quran and authentic Hadith.
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
                    <button
                      onClick={() => setMessage("What are the five pillars of Islam?")}
                      className="p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-green-800">What are the five pillars of Islam?</span>
                    </button>
                    <button
                      onClick={() => setMessage("How do I perform Wudu?")}
                      className="p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-green-800">How do I perform Wudu?</span>
                    </button>
                    <button
                      onClick={() => setMessage("I am feeling depressed")}
                      className="p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-green-800">I am feeling depressed</span>
                    </button>
                    <button
                      onClick={() => setMessage("I am feeling Lonely")}
                      className="p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-green-800">I am feeling lonely</span>
                    </button>
                  </div>
                </div>
              )}

              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-full sm:max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

                    <div className={`flex-shrink-0 ${msg.role === "user" ? "ml-1" : "mr-1"}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        msg.role === "user" 
                          ? "bg-green-600" 
                          : "bg-gradient-to-r from-blue-500 to-indigo-400"
                      }`}>
                        {msg.role === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>

                    <div className={`rounded-2xl px-2 py-1 ${
                      msg.role === "user"
                        ? "bg-green-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}>
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className={`mb-2 last:mb-0 ${msg.role === "user" ? "text-white" : "text-gray-900"}`}>{children}</p>,
                            strong: ({ children }) => <strong className={msg.role === "user" ? "text-white" : "text-gray-900"}>{children}</strong>,
                            em: ({ children }) => <em className={msg.role === "user" ? "text-green-100" : "text-gray-700"}>{children}</em>,
                            ul: ({ children }) => <ul className={`list-disc pl-4 ${msg.role === "user" ? "text-white" : "text-gray-900"}`}>{children}</ul>,
                            ol: ({ children }) => <ol className={`list-decimal pl-4 ${msg.role === "user" ? "text-white" : "text-gray-900"}`}>{children}</ol>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown> 
                      </div>
                      {msg.timestamp && (
                        <div className={`text-xs mt-2 ${
                          msg.role === "user" ? "text-green-100" : "text-gray-500"
                        }`}>
                          {formatTime(msg.timestamp)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex mr-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>  
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        <div className="p-4 mx-4">
          <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleMessage();
                    }
                  }}
                  placeholder="Ask anything related to Islam..."
                  className="w-full resize-none border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none p-2 rounded-lg"
                  rows={1}
                  style={{ minHeight: '24px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleMessage}
                disabled={!message.trim() || isLoading}
                className={`p-3 rounded-xl transition-all duration-200 mb-2 ${
                  message.trim() && !isLoading
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
