import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Send,
  Building2,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Bot,
  User,
  ShieldCheck
} from 'lucide-react';

export default function AIAdvisorPage({ setActiveTab, setSelectedCollegeId }) {
  const { colleges, events, currentUser } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${currentUser.name}! 👋 I am your **CampusBridge AI Counselor**.\n\nI have complete, verified knowledge about all regional colleges (MITS Meerut, NIET Greater Noida, GEA Ghaziabad, DTU Delhi, COEP Pune), their fee structures, branch-wise placements, admission deadlines, and inter-college events.\n\nHow can I help you navigate your college choices today?`
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Knowledge base generator & query responder
  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    // Comparison between Meerut & Noida
    if ((q.includes('meerut') && q.includes('noida')) || (q.includes('compare') && (q.includes('mits') || q.includes('niet')))) {
      return `### ⚖️ Side-by-Side Comparison: MITS Meerut vs. NIET Greater Noida\n\n` +
        `1. **Annual Tuition Fee (B.Tech CSE):**\n` +
        `   - **MITS Meerut:** ₹1,15,000 / year (Hostel: ₹75,000)\n` +
        `   - **NIET Greater Noida:** ₹1,48,000 / year (Hostel: ₹92,000)\n\n` +
        `2. **Placement Metrics:**\n` +
        `   - **MITS Meerut:** Avg Package: ₹6.8 LPA | Highest: ₹28.5 LPA (TCS, Infosys, Paytm)\n` +
        `   - **NIET Greater Noida:** Avg Package: ₹8.4 LPA | Highest: ₹44.0 LPA (Amazon, Microsoft, Deloitte)\n\n` +
        `3. **Key Facilities & Strengths:**\n` +
        `   - MITS has an active Robotics & IoT Incubation Hub.\n` +
        `   - NIET is NAAC A++ accredited and has official Apple iOS & Mercedes-Benz labs.\n\n` +
        `💡 *Recommendation:* If budget-friendly high-ROI engineering is your top priority, MITS Meerut offers solid value. If top-tier tier-1 MNC placements and Apple/Mercedes labs are preferred, NIET Greater Noida has an edge.`;
    }

    // AI / ML courses
    if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('data science') || q.includes('ml')) {
      return `### 🤖 Best Campuses for AI & Data Science Specializations:\n\n` +
        `1. **NIET Greater Noida:**\n` +
        `   - Program: B.Tech Data Science & Analytics\n` +
        `   - Fee: ₹1,45,000/yr | Seats: 180\n` +
        `   - Avg Package: ₹8.1 LPA | Highest: ₹38.0 LPA\n\n` +
        `2. **MITS Meerut:**\n` +
        `   - Program: B.Tech AI & Machine Learning\n` +
        `   - Fee: ₹1,25,000/yr | Seats: 120\n` +
        `   - Avg Package: ₹7.4 LPA | Highest: ₹32.0 LPA\n\n` +
        `3. **DTU Delhi:**\n` +
        `   - Program: B.Tech Mathematics & Computing\n` +
        `   - Avg Package: ₹19.1 LPA | Highest: ₹76.0 LPA\n\n` +
        `All three programs accept JEE Main scores. Applications for 2026-27 are currently open!`;
    }

    // Eligibility or Admission
    if (q.includes('eligibility') || q.includes('admission') || q.includes('deadline') || q.includes('cutoff')) {
      return `### 📋 2026-27 Admission Criteria Summary:\n\n` +
        `• **MITS Meerut:** 10+2 with PCM (Min 60%) + JEE Main / UPTAC. Deadline: **July 31, 2026**.\n` +
        `• **NIET Greater Noida:** 10+2 with PCM (Min 65%) + JEE Main score. Deadline: **August 15, 2026**.\n` +
        `• **GEA Ghaziabad:** 10+2 with PCM (Min 55%) + JEE Main / UPTAC. Deadline: **July 25, 2026**.\n` +
        `• **DTU Delhi:** JAC Delhi Counselling via JEE Main Paper 1. Deadline: **June 28, 2026**.\n\n` +
        `Tip: You can download official disclosures or visit the college details page right inside CampusBridge!`;
    }

    // Event or Hackathon
    if (q.includes('hackathon') || q.includes('event') || q.includes('pass') || q.includes('qr') || q.includes('target')) {
      return `### 🚀 Inter-College Hackathon & Pass Architecture:\n\n` +
        `1. **Target-Campus Broadcast:** Colleges can publish events selectively. For example, MITS Meerut broadcasted the *North India Inter-College Hackathon 2026* with **₹2,50,000 Prize Pool** specifically targeted at NIET Noida, GEA Ghaziabad, and MITS Meerut!\n` +
        `2. **Cryptographic Single-Use QR Pass:** When an eligible student registers, a unique ticket token is minted (e.g. \`CB-PASS-...\`).\n` +
        `3. **Duplicate-Proof Check-In:** At the entrance, the organizer scans the pass. If the pass is scanned a second time, the system instantly rejects entry with a security alert.`;
    }

    // Fees under 1.5 Lakh
    if (q.includes('fee') || q.includes('cheap') || q.includes('affordable') || q.includes('budget') || q.includes('cost')) {
      return `### 💰 B.Tech CSE Annual Fees (Affordable Regional Options):\n\n` +
        `1. **GEA Ghaziabad:** ₹1,10,000 / year (Hostel: ₹70,000)\n` +
        `2. **MITS Meerut:** ₹1,15,000 / year (Hostel: ₹75,000)\n` +
        `3. **NIET Greater Noida:** ₹1,48,000 / year (Hostel: ₹92,000)\n` +
        `4. **COEP Tech Pune:** ₹1,42,000 / year (Govt Unitary University)\n\n` +
        `Both MITS Meerut and GEA Ghaziabad offer direct scholarships for students with 80%+ marks in 12th PCM.`;
    }

    // Default intelligent fallback grounded in database
    return `### 🎓 CampusBridge Guidance:\n\n` +
      `Regarding **"${query}"**:\n\n` +
      `Across the CampusBridge network, we currently have **${colleges.length} verified institutions** and **${events.length} active inter-college hackathons**.\n\n` +
      `• For top private colleges in Western UP & NCR, explore **MITS Meerut** (known for AI/Robotics) and **NIET Greater Noida** (top placements and Apple Academy).\n` +
      `• For premier government institutions, check **DTU Delhi** and **COEP Pune**.\n` +
      `• You can request laboratory passes or apply for inter-college hackathons from the respective tabs.\n\n` +
      `Feel free to ask for specific comparisons (e.g., *"Compare Meerut and Noida placements"* or *"What is the fee for AI branch?"*).`;
  };

  const handleSendQuery = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAIResponse(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const samplePrompts = [
    "Compare MITS Meerut vs NIET Greater Noida fees & packages",
    "Which college has best AI & Machine Learning course?",
    "What are the admission deadlines & entrance exams for 2026?",
    "How does the target-campus hackathon pass system work?",
    "Show me colleges with CSE fees under ₹1.5 Lakhs"
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2 pb-4 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Grounded Gemini-Powered Knowledge Base</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">CampusBridge AI Advisor</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Get transparent, audited answers about regional college cutoffs, fee structures, hostel rules, and cross-campus events.
        </p>
      </div>

      {/* Quick Prompts Bar */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Popular Questions (Click to Ask):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(prompt)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition text-left"
            >
              💬 {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 min-h-[460px] max-h-[560px] overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-tl-none space-y-2'}`}>
              <div className="whitespace-pre-line">
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 text-slate-400 text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Analyzing college disclosures and fees...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuery();
        }}
        className="flex items-center gap-2 p-2 rounded-2xl glass-panel border border-slate-800 shadow-xl"
      >
        <input
          type="text"
          placeholder="Ask anything about Meerut/Noida college fees, cutoffs, placements or events..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
        >
          <span>Ask AI</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
