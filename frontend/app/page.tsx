"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useAnimation, useIsPresent } from "framer-motion";
import { useAuctionHistory } from "@/lib/use-auction-history";
import SEO from "@/components/SEO";

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

function CountUp({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[rgba(0,102,255,0.3)]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
      >
        <h3 className="font-bold text-white text-lg">{question}</h3>
        <span className={`text-[#0066FF] text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>↓</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-[#B8C0D4] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  const [activeView, setActiveView] = useState<"actions" | "history" | "public">("actions");
  const { history } = useAuctionHistory();
  const [publicRooms, setPublicRooms] = useState<any[]>([]);
  const [loadingPublic, setLoadingPublic] = useState(false);

  useEffect(() => {
    if (activeView === "public") {
      setLoadingPublic(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const apiUrl = API_URL.replace(/\/$/, "");
      fetch(`${apiUrl}/api/public-rooms`)
        .then((res) => res.json())
        .then((data) => {
          setPublicRooms(data.rooms || []);
          setLoadingPublic(false);
        })
        .catch(() => setLoadingPublic(false));
    }
  }, [activeView]);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#000000]">
      {/* Premium Sports Tech Background Grid & Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", 
            backgroundSize: "40px 40px" 
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#0066FF] opacity-[0.03] blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#0066FF] opacity-[0.05] blur-[120px]" />
        
        {/* Minimal diagonal slashes for tech feel */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
           <line x1="10%" y1="-10%" x2="40%" y2="110%" stroke="#0066FF" strokeWidth="2" />
           <line x1="70%" y1="-10%" x2="100%" y2="110%" stroke="#0066FF" strokeWidth="1" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center"
      >
        {/* Hero Section */}
        <div className="text-center mb-16 w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full mb-10 text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(0,102,255,0.08)", border: "1px solid rgba(0,102,255,0.2)", color: "#0066FF" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
            Next-Gen Sports Engine
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-[100px] font-black mb-6 leading-[0.9] tracking-tight uppercase sr-only">
            India's Best IPL Mock Auction Platform
          </h1>
          <div className="font-display text-6xl md:text-8xl lg:text-[100px] font-black mb-6 leading-[0.9] tracking-tight uppercase" aria-hidden="true">
            <span className="text-[#0066FF] block mb-2" style={{ textShadow: "0 0 40px rgba(0,102,255,0.3)" }}>IPL Mock</span>
            <span className="text-white">Auction</span>
          </div>

          <p className="text-[#B8C0D4] text-lg md:text-2xl font-medium tracking-wide">
            Build Your Squad. <span className="text-white">Outbid Your Rivals.</span> Dominate The Auction.
          </p>
        </div>

        {/* View Toggles */}
        <div className="flex justify-center gap-3 mb-6 w-full flex-wrap">
          <button 
            onClick={() => setActiveView("actions")}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeView === "actions" ? "bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]" : "bg-[#050505] border border-[rgba(255,255,255,0.1)] text-[#6B7280] hover:text-white"}`}
          >
            Enter Arena
          </button>
          <button 
            onClick={() => setActiveView("public")}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeView === "public" ? "bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]" : "bg-[#050505] border border-[rgba(255,255,255,0.1)] text-[#6B7280] hover:text-white"}`}
          >
            🌐 Public Rooms
          </button>
          <button 
            onClick={() => setActiveView("history")}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeView === "history" ? "bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]" : "bg-[#050505] border border-[rgba(255,255,255,0.1)] text-[#6B7280] hover:text-white"}`}
          >
            Auction History
            {history.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeView === "history" ? "bg-white text-[#0066FF]" : "bg-[rgba(255,255,255,0.1)] text-[#FFFFFF]"}`}>
                {history.length}
              </span>
            )}
          </button>
        </div>

        {/* Actions / History Container */}
        <div className="w-full min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeView === "actions" ? (
              <motion.div
                key="actions"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center w-full"
              >
                <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-2xl mb-2 md:mb-4">
                  <Link href="/create" className="w-full sm:w-1/2 group">
                    <div className="w-full bg-[#0066FF] border border-[#0066FF] hover:bg-[#3B82F6] rounded-2xl p-4 md:p-5 text-center transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] group-hover:-translate-y-1">
                      <div className="text-white font-black text-lg md:text-xl tracking-widest uppercase mb-1">Create Auction</div>
                      <div className="text-blue-100 text-[10px] md:text-xs font-bold uppercase tracking-widest">Host a new room</div>
                    </div>
                  </Link>
                  <Link href="/join" className="w-full sm:w-1/2 group">
                    <div className="w-full bg-[#050505] border border-[rgba(0,102,255,0.5)] hover:border-[#0066FF] rounded-2xl p-4 md:p-5 text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] group-hover:-translate-y-1">
                      <div className="text-white font-black text-lg md:text-xl tracking-widest uppercase mb-1">Join Auction</div>
                      <div className="text-[#6B7280] group-hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors">Enter invite code</div>
                    </div>
                  </Link>
                </div>

                {/* TROPHY CENTERPIECE */}
                <div className="relative w-full flex justify-center z-10 pointer-events-none mt-8 md:mt-12">
                  {/* Soft Neon Blue Glow & Floor Reflection */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[450px] h-[280px] md:h-[450px] bg-[#0066FF] opacity-[0.2] blur-[100px] rounded-full"></div>
                  <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[200px] md:w-[350px] h-[20px] md:h-[30px] bg-[#0066FF] opacity-[0.35] blur-[30px] rounded-[100%]"></div>
                  
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="relative w-[200px] sm:w-[250px] md:w-[400px] aspect-[3/4]"
                  >
                    <Image 
                      src="/trophy.png" 
                      alt="Championship Trophy" 
                      fill 
                      priority
                      className="object-contain drop-shadow-[0_0_40px_rgba(0,102,255,0.4)]" 
                    />
                  </motion.div>
                </div>
              </motion.div>
            ) : activeView === "public" ? (
              <motion.div 
                key="public"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl text-left bg-[#080808] border border-[rgba(255,255,255,0.08)] p-2 rounded-2xl shadow-2xl"
              >
                {loadingPublic ? (
                  <div className="p-12 text-center">
                    <div className="w-8 h-8 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">Finding Games...</h3>
                  </div>
                ) : publicRooms.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-4xl mb-4 opacity-50">🌐</div>
                    <h3 className="text-white font-bold text-xl mb-2">No Public Rooms</h3>
                    <p className="text-[#6B7280]">There are no public auctions running right now.</p>
                  </div>
                ) : (
                  <div className="max-h-[350px] overflow-y-auto custom-scroll p-2 space-y-3">
                    {publicRooms.map(room => (
                      <div key={room.roomCode} className="p-4 rounded-xl bg-[#050505] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,102,255,0.3)] transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-xl font-bold text-white tracking-widest">{room.roomCode}</span>
                            <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${room.status === 'live' ? 'bg-[rgba(239,68,68,0.1)] text-[#EF4444]' : 'bg-[rgba(0,102,255,0.1)] text-[#0066FF]'}`}>
                              {room.status}
                            </div>
                          </div>
                          <div className="text-xs text-[#B8C0D4] flex items-center gap-3 font-medium">
                            <span className="opacity-60">Host: {room.hostName}</span>
                            <span className="opacity-40">•</span>
                            <span className="opacity-60">{room.playersJoined}/10 Teams Joined</span>
                          </div>
                        </div>
                        <Link href={`/join?code=${room.roomCode}`} className="w-full sm:w-auto">
                          <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-bold transition-all bg-[rgba(0,102,255,0.1)] text-[#0066FF] hover:bg-[#0066FF] hover:text-white">
                            Join Game
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="history"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl text-left bg-[#080808] border border-[rgba(255,255,255,0.08)] p-2 rounded-2xl shadow-2xl"
              >
                {history.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-4xl mb-4 opacity-50">🏟️</div>
                    <h3 className="text-white font-bold text-xl mb-2">No History</h3>
                    <p className="text-[#6B7280]">You haven't participated in any auctions yet.</p>
                  </div>
                ) : (
                  <div className="max-h-[350px] overflow-y-auto custom-scroll p-2 space-y-3">
                    {history.sort((a, b) => b.lastVisited - a.lastVisited).map(item => {
                      const isCompleted = item.status === "ended" || item.status === "completed";
                      return (
                        <div key={item.roomCode} className="p-4 rounded-xl bg-[#050505] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,102,255,0.3)] transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-mono text-xl font-bold text-white tracking-widest">{item.roomCode}</span>
                              <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${isCompleted ? 'bg-[rgba(34,197,94,0.1)] text-[#22C55E]' : 'bg-[rgba(0,102,255,0.1)] text-[#0066FF]'}`}>
                                {isCompleted ? 'COMPLETED' : item.status}
                              </div>
                            </div>
                            <div className="text-xs text-[#B8C0D4] flex items-center gap-3 font-medium">
                              {item.teamCode ? (
                                <span className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span>
                                  Team: {item.teamCode}
                                </span>
                              ) : (
                                <span className="opacity-60">Spectator</span>
                              )}
                              <span className="opacity-40">•</span>
                              <span className="opacity-60">{formatTimeAgo(item.lastVisited)}</span>
                            </div>
                          </div>
                          
                          <Link href={isCompleted ? `/room/${item.roomCode}/summary` : `/room/${item.roomCode}/live`} className="w-full sm:w-auto">
                            <button className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                              isCompleted 
                                ? "bg-[rgba(34,197,94,0.1)] text-[#22C55E] hover:bg-[#22C55E] hover:text-white" 
                                : "bg-[rgba(0,102,255,0.1)] text-[#0066FF] hover:bg-[#0066FF] hover:text-white"
                            }`}>
                              {isCompleted ? 'Summary' : 'Rejoin'}
                            </button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-[rgba(255,255,255,0.05)] pt-12"
        >
          {[
            { label: "Auction Players", value: 524, suffix: "+" },
            { label: "Auction Sets", value: 38 },
            { label: "IPL Teams", value: 10 },
            { label: "Socket Engine", value: "Real-Time", isText: true },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-4xl font-black text-[#FFFFFF] mb-1 tracking-tight">
                {stat.isText ? stat.value : <CountUp end={stat.value as number} suffix={stat.suffix} />}
              </div>
              <div className="text-[#0066FF] text-[10px] md:text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Informational SEO Sections */}
      <div className="w-full max-w-5xl mx-auto px-6 mt-32 space-y-32 pb-32">

        {/* AI Auction Analytics */}
        <section id="ai-analytics" className="text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 shadow-2xl relative">
             <div className="absolute inset-0 bg-[#F59E0B] opacity-[0.05] blur-[40px] rounded-full"></div>
             <div className="relative">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-white font-bold tracking-widest">TEAM ANALYSIS</div>
                  <div className="text-2xl font-black text-[#F59E0B]">88<span className="text-sm text-[#B8C0D4] font-medium">/100</span></div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#B8C0D4]">Batting Strength</span>
                      <span className="text-white font-bold">92</span>
                    </div>
                    <div className="h-2 bg-[#222] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "92%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-[#0066FF]"></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#B8C0D4]">Bowling Strength</span>
                      <span className="text-white font-bold">85</span>
                    </div>
                    <div className="h-2 bg-[#222] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-[#10B981]"></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#B8C0D4]">All-Rounders</span>
                      <span className="text-white font-bold">80</span>
                    </div>
                    <div className="h-2 bg-[#222] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "80%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-[#F59E0B]"></motion.div>
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.05)] grid grid-cols-2 gap-4">
                    <div className="bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded p-3">
                      <div className="text-[10px] text-[#10B981] font-bold uppercase mb-1">Strength</div>
                      <div className="text-white text-xs">Death Bowling</div>
                    </div>
                    <div className="bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded p-3">
                      <div className="text-[10px] text-[#EF4444] font-bold uppercase mb-1">Weakness</div>
                      <div className="text-white text-xs">Top Order Spin</div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">AI Auction <span className="text-[#F59E0B]">Analytics</span></h2>
            <p className="text-[#B8C0D4] text-lg mb-6 leading-relaxed">
              Wondering who built the best team? Our proprietary AI Analytics engine crunches career stats, recent form, and team balance to objectively rank every drafted squad.
            </p>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-3"><span className="text-[#F59E0B]">✓</span> Overall Team Ratings</li>
              <li className="flex items-center gap-3"><span className="text-[#F59E0B]">✓</span> Batting & Bowling Analysis</li>
              <li className="flex items-center gap-3"><span className="text-[#F59E0B]">✓</span> Automatically highlights Strengths & Weaknesses</li>
            </ul>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-12 tracking-tight uppercase">Platform <span className="text-[#0066FF]">Features</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-[#050505] border border-[rgba(255,255,255,0.05)] p-8 rounded-2xl hover:border-[rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] transition-all">
              <div className="mb-4 text-[#0066FF] flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Real-Time Sockets</h3>
              <p className="text-[#B8C0D4] text-sm">Ultra-low latency bidding wars using advanced Socket.IO technology.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-[#050505] border border-[rgba(255,255,255,0.05)] p-8 rounded-2xl hover:border-[rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] transition-all">
              <div className="mb-4 text-[#0066FF] flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">State Persistence</h3>
              <p className="text-[#B8C0D4] text-sm">Accidentally closed your tab? Seamlessly rejoin active rooms.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-[#050505] border border-[rgba(255,255,255,0.05)] p-8 rounded-2xl hover:border-[rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] transition-all">
              <div className="mb-4 text-[#0066FF] flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Massive Database</h3>
              <p className="text-[#B8C0D4] text-sm">Access hundreds of real-world players mapped with accurate IPL roles.</p>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-12 tracking-tight uppercase">How It <span className="text-[#0066FF]">Works</span></h2>
          <div className="space-y-8 text-left">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-[#0066FF] flex items-center justify-center font-bold text-xl shrink-0 shadow-[0_0_15px_rgba(0,102,255,0.5)]">1</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Create or Join a Room</h3>
                <p className="text-[#B8C0D4]">Generate a unique invite code and share it with up to 9 friends. Configure your purse size and bidding timers.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-[#0066FF] flex items-center justify-center font-bold text-xl shrink-0 shadow-[0_0_15px_rgba(0,102,255,0.5)]">2</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Bid on Players</h3>
                <p className="text-[#B8C0D4]">Players are presented in sets (Marquee, Batsmen, Bowlers). Engage in rapid-fire bidding to secure your targets.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-[#0066FF] flex items-center justify-center font-bold text-xl shrink-0 shadow-[0_0_15px_rgba(0,102,255,0.5)]">3</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Evaluate & Win</h3>
                <p className="text-[#B8C0D4]">Lock in your Playing XI and let the AI Analytics evaluate your team's overall score. Highest score wins.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-black mb-12 tracking-tight uppercase text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem question="What is IPL Mock Auction?" answer="Crexio's IPL Mock Auction is a premium multiplayer platform where you and your friends can simulate the real IPL mega auction. You get a budget, bid on real players, and try to build the best squad possible." />
            <FAQItem question="How many friends can join?" answer="Currently, each room supports up to 10 teams (including the host). You can share your unique room code for friends to join as franchise owners." />
            <FAQItem question="Is it free?" answer="Yes! Creating rooms, hosting auctions, and joining as a player on Crexio is completely free." />
            <FAQItem question="How are analytics calculated?" answer="Our AI engine calculates team ratings using a weighted algorithm. It considers a player's career statistics, recent form, specific T20 roles (e.g. death bowler, opening batsman), and overall team balance." />
            <FAQItem question="Can I rejoin after refresh?" answer="Absolutely. If you accidentally close your tab or lose connection, just revisit the room link or enter the code. The system remembers your session and you'll join right back into the action." />
            <FAQItem question="How many players exist?" answer="Our database includes hundreds of active and domestic players, updated with their latest base prices and roles, closely mirroring the real IPL auction pool." />
            <FAQItem question="Does it work on mobile?" answer="Yes, the entire platform is fully responsive and optimized for mobile devices, so you can bid on the go." />
            <FAQItem question="How is the winner decided?" answer="Once the auction concludes, every team must finalize their Playing XI and Impact Players. The AI evaluates each completed squad, and the team with the highest overall rating is crowned the champion." />
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-20 bg-[#0066FF] rounded-3xl relative overflow-hidden px-6 shadow-[0_0_50px_rgba(0,102,255,0.2)]">
          <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase relative z-10 text-white max-w-2xl mx-auto">
            Ready to Build the Ultimate IPL Squad?
          </h2>
          <p className="text-blue-100 text-lg mb-10 relative z-10 max-w-2xl mx-auto leading-relaxed">
            Create your auction room, invite your friends, build your dream squad, and let Crexio AI crown the ultimate champion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link href="/create" className="inline-block px-10 py-4 bg-white text-[#0066FF] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-2xl">
              Start Your Auction
            </Link>
            <Link href="/join" className="inline-block px-10 py-4 bg-[#0047B3] text-white border border-[#005CE6] font-black uppercase tracking-widest rounded-xl hover:bg-[#005CE6] transition-colors shadow-xl">
              Explore Public Rooms
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[rgba(255,255,255,0.05)] bg-[#050505] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-black text-white mb-4 text-xl tracking-widest uppercase">CREXIO</h3>
            <p className="text-[#B8C0D4] leading-relaxed">The premier mock auction platform for cricket enthusiasts. Build, bid, and dominate.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 tracking-widest uppercase text-xs">Product</h3>
            <ul className="space-y-4 text-[#B8C0D4]">
              <li><Link href="/ipl-mock-auction" className="hover:text-[#0066FF] transition-colors">IPL Mock Auction</Link></li>
              <li><Link href="/cricket-mock-auction" className="hover:text-[#0066FF] transition-colors">Cricket Mock Auction</Link></li>
              <li><Link href="/auction-analytics" className="hover:text-[#0066FF] transition-colors">Auction Analytics</Link></li>
              <li><Link href="/#features" className="hover:text-[#0066FF] transition-colors">Features</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 tracking-widest uppercase text-xs">Resources</h3>
            <ul className="space-y-4 text-[#B8C0D4]">
              <li><Link href="/#how-it-works" className="hover:text-[#0066FF] transition-colors">How It Works</Link></li>
              <li><Link href="/#faq" className="hover:text-[#0066FF] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[#0066FF] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 tracking-widest uppercase text-xs">Legal</h3>
            <ul className="space-y-4 text-[#B8C0D4]">
              <li><Link href="/privacy" className="hover:text-[#0066FF] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#0066FF] transition-colors">Terms of Service</Link></li>
              <li className="flex gap-4 pt-2">
                <a href="#" className="hover:text-[#0066FF] transition-colors">GitHub</a>
                <a href="#" className="hover:text-[#0066FF] transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-[rgba(255,255,255,0.05)] text-center text-[#B8C0D4] text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Crexio. All rights reserved.</p>
          <p className="opacity-50">Not affiliated with the BCCI or IPL.</p>
        </div>
      </footer>

      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Crexio",
        "url": "https://crexio.app",
        "description": "India's Best IPL Mock Auction Platform",
        "publisher": {
          "@type": "Organization",
          "name": "Crexio",
          "logo": {
            "@type": "ImageObject",
            "url": "https://crexio.app/favicon.ico"
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://crexio.app/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }} />
      <SEO schema={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Crexio IPL Mock Auction Simulator",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }} />
    </main>
  );
}
