import React, { useState, useEffect } from 'react';
import { 
  Brain, Terminal, Play, Code2, Cpu, Clock, ChevronLeft, ChevronRight, Flag, 
  Activity, CheckCircle2, XCircle, User, Building, Hash, Lock, LogOut, 
  LayoutDashboard, Search, Download, Trash2, AlertCircle, Ticket, Eye, 
  ChevronDown, ChevronUp, Loader2, PlayCircle, StopCircle
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    title: "Fibonacci Numbers",
    difficulty: "EASY",
    objective: "Start with a specific Fibonacci sequence number, then calculate and print the next N Fibonacci numbers. Example: 1 10 results in the first 10 numbers starting from 1.",
    testInput: "1 10",
    expectedOutput: "1 1 2 3 5 8 13 21 34 55",
    initialCode: `#include <iostream>

using namespace std;

int main() {
    int start, count;
    if (!(cin >> start >> count)) return 0;

    // Write logic here (print 'count' numbers starting from 'start')
    

    return 0;
}`,
  },
  {
    id: 2,
    title: "Integer List Sorting",
    difficulty: "MEDIUM",
    objective: "Take a list of integers (N followed by N values) and print it after sorting it in descending order.",
    testInput: "5 4 1 9 3 7",
    expectedOutput: "9 7 4 3 1",
    initialCode: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // Write logic here (sort descending and print)
    

    return 0;
}`,
  },
  {
    id: 3,
    title: "Zipper Merge",
    difficulty: "HARD",
    objective: "Merge two arrays (size N and M) in a zipper-like fashion. If one array is longer, append the remaining elements to the end.",
    testInput: "3 4 1 3 5 2 4 6 8",
    expectedOutput: "1 2 3 4 5 6 8",
    initialCode: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<int> a(n), b(m);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int j = 0; j < m; j++) cin >> b[j];

    // Write logic here
    

    return 0;
}`,
  },
  {
    id: 4,
    title: "Check Scrambled String",
    difficulty: "MEDIUM",
    objective: "Given two strings of equal length, determine whether one is a scramble (anagram) of the other. Output 'True' or 'False'.",
    testInput: "abc bca",
    expectedOutput: "True",
    initialCode: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string s1, s2;
    // Use cin to read the two strings
    if (!(cin >> s1 >> s2)) return 0;

    // Write logic here (determine if s2 is a scramble of s1)
    

    return 0;
}`,
  }
];

const getRoundStatus = () => localStorage.getItem('round3_started') === 'true';

// 1. LOGIN SCREEN
const LoginScreen = ({ onLogin, onAdminAccess, participants }) => {
  const [formData, setFormData] = useState({ name: '', dept: '', rollNo: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dept || !formData.rollNo) {
      setError('Required fields missing.');
      return;
    }
    const isStarted = getRoundStatus();
    const existing = participants.find(p => p.rollNo === formData.rollNo);
    if (isStarted && !existing) {
      setError('Entry Closed: Round 3 has already commenced.');
      return;
    }
    onLogin(formData);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 mb-4">
            <Brain className="text-purple-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Round 3</h1>
          <p className="text-sm text-gray-500 mt-2 tracking-widest uppercase">Competitive Logic Arena</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-600 uppercase ml-1 tracking-widest">Identification</label>
            <input 
              type="text" placeholder="Full Name" 
              className="w-full bg-gray-950 border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-purple-500 outline-none transition-all"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select 
              className="bg-gray-950 border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-purple-500 outline-none appearance-none"
              value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})}
            >
              <option value="">Dept</option>
              <option value="IT">IT</option><option value="CS">CS</option><option value="BA">BA</option>
              <option value="BMS">BMS</option><option value="Biotech">Biotech</option>
            </select>
            <input 
              type="text" placeholder="Roll No" 
              className="bg-gray-950 border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-purple-500 outline-none"
              value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})}
            />
          </div>
          {error && <p className="text-red-400 text-xs italic bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}
          <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-lg shadow-lg transition-all active:scale-95">JOIN ROUND</button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-800 flex justify-center">
          <button onClick={onAdminAccess} className="text-xs text-gray-600 hover:text-white flex items-center gap-2 transition-colors"><Lock className="w-3 h-3" /> STAFF PORTAL</button>
        </div>
      </div>
    </div>
  );
};

// 2. WAITING LOBBY
const WaitingLobby = ({ user, onStart }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (getRoundStatus()) onStart();
    }, 2000);
    return () => clearInterval(interval);
  }, [onStart]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center shadow-2xl">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">WAITING ROOM</h2>
        <p className="text-sm text-gray-500 mb-8">Hello <span className="text-purple-400 font-bold">{user.name}</span>. The server is currently on standby. The round will automatically start once the admin grants access.</p>
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-[10px] flex justify-between uppercase font-bold text-gray-500">
           <span>Connection: Live</span>
           <span className="text-purple-500">{user.participantCode}</span>
        </div>
      </div>
    </div>
  );
};

// 3. ADMIN DASHBOARD
const AdminDashboard = ({ participants, onLogout, onClearData }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRoundStarted, setIsRoundStarted] = useState(getRoundStatus());

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === 'admin') setIsAuthenticated(true);
    else alert('Unauthorized');
  };

  const toggleRound = () => {
    const newState = !isRoundStarted;
    setIsRoundStarted(newState);
    localStorage.setItem('round3_started', newState.toString());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center font-mono p-4">
        <form onSubmit={handleAuth} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 space-y-6 w-full max-sm shadow-2xl">
          <div className="text-center">
            <Lock className="w-10 h-10 text-purple-500 mx-auto mb-2" />
            <h2 className="text-white font-bold text-xl uppercase tracking-widest">Admin Portal</h2>
          </div>
          <input type="password" placeholder="Key" className="bg-black text-white p-3 border border-gray-800 rounded-lg w-full outline-none focus:border-purple-500 transition-all" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="bg-purple-600 w-full py-3 rounded-lg text-white font-bold hover:bg-purple-500 active:scale-95 transition-all shadow-lg">LOGIN</button>
          <button type="button" onClick={onLogout} className="w-full text-xs text-gray-500 hover:text-white mt-4">Student Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white uppercase flex items-center gap-2">
            <Cpu className="text-purple-500" /> CONTROL CENTER
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">Round 3 System Management</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={toggleRound} className={`px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 transition-all border ${isRoundStarted ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-green-500/10 text-green-400 border-green-500/30'}`}>
            {isRoundStarted ? <StopCircle className="w-4 h-4"/> : <PlayCircle className="w-4 h-4"/>}
            {isRoundStarted ? 'STOP ROUND' : 'START ROUND'}
          </button>
          <button onClick={onClearData} className="px-5 py-2.5 bg-red-900/10 text-red-400 border border-red-900/20 rounded-lg text-xs font-bold hover:bg-red-900/20 transition-all">CLEAR ALL</button>
          <button onClick={onLogout} className="px-5 py-2.5 bg-gray-900 rounded-lg text-xs font-bold border border-gray-800 hover:bg-gray-800 transition-all">LOGOUT</button>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-black text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                <tr><th className="p-5">Participant</th><th className="p-5">Roll No</th><th className="p-5">Status</th><th className="p-5 text-right">Score</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
                {participants.sort((a,b) => (b.score || 0) - (a.score || 0)).map(p => (
                <tr key={p.rollNo} className="hover:bg-purple-500/5">
                    <td className="p-5 text-white font-bold">{p.name}</td>
                    <td className="p-5 text-gray-500 font-mono">{p.rollNo}</td>
                    <td className="p-5">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${p.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {p.status}
                        </span>
                    </td>
                    <td className="p-5 text-right text-purple-400 font-bold text-lg">{p.score}</td>
                </tr>
                ))}
                {participants.length === 0 && <tr><td colSpan="4" className="p-10 text-center text-gray-600 italic">No registrations found.</td></tr>}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

// 4. EXAM SESSION
const ExamSession = ({ user, onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [logs, setLogs] = useState([]);
  const [answers, setAnswers] = useState(QUESTIONS.map(q => ({ code: q.initialCode, status: 'UNATTEMPTED' })));

  useEffect(() => {
    if (completed) return;
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [completed]);

  const handleRun = async () => {
    setIsRunning(true);
    setLogs(["> Initializing C++ Compiler...", "> Compiling main.cpp...", "> Executing with stdin..."]);
    
    try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            body: JSON.stringify({
                language: "cpp",
                version: "10.2.0",
                files: [
                    {
                        name: "main.cpp",
                        content: answers[currentQIndex].code
                    }
                ],
                stdin: QUESTIONS[currentQIndex].testInput
            })
        });

        const result = await response.json();
        
        if (result.run) {
            const output = result.run.stdout.trim();
            const error = result.run.stderr.trim();
            const compileOutput = result.compile?.stderr?.trim() || "";

            const newLogs = [];
            if (compileOutput) newLogs.push(`[COMPILER ERROR]\n${compileOutput}`);
            if (error) newLogs.push(`[RUNTIME ERROR]\n${error}`);
            if (output) newLogs.push(`[STDOUT]\n${output}`);
            if (!output && !error && !compileOutput) newLogs.push("> Process terminated with no output.");

            // Verification Logic
            const expected = QUESTIONS[currentQIndex].expectedOutput.trim();
            const passed = output === expected;
            
            const updated = [...answers];
            updated[currentQIndex].status = passed ? 'PASS' : 'FAIL';
            setAnswers(updated);

            if (passed) {
                newLogs.push("✓ SUCCESS: Logic verified against test case.");
            } else if (output) {
                newLogs.push(`⚠ WRONG ANSWER: Got "${output}", Expected "${expected}"`);
            } else if (!compileOutput) {
                newLogs.push("⚠ FAILED: Code executed but failed to produce correct result.");
            }

            setLogs(newLogs);
        } else {
            setLogs(["> Backend Error: Service unreachable."]);
        }
    } catch (err) {
        setLogs([`> Connection Lost: ${err.message}`]);
    } finally {
        setIsRunning(false);
    }
  };

  const handleFinish = () => {
    const pointsPerQuestion = 100 / QUESTIONS.length;
    const score = answers.filter(a => a.status === 'PASS').length * pointsPerQuestion;
    onComplete({ score, status: 'COMPLETED', submittedAnswers: answers });
    setCompleted(true);
  };

  if (completed) {
    const pointsPerQuestion = 100 / QUESTIONS.length;
    const finalScore = answers.filter(a => a.status === 'PASS').length * pointsPerQuestion;
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8 text-center font-mono text-white">
        <CheckCircle2 className="w-20 h-20 text-purple-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">SUBMISSION RECEIVED</h1>
        <p className="text-gray-500 mb-8 font-bold tracking-[0.3em] uppercase">{user?.participantCode}</p>
        <div className="bg-purple-500/10 border border-purple-500/20 px-10 py-6 rounded-2xl mb-8">
            <span className="text-xs text-purple-400 uppercase font-bold block mb-1">Score Result</span>
            <span className="text-5xl font-black text-white">{finalScore}<span className="text-purple-500">/100</span></span>
        </div>
        <button onClick={() => window.location.reload()} className="px-10 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95">LOGOUT</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono flex flex-col overflow-hidden h-screen">
      <nav className="h-16 border-b border-gray-800 bg-[#0a0d12]/90 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-3">
            <Brain className="text-purple-500 w-6 h-6" />
            <h1 className="font-bold text-white uppercase text-xs tracking-widest">Logic Arena: Round 3</h1>
        </div>
        <div className="flex items-center gap-6">
            <div className="hidden md:block text-[10px] text-gray-500 uppercase tracking-widest font-bold">User: {user?.name}</div>
            <div className="bg-gray-900 px-4 py-1.5 rounded-lg border border-gray-800 text-purple-400 font-black shadow-inner">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row p-4 gap-4 overflow-hidden bg-[#05070a]">
        {/* Left Side: Tasks & Console */}
        <div className="lg:w-1/3 flex flex-col gap-4 shrink-0 h-full overflow-hidden">
            <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 shadow-xl border-l-4 border-l-purple-500 overflow-y-auto shrink-0">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20 uppercase">Problem {currentQIndex + 1}</span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase">{QUESTIONS[currentQIndex].difficulty}</span>
                </div>
                <h2 className="text-lg font-bold text-white mb-2 tracking-tight">{QUESTIONS[currentQIndex].title}</h2>
                <p className="text-xs text-gray-400 leading-relaxed bg-black/40 p-3 rounded-lg border border-gray-800/50 italic">{QUESTIONS[currentQIndex].objective}</p>
                <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                    {answers.map((ans, i) => (
                        <button key={i} onClick={() => setCurrentQIndex(i)} className={`w-10 h-10 rounded-lg shrink-0 text-xs font-bold transition-all border ${i === currentQIndex ? 'bg-purple-600 border-purple-400 text-white' : ans.status === 'PASS' ? 'bg-green-500/20 border-green-500/30 text-green-400' : ans.status === 'FAIL' ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </section>

            <section className="bg-black border border-gray-800 rounded-2xl flex flex-col flex-1 shadow-2xl overflow-hidden min-h-0">
                <div className="bg-[#111] p-2 px-5 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Compiler Terminal</span>
                    </div>
                </div>
                <div className="p-4 font-mono text-[11px] overflow-y-auto flex-1 custom-scrollbar leading-relaxed">
                    {logs.length === 0 ? (
                        <p className="text-gray-700 italic">// Code Environment Ready. Use cin to read inputs. Output results to stdout.</p>
                    ) : (
                        <div className="space-y-2">
                            {logs.map((log, i) => (
                                <pre key={i} className={`whitespace-pre-wrap break-all ${log.startsWith('✓') ? 'text-green-400 font-bold' : log.startsWith('⚠') ? 'text-red-400' : log.includes('ERROR') ? 'text-red-500' : 'text-purple-300'}`}>
                                    {log}
                                </pre>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>

        {/* Right Side: IDE */}
        <div className="lg:w-2/3 flex flex-col bg-[#0d1117] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden relative h-full">
            <div className="bg-[#161b22] p-3 px-5 border-b border-gray-800 flex justify-between items-center text-[10px] text-gray-400 uppercase font-black tracking-widest">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/30"></div>
                    <span className="ml-2 flex items-center gap-2 font-mono"><Code2 className="w-4 h-4 text-purple-400" /> main.cpp</span>
                </div>
                <div className="flex items-center gap-3">
                    {answers[currentQIndex].status === 'PASS' && <span className="text-green-400 flex items-center gap-1 font-bold">VERIFIED</span>}
                </div>
            </div>
            <div className="flex-1 relative overflow-hidden">
                <textarea 
                    spellCheck="false"
                    className="w-full h-full bg-transparent p-6 pt-6 font-mono text-sm focus:outline-none resize-none text-purple-100 leading-6 selection:bg-purple-500/20"
                    value={answers[currentQIndex].code}
                    onChange={e => {
                        const up = [...answers];
                        up[currentQIndex].code = e.target.value;
                        setAnswers(up);
                    }}
                />
            </div>
            
            <div className="p-4 bg-[#161b22]/70 border-t border-gray-800 flex justify-between items-center px-8 shrink-0">
                <div className="flex gap-4">
                    <button disabled={currentQIndex === 0} onClick={() => setCurrentQIndex(i => i - 1)} className="text-[10px] font-bold text-gray-500 hover:text-white disabled:opacity-30 uppercase tracking-widest">BACK</button>
                    <button disabled={currentQIndex === QUESTIONS.length - 1} onClick={() => setCurrentQIndex(i => i + 1)} className="text-[10px] font-bold text-gray-500 hover:text-white disabled:opacity-30 uppercase tracking-widest">NEXT</button>
                </div>
                
                <div className="flex items-center gap-4">
                    <button onClick={handleRun} disabled={isRunning} className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-95 disabled:grayscale flex items-center gap-2">
                        {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                        RUN & VERIFY
                    </button>
                    <button onClick={handleFinish} className="bg-gray-800 text-gray-400 border border-gray-700 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:text-white transition-all">FINISH ROUND</button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

// ROOT COMPONENT
const RoundThree = () => {
  const [view, setView] = useState('LOGIN'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [participants, setParticipants] = useState(() => {
    try {
      const saved = localStorage.getItem('round3_participants');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const handleLogin = (userData) => {
    const existing = participants.find(p => p.rollNo === userData.rollNo);
    let user = existing;
    if (!existing) {
      user = { ...userData, participantCode: `TT3-${Math.floor(1000 + Math.random() * 9000)}`, score: 0, status: 'ACTIVE' };
      const newList = [...participants, user];
      setParticipants(newList);
      localStorage.setItem('round3_participants', JSON.stringify(newList));
    }
    setCurrentUser(user);
    if (getRoundStatus() || user.status === 'COMPLETED') setView('EXAM');
    else setView('WAITING');
  };

  const handleExamComplete = (res) => {
    const newList = participants.map(p => p.rollNo === currentUser.rollNo ? { ...p, ...res } : p);
    setParticipants(newList);
    localStorage.setItem('round3_participants', JSON.stringify(newList));
  };

  const clearData = () => {
    if (confirm("Reset Round 3 Data?")) {
      localStorage.removeItem('round3_participants');
      localStorage.setItem('round3_started', 'false');
      setParticipants([]);
    }
  };

  return (
    <>
      {view === 'LOGIN' && <LoginScreen onLogin={handleLogin} onAdminAccess={() => setView('ADMIN')} participants={participants} />}
      {view === 'ADMIN' && <AdminDashboard participants={participants} onLogout={() => setView('LOGIN')} onClearData={clearData} />}
      {view === 'WAITING' && <WaitingLobby user={currentUser} onStart={() => setView('EXAM')} />}
      {view === 'EXAM' && <ExamSession user={currentUser} onComplete={handleExamComplete} />}
    </>
  );
};

export default RoundThree;