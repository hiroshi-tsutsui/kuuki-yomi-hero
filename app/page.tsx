'use client';
import React, { useState, useEffect } from 'react';

const SCENARIOS = [
  {
    question: "Boss makes a terrible joke at the izakaya.",
    options: [
      { text: "Laugh loudly and clap hands", score: 100, type: "pro" },
      { text: "Stare in silence", score: -50, type: "ky" },
      { text: "Politely smile", score: 50, type: "safe" }
    ]
  },
  {
    question: "The elevator is closing. Someone is running towards it.",
    options: [
      { text: "Hold the 'Open' button furiously", score: 100, type: "pro" },
      { text: "Pretend not to see them", score: -100, type: "ky" },
      { text: "Say 'Sumimasen' as it closes", score: 0, type: "safe" }
    ]
  },
  {
    question: "You receive a compliment on your English.",
    options: [
      { text: "No, no, not at all! (Wave hands)", score: 100, type: "pro" },
      { text: "Thank you, I studied hard.", score: -20, type: "ky" },
      { text: "I guess so.", score: -50, type: "ky" }
    ]
  }
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(3.0);

  useEffect(() => {
    if (started && !finished && timer > 0) {
      const interval = setInterval(() => setTimer(t => Math.max(0, t - 0.1)), 100);
      return () => clearInterval(interval);
    } else if (timer === 0 && !finished) {
       handleAnswer(0); // Time out penalty
    }
  }, [started, finished, timer]);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    if (index + 1 < SCENARIOS.length) {
      setIndex(index + 1);
      setTimer(3.0);
    } else {
      setFinished(true);
    }
  };

  if (!started) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-yellow-400 p-4">
        <h1 className="text-6xl font-black text-black mb-4 uppercase tracking-tighter">Kuuki Yomi Hero</h1>
        <p className="text-xl font-bold mb-8">Can you read the atmosphere in 3 seconds?</p>
        <button onClick={() => setStarted(true)} className="bg-black text-white px-12 py-6 rounded-full text-2xl font-bold hover:scale-110 transition">START</button>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
        <h1 className="text-4xl font-bold mb-4">RESULT</h1>
        <p className="text-8xl font-black text-yellow-400 mb-8">{score} KY Points</p>
        <p className="text-xl mb-8">
          {score > 200 ? "You are a Master of Harmony." : score > 0 ? "You are socially acceptable." : "You are a KY (Kuuki Yomenai)."}
        </p>
        <button onClick={() => window.location.reload()} className="bg-white text-black px-8 py-3 rounded font-bold">Try Again</button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="w-full bg-gray-300 h-4 rounded-full mb-8">
           <div className="bg-red-600 h-4 rounded-full transition-all duration-100" style={{ width: `${(timer / 3) * 100}%` }}></div>
        </div>

        <div className="bg-white p-12 rounded-3xl shadow-xl text-center mb-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">{SCENARIOS[index].question}</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {SCENARIOS[index].options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => handleAnswer(opt.score)}
                className="bg-blue-50 border-2 border-blue-100 p-6 rounded-xl hover:bg-blue-500 hover:text-white transition font-bold text-lg text-left"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
        
        <p className="text-center font-mono text-gray-400">Score: {score}</p>
      </div>
    </main>
  );
}
