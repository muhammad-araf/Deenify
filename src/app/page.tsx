"use client";
import { ArrowRight, Heart, MessageCircle, BookOpen, Book, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {

  const features = [
    {
      icon: Heart,
      title: "Emotional Support",
      description: "Find comfort and guidance based on your current feelings with Islamic wisdom.",
      href: "/i-am-feeling",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "AI Islamic Chat",
      description: "Ask questions about Islam and get authentic answers from Quran and Hadith.",
      href: "/chat",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: BookOpen,
      title: "Quran Audio",
      description: "Listen to beautiful Quranic recitations with multiple reciters.",
      href: "/quran",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Book,
      title: "Hadith Collection",
      description: "Explore authentic Hadith collections with search and categorization.",
      href: "/hadith",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: RotateCcw,
      title: "Digital Tasbeeh",
      description: "Keep track of your dhikr with our digital prayer counter.",
      href: "/tasbeeh",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 islamic-pattern">
    

      <section className="min-h-screen relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-8 fade-in mt-12">
              <Sparkles className="w-4 h-4 mr-2" />
              Your Islamic Companion
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 slide-up">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Deenify
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto slide-up">
              Your AI companion for{" "}
              <span className="font-semibold text-green-600">Islamic knowledge</span>{" "}
              and{" "}
              <span className="font-semibold text-green-600">emotional support</span>.
              Discover peace, wisdom, and guidance in your spiritual journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 slide-up">
              <Link
                href="/chat"
                className="btn btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <MessageCircle size={20} />
                <span>Start Chatting</span>
                <ArrowRight size={20} />
              </Link>
              
              <Link
                href="/i-am-feeling"
                className="btn btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Heart size={20} />
                <span>How are you feeling?</span>
              </Link>
            </div>

            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-lg font-medium slide-up">
              <Sparkles className="w-5 h-5 mr-2" />
              Islamic News - Coming Soon!
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 w-full">
            Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the tools and resources designed to support your Islamic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group card p-5 hover:scale-101 transition-all duration-1000"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform duration-200">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-300 to-emerald-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Take the First Step on Your Spiritual Journey Today
          </h2>
          <Link
            href="/chat"
            className="inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-100 transition-colors duration-200"
          >
            <MessageCircle size={20} />
            <span>Get Started Now</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
