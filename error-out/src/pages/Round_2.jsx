import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  Play, 
  Code2, 
  Cpu, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Activity,
  CheckCircle2,
  XCircle,
  User,
  Building,
  Hash,
  Lock, 
  LogOut,
  LayoutDashboard,
  Search,
  Download,
  Trash2,
  AlertCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  Ticket,
  Code
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    title: "The Grade Calculator",
    difficulty: "EASY",
    objective: "Fix the syntax errors (function keyword, brackets) and logic (comparison vs assignment, elseif syntax, and output method).",
    initialCode: `fuction calculateGrade(score) [
  if (score > 100) return "Invalid";
  if (score = 90) {
    return 'A'
  } elseif (score > 80) {
    print("B");
  } else {
    return "F";
  }`,
    validator: (code) => {
      const c = code.replace(/\s/g, '');
      return c.includes('function') && c.includes('>=90') && !c.includes('elseif') && c.includes('else if') && !c.includes('print(') && c.includes('return"B"');
    }
  },
  {
    id: 2,
    title: "Sum Even Numbers",
    difficulty: "MEDIUM",
    objective: "Fix the arrow syntax, variable declaration (total), loop bounds, condition for even numbers, and return variable casing.",
    initialCode: `const sumEvens = (arr) -> {
  const total = 0;
  for (i = 0; i <= arr.length; i++) {
    if (arr[i] % 2 != 0) {
      total += arr[i];
    }
  }
  return Total;
}`,
    validator: (code) => {
      const c = code.replace(/\s/g, '');
      return c.includes('=>') && c.includes('lettotal=0') && c.includes('i<arr.length') && c.includes('%2===0') && c.includes('returntotal');
    }
  },
  {
    id: 3,
    title: "String Reversal",
    difficulty: "EASY",
    objective: "Correct the function keyword, the property typo (lenght), the for-loop delimiters, and the return keyword casing.",
    initialCode: `fucntion reverse(str) {
  const reversed = "";
  for (let i = str.lenght - 1, i >= 0, i--) {
    reversed += str[i];
  }
  Return reversed;
}`,
    validator: (code) => {
      return code.includes('function') && code.includes('length') && code.includes('; i >= 0; i--') && code.includes('return reversed');
    }
  },
  {
    id: 4,
    title: "User Age Validator",
    difficulty: "MEDIUM",
    objective: "Fix the object literal syntax (missing colon) and ensure logic correctly identifies adults (18 and above).",
    initialCode: `const user = {
  name "John"
  age: 17
  isAdult: function() {
    if (this.age > 18) {
      return true;
    }
    return false;
  }
}`,
    validator: (code) => {
      return code.includes('name: "John"') && (code.includes('age >= 18') || code.includes('age > 17'));
    }
  },
  {
    id: 5,
    title: "FizzBuzz Generator",
    difficulty: "HARD",
    objective: "Fix the assignment errors (= vs ===) and resolve the logical priority (15 must be checked first).",
    initialCode: `function fizzBuzz(n) {
  if (n % 3 = 0) {
    return "Fizz";
  }
  if (n % 5 == 0) {
    return "Buzz";
  }
  if (n % 15 == 0) {
    return "FizzBuzz";
  }
  return n;
}`,
    validator: (code) => {
      const fifteenPos = code.indexOf('15');
      const threePos = code.indexOf('3');
      const fivePos = code.indexOf('5');
      return fifteenPos < threePos && fifteenPos < fivePos && code.includes('=== 0');
    }
  },
  {
    id: 6,
    title: "Async Data Fetcher",
    difficulty: "HARD",
    objective: "Implement proper asynchronous handling (async/await) and fix the status comparison error.",
    initialCode: `function getData(url) {
  const data = fetch(url);
  if (data.status = 200) {
    return data.json().name;
  } else {
    throw "Fetch Error";
  }
}`,
    validator: (code) => {
      return code.includes('async function') && code.includes('await fetch') && code.includes('=== 200') && code.includes('await data.json()');
    }
  }
];

