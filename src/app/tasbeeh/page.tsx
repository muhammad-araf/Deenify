"use client"
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { Minus, RotateCcw, Settings, Target, Award} from 'lucide-react';

const Page = () => {
    const [count, setCount] = useState(0);
    const [targetCount, setTargetCount] = useState(33);
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState(0);
    const [sessions, setSessions] = useState<number[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);

    const dhikrPhrases = [
        { arabic: "سُبْحَانَ اللَّهِ", transliteration: "Subhan Allah", translation: "Glory be to Allah", count: 33 },
        { arabic: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", translation: "Praise be to Allah", count: 33 },
        { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", translation: "Allah is Greatest", count: 34 },
        { arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ", transliteration: "La ilaha illa Allah", translation: "There is no god but Allah", count: 100 },
        { arabic: "أَسْتَغْفِرُ اللَّهَ", transliteration: "Astaghfirullah", translation: "I seek forgiveness from Allah", count: 100 }
    ];

    const [selectedDhikr, setSelectedDhikr] = useState(dhikrPhrases[0]);

    useEffect(() => {
        if (count === 1 && !startTime) {
            setStartTime(new Date());
        }
    }, [count, startTime]);

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        if (newCount === targetCount) {
            toast.success(`🎉 Target reached! ${targetCount} completed`);
            setSessions(prev => [...prev, targetCount]);
            setStartTime(null);
        } else if (newCount % 10 === 0) {
            toast.success(`${newCount} completed!`);
        }
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleReset = () => {
        setCount(0);
        setStartTime(null);
        toast.success("Counter reset");
    };

    const handleSetTarget = () => {
        setTargetCount(inputValue);
        setShow(false);
        toast.success(`Target set to ${inputValue}`);
    };

    const getProgressPercentage = () => {
        return Math.min((count / targetCount) * 100, 100);
    };

    const getCounterStyle = () => {
        if (count >= targetCount) return "border-yellow-400 text-yellow-400 shadow-yellow-400/50";
        if (count % 100 === 0 && count > 0) return "border-green-400 text-green-400 shadow-green-400/50";
        if (count % 10 === 0 && count > 0) return "border-blue-400 text-blue-400 shadow-blue-400/50";
        return "border-white text-white";
    };

    return (
        <div className="select-none min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white pt-20">
            <div className="max-w-4xl mx-auto px-4 py-8">
                

                <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-sm font-medium mb-6">
                        <Target className="w-4 h-4 mr-2" />
                        Digital Tasbeeh
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Digital Tasbeeh Counter
                    </h1>
                    
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Keep track of your dhikr and remembrance of Allah with this digital counter
                    </p>
                </div>


                <div className="card bg-white/10 backdrop-blur-lg border-white/20 p-6 mb-8 text-center">
                    <p className="text-3xl md:text-4xl font-arabic text-green-300 mb-3">
                        {selectedDhikr.arabic}
                    </p>
                    <p className="text-lg font-medium text-black mb-1">
                        {selectedDhikr.transliteration}
                    </p>
                    <p className="text-gray-800">
                        {selectedDhikr.translation}
                    </p>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/70">Progress</span>
                        <span className="text-sm text-white/70">{count} / {targetCount}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                        <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage()}%` }}
                        ></div>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <div 
                        onClick={handleIncrement}
                        className={`inline-flex items-center justify-center w-64 h-64 md:w-80 md:h-80 rounded-full border-8 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl ${getCounterStyle()}`}
                    >
                        <span className="text-6xl md:text-8xl font-bold select-none">
                            {count}
                        </span>
                    </div>
                    
                    <p className="text-white/40 mt-4 text-lg">
                        Tap to count
                    </p>
                </div>

                <div className="flex justify-center items-center space-x-4 mb-8">
                    <button 
                        onClick={handleDecrement}
                        disabled={count === 0}
                        className="p-4 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                        <Minus className="w-6 h-6" />
                    </button>
                    
                    <button 
                        onClick={handleReset}
                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                    
                    <button 
                        onClick={() => setShow(!show)}
                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                        <Settings className="w-6 h-6" />
                    </button>
                </div>


                {show && (
                    <div className="card bg-white/10 backdrop-blur-lg border-white/20 p-6 mb-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center text-black">
                            <Settings className="w-5 h-5 mr-2" />
                            Settings
                        </h3>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-3 text-green-500">Select Dhikr</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {dhikrPhrases.map((phrase, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedDhikr(phrase);
                                            setTargetCount(phrase.count);
                                            toast.success(`Selected: ${phrase.transliteration}`);
                                        }}
                                        className={`p-3 text-left rounded-lg border-2 transition-all cursor-pointer ${
                                            selectedDhikr.arabic === phrase.arabic
                                                ? 'border-green-400 bg-green-400/20'
                                                : 'border-white/20 hover:border-white/40'
                                        }`}
                                    >
                                        <div className="text-sm font-medium text-black">{phrase.transliteration}</div>
                                        <div className="text-xs text-gray-600">Recommended: {phrase.count}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-green-500">Custom Target</label>
                            <div className="flex space-x-3">
                                <input
                                    type="number"
                                    min="1"
                                    max="10000"
                                    className="flex-1 bg-white/10 border border-gray-800 px-4 py-3 rounded-lg text-gray-900 placeholder-white/50 focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                    placeholder="Enter target count"
                                    value={inputValue || ''}
                                    onChange={(e) => setInputValue(Number(e.target.value))}
                                />
                                <button
                                    onClick={handleSetTarget}
                                    disabled={!inputValue || inputValue <= 0}
                                    className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors cursor-pointer"
                                >
                                    Set Target
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {sessions.length > 0 && (
                    <div className="card bg-white/10 backdrop-blur-lg border-white/20 p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center text-green-600">
                            <Award className="w-5 h-5 mr-2" />
                            Today&apos;s Sessions
                        </h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{sessions.length}</div>
                                <div className="text-sm text-gray-900/70">Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400">{sessions.reduce((a, b) => a + b, 0)}</div>
                                <div className="text-sm text-gray-900/70">Total Count</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400">{Math.max(...sessions, 0)}</div>
                                <div className="text-sm text-gray-900/70">Highest</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">{Math.round(sessions.reduce((a, b) => a + b, 0) / sessions.length) || 0}</div>
                                <div className="text-sm text-gray-900/70">Average</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;