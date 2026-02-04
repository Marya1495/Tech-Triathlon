import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Keyboard, Terminal, Brain, Zap, Target, ShieldCheck, Trophy, Info, ExternalLink, ChevronRight 
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 z-0"></div>
        <div className="relative z-10 text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
              <Zap className="w-12 h-12 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white mb-4">
            TECH<span className="text-blue-500">TRIATHLON</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Three Rounds. Three Disciplines. One Champion.
          </p>
        </div>
      </div>

      {/* Rounds Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Round 1 */}
          <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all group">
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Keyboard className="text-blue-400 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Round 1: Blind Typing</h3>
            <p className="text-gray-500 text-sm mb-6">Precision and speed without looking. The ultimate test for muscle memory.</p>
            <a 
              href="https://blind-typing-1.firebaseapp.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300"
            >
              START ROUND <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Round 2 */}
          <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl hover:border-green-500/50 transition-all group">
            <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Terminal className="text-green-400 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Round 2: Error Out</h3>
            <p className="text-gray-500 text-sm mb-6">Debugging challenge. Find hidden logical errors in the provided snippets.</p>
            <button 
              onClick={() => navigate('/round_2')}
              className="inline-flex items-center gap-2 text-sm font-bold text-green-400 hover:text-green-300 cursor-pointer"
            >
              START ROUND <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Round 3 */}
          <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl hover:border-purple-500/50 transition-all group">
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain className="text-purple-400 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Round 3: Logic Building</h3>
            <p className="text-gray-500 text-sm mb-6">Crafting complex algorithms from scratch under strict time constraints.</p>
            <button 
              onClick={() => navigate('/round_3')}
              className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 cursor-pointer"
            >
              START ROUND <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rules */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gray-800"></div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Info className="text-blue-500" /> EVENT RULES
            </h2>
            <div className="h-px flex-1 bg-gray-800"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
               <h4 className="font-bold text-white mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-400"/> Integrity Policy</h4>
               <p className="text-gray-400 text-sm">Switching tabs or using external AI tools will result in immediate disqualification.</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
               <h4 className="font-bold text-white mb-2 flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500"/> Scoring</h4>
               <p className="text-gray-400 text-sm">Each round is worth 100 points. Bonus points awarded for speed and accuracy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;