// 1. LOGIN SCREEN
const LoginScreen = ({ onLogin, onAdminAccess }) => {
  const [formData, setFormData] = useState({ name: '', dept: '', rollNo: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dept || !formData.rollNo) {
      setError('All fields are required.');
      return;
    }
    onLogin(formData);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-xl border border-green-500/20 mb-4">
            <Terminal className="text-green-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Round 2</h1>
          <p className="text-sm text-gray-500 mt-2">Error Out: Debugging Challenge</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
              <input 
                type="text" 
                className="w-full bg-gray-950 border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-green-500 focus:outline-none transition-all"
                placeholder="Enter your name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Dept</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
                <select 
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-green-500 focus:outline-none appearance-none"
                  value={formData.dept}
                  onChange={e => setFormData({...formData, dept: e.target.value})}
                >
                  <option value="">Select</option>
                  <option value="IT">IT</option>
                  <option value="CS">CS</option>
                  <option value="BA">BA</option>
                  <option value="BMS">BMS</option>
                  <option value="BAF">BAF</option>
                  <option value="Biotech">Biotech</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Roll No</label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
                <input 
                  type="text" 
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-green-500 focus:outline-none transition-all"
                  placeholder="e.g. 101"
                  value={formData.rollNo}
                  onChange={e => setFormData({...formData, rollNo: e.target.value})}
                />
              </div>
            </div>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-xs flex gap-2"><AlertCircle className="w-4 h-4"/>{error}</div>}

          <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-lg shadow-lg transition-all mt-6">
            START ROUND
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 flex justify-center">
          <button onClick={onAdminAccess} className="text-xs font-bold text-gray-600 hover:text-white flex items-center gap-2 transition-colors">
            <Lock className="w-3 h-3" /> ADMIN PORTAL
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. ADMIN DASHBOARD
const AdminDashboard = ({ participants, onLogout, onClearData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expandedCode, setExpandedCode] = useState(null);

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === 'admin') setIsAuthenticated(true);
    else alert('Invalid Password');
  };

  const downloadExcel = () => {
    const headers = ['Rank,Name,Dept,RollNo,ParticipantCode,Status,Score'];
    const rows = participants
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .map((p, idx) => `${idx + 1},${p.name},${p.dept},${p.rollNo},${p.participantCode},${p.status},${p.score}`);
    
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "round2_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center font-mono">
        <div className="max-w-sm w-full bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <LayoutDashboard className="text-green-500" /> Admin Portal
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            <input 
              type="password" 
              className="w-full bg-gray-950 border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-green-500 focus:outline-none"
              placeholder="Enter Access Key"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-all">LOGIN</button>
            <button type="button" onClick={onLogout} className="w-full text-gray-500 text-xs py-2 hover:text-white">Back to Student Login</button>
          </form>
        </div>
      </div>
    );
  }

  const filtered = participants.filter(p => 
    (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.rollNo || '').includes(searchTerm) ||
    (p.participantCode || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-800 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Terminal className="text-green-500" /> ROUND 2 <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs border border-green-500/20 uppercase">Admin</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Live Participant Analytics & Source Editor Review</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={downloadExcel} className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
              <Download className="w-4 h-4" /> PRINT EXCEL (CSV)
            </button>
            <button onClick={onClearData} className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
              <Trash2 className="w-4 h-4" /> CLEAR ENTRIES
            </button>
            <button onClick={onLogout} className="px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
              <LogOut className="w-4 h-4" /> LOGOUT
            </button>
          </div>
        </header>

        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-center bg-gray-900/50 gap-4">
            <h3 className="font-bold text-white flex items-center gap-2">Participant Leaderboard</h3>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:border-green-500 focus:outline-none"
                placeholder="Search name, roll, or ID code..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-950 text-gray-400 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Participant Details</th>
                  <th className="px-6 py-4 text-center">Source Editor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.sort((a,b) => (b.score || 0) - (a.score || 0)).map((p, idx) => (
                  <React.Fragment key={p.rollNo}>
                    <tr className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-mono">#{idx + 1}</td>
                      <td className="px-6 py-4">
                          <div className="font-bold text-white">{p.name}</div>
                          <div className="text-[10px] text-gray-500 uppercase flex items-center gap-2">
                             <span className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-400 font-mono">{p.rollNo}</span>
                             <span>•</span>
                             <span className="text-green-400 font-bold bg-green-500/10 px-1 rounded flex items-center gap-1">
                                <Ticket className="w-2 h-2" /> {p.participantCode}
                             </span>
                          </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => setExpandedCode(expandedCode === p.rollNo ? null : p.rollNo)}
                          disabled={!p.submittedAnswers}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            p.submittedAnswers 
                            ? 'bg-green-600/10 text-green-400 hover:bg-green-600/20 border border-green-500/30 shadow-sm' 
                            : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
                          }`}
                        >
                          <Code className="w-3.5 h-3.5" />
                          {expandedCode === p.rollNo ? 'Hide' : 'Review Code'}
                          {expandedCode === p.rollNo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {p.status === 'COMPLETED' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-tighter">
                            <CheckCircle2 className="w-3 h-3" /> FINISHED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 uppercase tracking-tighter">
                            <Activity className="w-3 h-3" /> ATTEMPTING
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-mono text-green-400 font-bold text-lg">{p.score || 0}</span>
                      </td>
                    </tr>
                    {expandedCode === p.rollNo && p.submittedAnswers && (
                      <tr className="bg-black/50">
                        <td colSpan="5" className="px-6 py-4">
                          <div className="space-y-6">
                            <div className="flex items-center gap-3">
                              <div className="h-px flex-1 bg-gray-800"></div>
                              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Participant Submissions</span>
                              <div className="h-px flex-1 bg-gray-800"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                              {p.submittedAnswers.map((ans, qIdx) => (
                                <div key={qIdx} className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
                                  <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
                                      <span className="bg-gray-800 text-gray-500 w-5 h-5 rounded flex items-center justify-center text-[10px]">{qIdx + 1}</span>
                                      {QUESTIONS[qIdx].title}
                                    </span>
                                    <span className={`text-[10px] font-bold uppercase flex items-center gap-1.5 ${ans.status === 'PASS' ? 'text-green-400' : 'text-red-400'}`}>
                                      {ans.status === 'PASS' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                      {ans.status === 'PASS' ? 'LOGIC PASSED' : 'BUG REMAINING'}
                                    </span>
                                  </div>
                                  <pre className="p-4 text-[11px] font-mono text-green-300 overflow-x-auto whitespace-pre-wrap leading-relaxed bg-[#050505]">
                                    {ans.code}
                                  </pre>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-600 italic">No participant records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. EXAM SESSION
const ExamSession = ({ user, onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [logs, setLogs] = useState([]);
  const [answers, setAnswers] = useState(QUESTIONS.map(q => ({ 
    code: q.initialCode, 
    status: 'UNATTEMPTED' 
  })));

  useEffect(() => {
    if (completed) return;
    const timer = setInterval(() => {
      setTimeLeft(t => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [completed]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRun = () => {
    setIsRunning(true);
    setLogs(["> node debugger.js: Initializing logic scan...", "> Analyzing participant input for syntax errors..."]);
    
    setTimeout(() => {
      const passed = QUESTIONS[currentQIndex].validator(answers[currentQIndex].code);
      const updated = [...answers];
      updated[currentQIndex].status = passed ? 'PASS' : 'FAIL';
      setAnswers(updated);
      
      if (passed) {
        setLogs(prev => [...prev, "✓ Debugging Successful: Logical errors resolved.", "Snippet matches intended behavior."]);
      } else {
        setLogs(prev => [...prev, "⚠ Verification Error: Bugs still present.", "Snippet failed to meet the objective criteria."]);
      }
      setIsRunning(false);
    }, 1200);
  };

  const handleFinish = () => {
    const score = Math.round((answers.filter(a => a.status === 'PASS').length / QUESTIONS.length) * 100);
    // Pass current answers to onComplete to save Source Editor content for Admin view
    onComplete({ score, status: 'COMPLETED', submittedAnswers: answers });
    setCompleted(true);
  };

  const currentQ = QUESTIONS[currentQIndex];
  const currentAnswer = answers[currentQIndex];

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8 text-center font-mono">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter">ROUND 2 SUBMITTED</h1>
        <div className="bg-green-500/10 border border-green-500/20 px-6 py-4 rounded-xl mb-8">
            <span className="text-[10px] text-green-400 uppercase block mb-1 tracking-[0.2em] font-bold">Unique Entry Receipt</span>
            <span className="text-white font-bold text-2xl tracking-widest">{user?.participantCode}</span>
        </div>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-all shadow-lg">
          Round 3
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono flex flex-col">
      <nav className="h-16 border-b border-gray-800 bg-[#0a0d12] flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Terminal className="text-green-500 w-6 h-6" />
          <div>
            <h1 className="font-bold text-white tracking-widest uppercase text-sm">Round 2</h1>
            <div className="flex items-center gap-2 text-[10px]">
                <span className="text-green-400 font-bold bg-green-500/10 px-1 rounded">{user?.participantCode}</span>
                <span className="text-gray-600">/</span>
                <span className="text-gray-500 uppercase">{user?.name}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border ${timeLeft < 300 ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse' : 'bg-gray-900 border-gray-800 text-green-400'} font-bold`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
          <div className="flex gap-1.5">
            {answers.map((ans, i) => (
              <div key={i} className={`w-3.5 h-3.5 rounded-sm transition-all ${i === currentQIndex ? 'bg-white ring-2 ring-green-500' : ans.status === 'PASS' ? 'bg-green-500' : ans.status === 'FAIL' ? 'bg-red-500' : 'bg-gray-800'}`} />
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-6xl mx-auto w-full flex flex-col gap-4">
        <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 shadow-xl border-l-4 border-l-green-500">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="bg-green-900/30 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold border border-green-500/20 uppercase tracking-tighter">Snippet {currentQIndex + 1}</span>
              <h2 className="text-xl font-bold text-white tracking-tight">{currentQ.title}</h2>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded border ${currentQ.difficulty === 'HARD' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
              {currentQ.difficulty}
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-green-500/20 pl-4">{currentQ.objective}</p>
        </section>

        <section className="flex-1 flex flex-col bg-[#0d1117] border border-gray-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden min-h-[450px]">
          <div className="bg-[#161b22] p-3 px-5 border-b border-gray-800 flex justify-between items-center text-[10px] text-gray-400 uppercase font-bold tracking-widest">
            <div className="flex items-center gap-2"><Code2 className="w-4 h-4 text-green-400" /> debugger_core.js</div>
            <div className="flex items-center gap-3">
               {currentAnswer.status === 'PASS' && <span className="text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> CLEAN CODE</span>}
               {currentAnswer.status === 'FAIL' && <span className="text-red-500 flex items-center gap-1"><XCircle className="w-3 h-3"/> BUG DETECTED</span>}
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="w-12 bg-[#0d1117] border-r border-gray-800/50 flex flex-col items-end pr-3 pt-6 text-gray-600 text-[11px] font-mono select-none">
              {Array.from({length: 30}).map((_, i) => <div key={i} className="h-6 leading-6">{i+1}</div>)}
            </div>
            <textarea 
              value={answers[currentQIndex].code}
              onChange={e => {
                const up = [...answers];
                up[currentQIndex].code = e.target.value;
                setAnswers(up);
              }}
              spellCheck="false"
              className="flex-1 bg-transparent p-6 pt-6 font-mono text-sm focus:outline-none resize-none text-blue-100 leading-6"
            />
          </div>
          
          <div className="p-4 bg-[#161b22] border-t border-gray-800 flex justify-between items-center">
            <button 
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(i => i - 1)}
              className="text-[10px] font-bold text-gray-500 hover:text-white disabled:opacity-30 uppercase tracking-widest flex items-center gap-1"
            >
              <ChevronLeft className="w-3 h-3" /> Prev
            </button>

            <button 
              onClick={handleRun}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-500 text-white px-10 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center gap-2"
            >
              {isRunning ? <Activity className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              Test Snippet
            </button>

            {currentQIndex === QUESTIONS.length - 1 ? (
              <button onClick={handleFinish} className="text-[10px] font-bold text-green-500 hover:text-green-400 uppercase tracking-widest flex items-center gap-1 transition-colors">
                Final Submission <Flag className="w-3 h-3" />
              </button>
            ) : (
              <button onClick={() => setCurrentQIndex(i => i + 1)} className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-1 transition-colors">
                Next Bug <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </section>

        <section className="bg-black border border-gray-800 rounded-2xl flex flex-col overflow-hidden h-40 shadow-2xl mb-8">
          <div className="bg-[#111] p-2 px-5 border-b border-gray-800 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Execution Logs</span>
          </div>
          <div className="p-4 font-mono text-xs overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-700 italic">// Environment ready. Click "Test Snippet" to verify logic.</p>
            ) : (
              <div className="space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className={log.startsWith('>') ? 'text-blue-400' : log.includes('✓') ? 'text-green-400' : 'text-red-400'}>
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

// FINAL ROOT COMPONENT
const RoundTwo = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('LOGIN'); 
  const [currentUser, setCurrentUser] = useState(null);
  
  const [participants, setParticipants] = useState(() => {
    try {
      const saved = localStorage.getItem('round2_participants');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const handleLogin = (userData) => {
    const existing = participants.find(p => p.rollNo === userData.rollNo);
    if (existing) {
      setCurrentUser(existing);
    } else {
      const randomCode = `TT2-${Math.floor(1000 + Math.random() * 9000)}`;
      const newUser = { ...userData, participantCode: randomCode, score: 0, status: 'ACTIVE' };
      const newList = [...participants, newUser];
      setParticipants(newList);
      localStorage.setItem('round2_participants', JSON.stringify(newList));
      setCurrentUser(newUser);
    }
    setView('EXAM');
  };

  const handleExamComplete = (result) => {
    const newList = participants.map(p => 
      p.rollNo === currentUser.rollNo ? { ...p, ...result } : p
    );
    setParticipants(newList);
    localStorage.setItem('round2_participants', JSON.stringify(newList));
  };

  const clearData = () => {
    if (confirm("DANGER: This will permanently delete ALL entries for Round 2. Continue?")) {
      setParticipants([]);
      localStorage.removeItem('round2_participants');
    }
  };

  return (
    <>
      {view === 'LOGIN' && <LoginScreen onLogin={handleLogin} onAdminAccess={() => setView('ADMIN')} />}
      {view === 'ADMIN' && <AdminDashboard participants={participants} onLogout={() => setView('LOGIN')} onClearData={clearData} />}
      {view === 'EXAM' && <ExamSession user={currentUser} onComplete={handleExamComplete} />}
    </>
  );
};

export default RoundTwo;