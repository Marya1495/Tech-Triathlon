import React, { useState, useEffect } from 'react';
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
  Code,
  Loader2,
  PlayCircle,
  StopCircle,
  FileSpreadsheet,
  Circle,
  ArrowRight
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "EASY",
    objective: "Debug the function to correctly reverse a string. Fix the loop bounds, semicolons, and variable naming. Target output: 'olleh'",
    expectedOutput: "olleh",
    initialCode: `function reverseStr(str) {
    let result = "";
    for(let i = str.length; i >= 0; i--) {
        result += str[i]
    }
    return results;
}

console.log(reverseStr("hello"));`,
    fixChecks: [
      /i\s*=\s*str\.length\s*-\s*1/, 
      /return\s+result\s*(?!s)/,     
      /result\s*\+=\s*str\[i\]\s*;/, 
      /reverseStr\(\s*["']hello["']\s*\)/, 
      /for\s*\(let\s+i/              
    ]
  },
  {
    id: 2,
    title: "Check Palindrome Number",
    difficulty: "EASY",
    objective: "Correct the logic to identify palindrome integers. Target output: 'true'",
    expectedOutput: "true",
    initialCode: `function isPalindrome(num) {
    let rev = 0;
    let temp == num;

    while(num > 1) {
        rev = rev * 10 + num % 10
        num = num / 10;
    }

    return temp = rev;
}

console.log(isPalindrome(121));`,
    fixChecks: [
      /temp\s*=\s*num/,              
      /while\s*\(\s*num\s*>\s*0\s*\)/, 
      /Math\.floor\(\s*num\s*\/\s*10\s*\)/, 
      /temp\s*===\s*rev/,            
      /num\s*%\s*10\s*\);/           
    ]
  },
  {
    id: 3,
    title: "Valid Parentheses Checker",
    difficulty: "MEDIUM",
    objective: "Fix the stack implementation for checking balanced parentheses. Target output: 'true'",
    expectedOutput: "true",
    initialCode: `function isValidParentheses(str) {
    let stack = [];

    for(let ch of str) {
        if(ch == "(")
            stack.push(ch);
        else if(ch == ")") {
            if(stack.length == 0) return true;
            stack.pop;
        }
    }

    return stack.length != 0;
}

console.log(isValidParentheses("(())"));`,
    fixChecks: [
      /return\s+false\s*;/,          
      /stack\.pop\(\)/,              
      /stack\.length\s*===\s*0/,     
      /ch\s*===\s*["']\(["']/,       
      /stack\.length\s*==\s*0/       
    ]
  },
  {
    id: 4,
    title: "Find Missing Number (1 to N)",
    difficulty: "MEDIUM",
    objective: "Fix the formula and the loop indexing to find the missing number. Target output: '4'",
    expectedOutput: "4",
    initialCode: `function missing(arr, n) {
    let total = n * (n + 1 / 2);
    let sum = 0;

    for(let i = 1; i <= arr.length; i++)
        sum += arr[i];

    return total - sum;
}

console.log(missing([1,2,3,5], 5));`,
    fixChecks: [
      /\(\s*n\s*\+\s*1\s*\)\s*\/\s*2/, 
      /i\s*=\s*0/,                   
      /i\s*<\s*arr\.length/,         
      /sum\s*\+=\s*arr\[i\]/,        
      /let\s+total/                  
    ]
  },
  {
    id: 5,
    title: "Anagram Checker",
    difficulty: "HARD",
    objective: "Correct comparison logic and conversion to determine if words are anagrams. Target output: 'true'",
    expectedOutput: "true",
    initialCode: `function isAnagram(a, b) {
    if(a.length != b.length) return true;

    a = a.split("").sort();
    b = b.split("").sort();

    return a == b;
}

console.log(isAnagram("listen", "silent"));`,
    fixChecks: [
      /return\s+false\s*;/,          
      /\.join\(\s*["']\s*["']\s*\)/, 
      /===\s*/,                      
      /a\.split\(/,                  
      /b\.split\(/                   
    ]
  },
  {
    id: 6,
    title: "Longest Word in Sentence",
    difficulty: "HARD",
    objective: "Find and return the longest word. Fix the loop and comparison. Target output: 'Debugging'",
    expectedOutput: "Debugging",
    initialCode: `function longestWord(sentence) {
    let words = sentence.split(" ");
    let longest = words[0];

    for(let i = 1; i <= words.length; i++) {
        if(words[i].length >= longest.length);
            longest = words[i]
    }

    return longestWord;
}

console.log(longestWord("Debugging requires strong logical thinking"));`,
    fixChecks: [
      /i\s*<\s*words\.length/,       
      /length\s*>\s*longest\.length/, 
      /return\s+longest(?!\s*Word)/,  
      /longest\s*=\s*words\[i\]\s*;/, 
      /split\(\s*["']\s+["']\s*\)/   
    ]
  }
];

const getRoundStatus = () => {
  return localStorage.getItem('round2_started') === 'true';
};

const LoginScreen = ({ onLogin, onAdminAccess, participants }) => {
  const [formData, setFormData] = useState({ name: '', dept: '', rollNo: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dept || !formData.rollNo) {
      setError('All fields are required.');
      return;
    }
    const isStarted = getRoundStatus();
    const existing = participants.find(p => p.rollNo === formData.rollNo);
    if (isStarted && !existing) {
      setError('The round has already started. Late entries are not permitted.');
      return;
    }
    onLogin(formData);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-xl border border-green-500/20 mb-4">
            <Terminal className="text-green-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Round 2</h1>
          <p className="text-sm text-gray-500 mt-2 tracking-widest uppercase">The Debugging Engine</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input 
              type="text" placeholder="Full Name" 
              className="w-full bg-gray-950 border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-green-500 outline-none transition-all"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <select 
                className="bg-gray-950 border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-green-500 outline-none"
                value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})}
              >
                <option value="">Dept</option>
                <option value="IT">IT</option><option value="CS">CS</option><option value="BA">BA</option>
                <option value="BMS">BMS</option><option value="BAF">BAF</option><option value="Biotech">Biotech</option>
              </select>
              <input 
                type="text" placeholder="Roll No" 
                className="bg-gray-950 border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-green-500 outline-none"
                value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})}
              />
            </div>
          </div>
          {error && <p className="text-red-400 text-xs italic bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}
          <button className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 text-lg uppercase tracking-widest">
            LOGIN & START
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-800 flex justify-center">
          <button onClick={onAdminAccess} className="text-xs text-gray-600 hover:text-white flex items-center gap-2 transition-colors"><Lock className="w-3 h-3" /> ADMIN PORTAL</button>
        </div>
      </div>
    </div>
  );
};

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
        <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight uppercase">Waiting Room</h2>
        <p className="text-sm text-gray-500 mb-8 italic">Standby, <span className="text-green-400 font-bold">{user?.name}</span>. The challenge will begin shortly when the admin triggers the start signal.</p>
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-[10px] flex justify-between uppercase font-bold text-gray-500 tracking-widest">
           <span>Status: Ready</span>
           <span className="text-green-500">{user?.participantCode}</span>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ participants, onLogout, onClearData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('round2_admin_auth') === 'true');
  const [isRoundStarted, setIsRoundStarted] = useState(getRoundStatus());
  const [expandedUser, setExpandedUser] = useState(null);

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('round2_admin_auth', 'true');
    }
    else alert('Invalid Access Key');
  };

  const toggleRound = () => {
    const newState = !isRoundStarted;
    setIsRoundStarted(newState);
    localStorage.setItem('round2_started', newState.toString());
  };

  const getStatus = (p) => {
    if (p.status === 'COMPLETED') return { label: 'Completed', color: 'text-green-500', icon: CheckCircle2 };
    if (p.lastSeen && Date.now() - p.lastSeen < 20000) {
      return { label: 'Active', color: 'text-blue-500', icon: Activity };
    }
    return { label: 'Logout', color: 'text-red-500', icon: Circle };
  };

  const downloadCSV = () => {
    const sorted = [...participants].sort((a, b) => (b.score || 0) - (a.score || 0));
    const headers = ["Rank", "Name", "Roll No", "ID Code", "Dept", "Status", "Score"];
    const rows = sorted.map((p, i) => [
      i + 1,
      `"${p.name}"`,
      p.rollNo,
      p.participantCode,
      p.dept,
      getStatus(p).label,
      p.score || 0
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Round_2_Results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center font-mono">
        <form onSubmit={handleAuth} className="bg-gray-900 p-8 rounded-xl border border-gray-800 space-y-4 max-w-sm w-full shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-mono uppercase tracking-widest"><LayoutDashboard className="text-green-500" /> Admin Login</h2>
          <input type="password" placeholder="Enter Access Key" className="w-full bg-gray-950 border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-green-500 outline-none" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="w-full bg-green-600 font-bold py-3 rounded-lg text-white hover:bg-green-500 transition-colors">AUTHENTICATE</button>
          <button type="button" onClick={onLogout} className="w-full text-gray-500 text-xs py-2 hover:text-white">Student Login</button>
        </form>
      </div>
    );
  }

  const filtered = participants.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.rollNo?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white uppercase flex items-center gap-2"><Terminal className="text-green-500" /> Control Dashboard</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Live Participant Analytics</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={downloadCSV} className="px-4 py-2 bg-blue-600/10 border border-blue-600/30 text-blue-400 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-blue-600/20">
            <FileSpreadsheet className="w-4 h-4" /> EXCEL EXPORT
          </button>
          <button onClick={onClearData} className="px-4 py-2 bg-red-900/10 border border-red-900/30 text-red-400 rounded-lg text-xs font-bold hover:bg-red-900/20">RESET DATA</button>
          <button onClick={() => {
            localStorage.removeItem('round2_admin_auth');
            onLogout();
          }} className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-xs font-bold hover:bg-gray-800">LOGOUT</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* BIG CENTERED START BUTTON */}
        <div className="flex flex-col items-center justify-center py-16 bg-gray-900/30 border border-gray-800 rounded-[3rem] shadow-2xl">
           <h2 className="text-gray-500 text-xs font-bold uppercase tracking-[0.5em] mb-8">Round 2 Master Trigger</h2>
           <button 
             onClick={toggleRound} 
             className={`px-24 py-10 rounded-3xl text-3xl font-black transition-all flex flex-col items-center gap-4 border-8 transform hover:scale-105 active:scale-95 ${
               isRoundStarted 
               ? 'bg-red-600/10 border-red-600/30 text-red-500 shadow-[0_0_50px_rgba(220,38,38,0.25)]' 
               : 'bg-green-600/10 border-green-600/30 text-green-500 shadow-[0_0_50px_rgba(22,163,74,0.25)]'
             }`}
           >
             {isRoundStarted ? <StopCircle className="w-12 h-12" /> : <PlayCircle className="w-12 h-12" />}
             {isRoundStarted ? 'STOP ROUND' : 'START ROUND'}
             <span className="text-xs font-bold tracking-[0.2em] mt-2 opacity-50 uppercase">
                {isRoundStarted ? 'LOCKED (NO NEW ENTRIES)' : 'OPENING FOR WAITING STUDENTS'}
             </span>
           </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-black/30 flex flex-col sm:flex-row justify-between items-center border-b border-gray-800 gap-4">
            <h3 className="font-bold text-white uppercase text-sm tracking-widest">Active Leaderboard</h3>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-600" />
              <input 
                type="text" 
                placeholder="Search Name or Roll No..." 
                className="w-full bg-gray-950 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-xs outline-none focus:border-green-500" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/50 text-gray-500 uppercase text-[10px] font-bold tracking-widest border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Participant</th>
                  <th className="px-6 py-4">Dept</th>
                  <th className="px-6 py-4 text-center">Live Status</th>
                  <th className="px-6 py-4 text-center">Review</th>
                  <th className="px-6 py-4 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.sort((a,b) => (b.score || 0) - (a.score || 0)).map((p, idx) => {
                  const statusInfo = getStatus(p);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <React.Fragment key={p.rollNo}>
                      <tr className={`hover:bg-gray-800/30 transition-colors ${expandedUser === p.rollNo ? 'bg-gray-800/50' : ''}`}>
                        <td className="px-6 py-4 text-gray-600 font-mono italic">#{idx + 1}</td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{p.name}</div>
                          <div className="text-[10px] text-gray-500 flex gap-2 uppercase font-mono">
                            <span>Roll: {p.rollNo}</span>
                            <span>•</span>
                            <span className="text-green-600 font-bold">{p.participantCode}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-[10px] font-bold uppercase">{p.dept || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${statusInfo.color.replace('text-', 'bg-').replace('-500', '-500/10')} ${statusInfo.color.replace('text-', 'border-').replace('-500', '-500/20')} ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => setExpandedUser(expandedUser === p.rollNo ? null : p.rollNo)}
                            className="text-gray-400 hover:text-white transition-colors p-2"
                          >
                            {expandedUser === p.rollNo ? <ChevronUp className="w-5 h-5 text-green-500" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono text-green-400 font-bold text-lg">{p.score || 0}<span className="text-[10px] text-gray-600 ml-1">/100</span></span>
                        </td>
                      </tr>
                      {expandedUser === p.rollNo && (
                        <tr className="bg-black/40">
                          <td colSpan="6" className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {QUESTIONS.map((q, qIdx) => {
                                const ans = p.progress?.[qIdx] || { status: 'UNATTEMPTED', code: q.initialCode };
                                return (
                                  <div key={q.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg border-l-4 border-l-gray-700">
                                    <div className="bg-black/30 p-3 flex justify-between items-center border-b border-gray-800">
                                      <div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase block tracking-tighter">Snippet {qIdx + 1}</span>
                                        <span className="text-sm font-bold text-white">{q.title}</span>
                                      </div>
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${ans.status === 'PASS' ? 'text-green-500 border-green-500/30 bg-green-500/10' : 'text-gray-500 border-gray-700'}`}>
                                        {ans.status === 'PASS' ? 'VERIFIED (16pts)' : `PARTIAL (${ans.partialPoints || 0}pts)`}
                                      </span>
                                    </div>
                                    <div className="p-4 space-y-3">
                                      <div className="bg-black/20 p-2 rounded border border-gray-800/50">
                                        <span className="text-[9px] font-bold text-green-600 uppercase block mb-1">Score Criteria</span>
                                        <p className="text-[11px] text-gray-400 leading-relaxed italic">{q.objective}</p>
                                      </div>
                                      <pre className="bg-[#050505] p-3 rounded-lg text-[10px] font-mono text-blue-100 overflow-x-auto border border-gray-800 leading-relaxed whitespace-pre-wrap">
                                        {ans.code}
                                      </pre>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamSession = ({ user, onComplete, onProgressUpdate }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [logs, setLogs] = useState([]);
  const [answers, setAnswers] = useState(user?.progress || QUESTIONS.map(q => ({ code: q.initialCode, status: 'UNATTEMPTED', partialPoints: 0 })));

  useEffect(() => { setLogs([]); }, [currentQIndex]);
  
  useEffect(() => {
    onProgressUpdate(answers);
  }, [answers]);

  useEffect(() => {
    if (completed) return;
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [completed]);

  const handleRun = async () => {
    setIsRunning(true);
    setLogs(["> Initializing verification environment...", "> Scanning source logic..."]);

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        body: JSON.stringify({
          language: "javascript",
          version: "18.15.0",
          files: [{ content: answers[currentQIndex].code }]
        })
      });

      const data = await response.json();
      const output = data.run.stdout.trim();
      const passed = output === QUESTIONS[currentQIndex].expectedOutput;
      const updated = [...answers];
      
      let currentFixes = 0;
      QUESTIONS[currentQIndex].fixChecks.forEach(pattern => {
        if (pattern.test(answers[currentQIndex].code)) currentFixes++;
      });
      
      updated[currentQIndex].partialPoints = currentFixes * 2;
      updated[currentQIndex].status = passed ? "PASS" : "FAIL";

      const newLogs = [];
      if (passed) {
        newLogs.push(`> OUTPUT: ${output}`);
        newLogs.push("✓ CRITERIA MATCHED: Bug resolved successfully.");
      } else {
        newLogs.push("⚠ There are still syntax and logical errors are present!");
      }
      
      setLogs(newLogs);
      setAnswers(updated);
    } catch (err) {
      setLogs(["⚠ There are still syntax and logical errors are present!"]);
    }
    setIsRunning(false);
  };

  const handleFinish = () => {
    let totalScore = 0;
    let passedAll = true;

    answers.forEach(ans => {
        if (ans.status === 'PASS') totalScore += 16;
        else {
            totalScore += (ans.partialPoints || 0);
            passedAll = false;
        }
    });

    if (passedAll && timeLeft > 0) totalScore += 4;
    const finalScore = Math.min(100, totalScore);

    onComplete({ score: finalScore, status: 'COMPLETED', progress: answers });
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8 text-center font-mono text-white">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border-4 border-green-500/30 mb-8 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase italic tracking-tighter">
           Challenge Submitted!
        </h1>
        
        <div className="max-w-2xl mb-12">
           <h2 className="text-4xl font-bold text-green-400 mb-4">{user?.name} 🌟</h2>
           <p className="text-gray-400 text-lg leading-relaxed">
             For completing the <span className="text-white font-bold uppercase tracking-widest">Error Out</span> round successfully, you did a great job! 🎉 
             Your logical debugging skills are impressive. Now moving forward to the next challenge! 💪
           </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => window.location.href = '/round_3'} 
            className="px-12 py-5 bg-green-600 hover:bg-green-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_40px_rgba(22,163,74,0.4)] active:scale-95 flex items-center gap-3"
          >
            PROCEED TO ROUND 3 <ArrowRight className="w-7 h-7" />
          </button>
          
          <button 
            onClick={() => {
                localStorage.removeItem('round2_current_roll');
                localStorage.removeItem('round2_view');
                window.location.reload();
            }} 
            className="px-8 py-5 bg-gray-900 border border-gray-800 text-gray-400 rounded-[2rem] font-bold transition-all hover:bg-gray-800"
          >
            LOGOUT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono flex flex-col h-screen overflow-hidden">
      <nav className="h-16 border-b border-gray-800 bg-[#0a0d12] flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <Terminal className="text-green-500 w-6 h-6" />
          <div>
            <h1 className="font-bold text-white uppercase text-xs italic tracking-widest">Round 2: Error Out</h1>
            <div className="text-[9px] text-gray-500 font-bold uppercase"><span className="text-green-600">{user?.name}</span> • Roll: {user?.rollNo}</div>
          </div>
        </div>
        <div className="bg-gray-900 px-4 py-1.5 rounded-lg border border-gray-800 text-green-400 font-black shadow-inner">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row p-4 gap-4 overflow-hidden bg-[#05070a]">
        <div className="lg:w-1/3 flex flex-col gap-4 overflow-hidden shrink-0">
            <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 border-l-4 border-l-green-500 shadow-xl overflow-y-auto">
                <span className="text-[10px] font-bold bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20 uppercase">Task {currentQIndex + 1}</span>
                <h2 className="text-xl font-bold text-white mb-2 tracking-tight">{QUESTIONS[currentQIndex].title}</h2>
                <p className="text-xs text-gray-400 leading-relaxed bg-black/40 p-4 rounded-xl border border-gray-800/50 italic">{QUESTIONS[currentQIndex].objective}</p>
                <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {answers.map((ans, i) => (
                    <button key={i} onClick={() => setCurrentQIndex(i)} className={`w-10 h-10 rounded-lg shrink-0 text-xs font-bold border transition-all ${i === currentQIndex ? 'bg-white text-black border-white' : ans.status === 'PASS' ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>{i + 1}</button>
                  ))}
                </div>
            </section>
            <section className="bg-black border border-gray-800 rounded-2xl flex flex-1 flex-col overflow-hidden shadow-2xl min-h-0">
                <div className="bg-[#111] p-2 px-5 border-b border-gray-800 flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-gray-500" /><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Verification Console</span></div>
                <div className="p-4 font-mono text-[11px] overflow-y-auto flex-1 leading-relaxed custom-scrollbar">
                    {logs.length === 0 ? <p className="text-gray-700 italic">// Environment Ready. Debug the logic and click TEST SNIPPET.</p> : 
                    logs.map((log, i) => <pre key={i} className={`whitespace-pre-wrap break-all ${log.startsWith('✓') ? 'text-green-400 font-bold' : log.startsWith('⚠') ? 'text-red-400' : 'text-blue-400'}`}>{log}</pre>)}
                </div>
            </section>
        </div>

        <div className="lg:w-2/3 flex flex-col bg-[#0d1117] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden relative h-full">
            <div className="bg-[#161b22] p-3 px-6 border-b border-gray-800 flex justify-between items-center text-[10px] text-gray-400 uppercase font-black tracking-widest shrink-0">
                <div className="flex items-center gap-2 font-mono"><Code2 className="w-4 h-4 text-green-500" /> debugger_script.js</div>
                {answers[currentQIndex].status === 'PASS' && <span className="text-green-400 font-black animate-pulse flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> VERIFIED</span>}
            </div>
            <div className="flex-1 overflow-hidden relative group">
                <textarea 
                    spellCheck="false"
                    className="w-full h-full bg-transparent p-8 font-mono text-sm focus:outline-none resize-none text-blue-100 leading-relaxed selection:bg-green-500/20"
                    value={answers[currentQIndex].code}
                    onChange={e => {
                        const up = [...answers];
                        up[currentQIndex].code = e.target.value;
                        setAnswers(up);
                    }}
                />
            </div>
            <div className="p-5 bg-[#161b22]/90 border-t border-gray-800 flex justify-between items-center px-10 shrink-0">
                <div className="flex gap-4">
                    <button disabled={currentQIndex === 0} onClick={() => setCurrentQIndex(i => i - 1)} className="text-[10px] font-black text-gray-600 hover:text-white disabled:opacity-30 uppercase tracking-widest transition-all">BACK</button>
                    <button disabled={currentQIndex === QUESTIONS.length - 1} onClick={() => setCurrentQIndex(i => i + 1)} className="text-[10px] font-black text-gray-600 hover:text-white disabled:opacity-30 uppercase tracking-widest transition-all">NEXT</button>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={handleRun} disabled={isRunning} className="bg-green-600 hover:bg-green-500 text-white px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center gap-2 active:scale-95">
                        {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                        TEST SNIPPET
                    </button>
                    {currentQIndex === QUESTIONS.length - 1 && <button onClick={handleFinish} className="bg-white text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 shadow-lg active:scale-95">FINISH</button>}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

const RoundTwo = () => {
  const [participants, setParticipants] = useState(() => {
    try {
      const saved = localStorage.getItem('round2_participants');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  // LOGIC: If it's NOT a page reload (i.e. landing from home), force Login.
  // Performance timing API is used to detect reload vs navigation.
  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem('round2_view');
    const savedRoll = localStorage.getItem('round2_current_roll');
    
    // Check if the current page load is a manual refresh (type 1 or 'reload')
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';

    if (savedView === 'ADMIN') return 'ADMIN';
    
    // If it's a reload and we have a session, stay on the page.
    // Otherwise, force a login to ensure security/reset when coming from Home.
    if (isReload && savedRoll && savedView) {
      return savedView;
    }

    return 'LOGIN';
  }); 

  const [currentUser, setCurrentUser] = useState(() => {
    const rollNo = localStorage.getItem('round2_current_roll');
    if (!rollNo) return null;
    return participants.find(p => p.rollNo === rollNo) || null;
  });

  useEffect(() => {
    localStorage.setItem('round2_view', view);
  }, [view]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('round2_current_roll', currentUser.rollNo);
    } else {
      localStorage.removeItem('round2_current_roll');
    }
  }, [currentUser]);

  const handleLogin = (userData) => {
    const existing = participants.find(p => p.rollNo === userData.rollNo);
    let user = existing;
    if (!existing) {
      user = { 
        ...userData, 
        participantCode: `TT2-${Math.floor(1000 + Math.random() * 9000)}`, 
        score: 0, 
        status: 'ACTIVE',
        lastSeen: Date.now(),
        progress: QUESTIONS.map(q => ({ code: q.initialCode, status: 'UNATTEMPTED', partialPoints: 0 })) 
      };
      const newList = [...participants, user];
      setParticipants(newList);
      localStorage.setItem('round2_participants', JSON.stringify(newList));
    } else {
      user.lastSeen = Date.now();
      const newList = participants.map(p => p.rollNo === user.rollNo ? user : p);
      setParticipants(newList);
      localStorage.setItem('round2_participants', JSON.stringify(newList));
    }
    setCurrentUser(user);
    if (getRoundStatus() || user.status === 'COMPLETED') setView('EXAM');
    else setView('WAITING');
  };

  const handleProgressUpdate = (updatedAnswers) => {
    if (!currentUser) return;
    const newList = participants.map(p => 
      p.rollNo === currentUser.rollNo ? { ...p, progress: updatedAnswers, lastSeen: Date.now() } : p
    );
    setParticipants(newList);
    localStorage.setItem('round2_participants', JSON.stringify(newList));
  };

  const handleExamComplete = (result) => {
    const newList = participants.map(p => p.rollNo === currentUser.rollNo ? { ...p, ...result, lastSeen: Date.now() } : p);
    setParticipants(newList);
    localStorage.setItem('round2_participants', JSON.stringify(newList));
  };

  const handleLogout = () => {
    localStorage.removeItem('round2_current_roll');
    localStorage.removeItem('round2_view');
    localStorage.removeItem('round2_admin_auth');
    setView('LOGIN');
    setCurrentUser(null);
  };

  return (
    <>
      {view === 'LOGIN' && <LoginScreen onLogin={handleLogin} onAdminAccess={() => setView('ADMIN')} participants={participants} />}
      {view === 'ADMIN' && <AdminDashboard participants={participants} onLogout={handleLogout} onClearData={() => {
        if(confirm("DANGER: This will permanently wipe all local data. Proceed?")) { 
          localStorage.clear(); 
          window.location.reload(); 
        }
      }} />}
      {view === 'WAITING' && <WaitingLobby user={currentUser} onStart={() => setView('EXAM')} />}
      {view === 'EXAM' && <ExamSession user={currentUser} onProgressUpdate={handleProgressUpdate} onComplete={handleExamComplete} />}
    </>
  );
};

export default RoundTwo;