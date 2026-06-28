"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ResultsPage() {
  const { roomId } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkStatusAndFetch = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const apiUrl = API_URL.replace(/\/$/, "");
        // First check status
        const statusRes = await fetch(`${apiUrl}/api/analysis/${roomId}/status`);
        const statusJson = await statusRes.json();

        if (statusJson.status === "running") {
          // Poll again in 1 second
          timeoutId = setTimeout(checkStatusAndFetch, 1000);
          return;
        }

        if (statusJson.status === "error") {
          throw new Error(statusJson.error || "Analysis failed");
        }

        if (statusJson.status !== "completed") {
          throw new Error("Results not available or analysis failed");
        }

        // Now fetch results
        const res = await fetch(`${apiUrl}/api/analysis/${roomId}/results`);
        if (!res.ok) {
          throw new Error("Results not available or analysis failed");
        }
        const json = await res.json();
        setData(json);
        if (json.predictions && json.predictions.length > 0) {
          setActiveTeam(json.predictions[0].teamCode);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    checkStatusAndFetch();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [roomId]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted tracking-widest font-bold uppercase text-sm">Generating Premium Analytics...</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-status-warning">
          <p className="font-bold text-xl">{error}</p>
        </div>
      </main>
    );
  }

  const activeTeamReport = activeTeam ? data.reportCards[activeTeam] : null;
  const activeTeamStrength = activeTeam ? data.teamStrengths[activeTeam] : null;

  // Podium Data
  const top3 = data.predictions.slice(0, 3);
  const winner = top3[0];
  const winnerReport = winner ? data.reportCards[winner.teamCode] : null;
  const winnerStrength = winner ? data.teamStrengths[winner.teamCode] : null;

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden pb-12 font-sans relative">
      {/* Premium Background Glow */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0066FF] rounded-full opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 pt-12 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-3 tracking-tight">
            FINAL <span className="text-[#0066FF]">STANDINGS</span>
          </h1>
          <p className="text-muted text-sm tracking-widest uppercase font-bold">
            Data-Driven Champion Prediction for Room {roomId}
          </p>
        </div>

        {/* 🏆 PREMIUM PODIUM SECTION */}
        {top3.length >= 3 && (
          <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-24 h-auto md:h-[450px]">
            {/* 2nd Place */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="w-full md:w-64 flex flex-col items-center order-2 md:order-1"
            >
              <div className="w-full bg-[#0A0A0A] border border-[rgba(255,255,255,0.05)] rounded-t-2xl p-6 text-center relative overflow-hidden">
                <div className="text-4xl mb-2">🥈</div>
                <div className="font-black text-2xl mb-1 text-white">{top3[1].teamCode}</div>
                <div className="text-white font-bold">{top3[1].titlePercent?.toFixed(1) || 0}% Title</div>
                <div className="text-muted text-xs mt-1">{top3[1].playoffPercent?.toFixed(1) || 0}% Playoff</div>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#0066FF] to-transparent mt-4 opacity-50" />
              </div>
              <div className="w-full h-24 md:h-32 bg-gradient-to-b from-[#111111] to-black border-x border-[rgba(255,255,255,0.02)]" />
            </motion.div>

            {/* 1st Place - Premium Trophy Card */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="w-full md:w-80 flex flex-col items-center order-1 md:order-2 z-10"
            >
              <div className="w-full bg-[#0A0A0A] border border-[#0066FF] rounded-t-3xl p-8 text-center shadow-[0_-10px_40px_rgba(0,102,255,0.2)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(0,102,255,0.1)_0%,transparent_100%)] pointer-events-none" />
                <div className="absolute top-4 right-4 w-12 h-12">
                  <Image src="/trophy.png" alt="Trophy" fill className="object-contain drop-shadow-[0_0_10px_rgba(242,183,5,0.6)]" />
                </div>
                <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(242,183,5,0.6)]">🏆</div>
                <div className="text-xs uppercase tracking-widest font-black text-amber-bid mb-2">Champion Prediction</div>
                <div className="font-black text-4xl mb-1 text-white">{winner.teamCode}</div>
                <div className="text-muted text-sm uppercase tracking-widest mb-4">Owner: {winnerReport?.ownerName || "Auto"}</div>
                
                <div className="bg-[#111111] rounded-xl p-4 border border-[rgba(255,255,255,0.05)]">
                  <div className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Overall Rating</div>
                  <div className="text-3xl font-black text-[#0066FF]">
                    {winnerReport?.overallRating?.toFixed(1)}<span className="text-sm text-muted">/100</span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-status-success">{winner?.titlePercent?.toFixed(1) || 0}% Title Prob</div>
                </div>
              </div>
              <div className="w-full h-16 md:h-48 bg-gradient-to-b from-[#0066FF]/20 to-black border-x border-[#0066FF]/30" />
            </motion.div>

            {/* 3rd Place */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="w-full md:w-64 flex flex-col items-center order-3"
            >
              <div className="w-full bg-[#0A0A0A] border border-[rgba(255,255,255,0.05)] rounded-t-2xl p-6 text-center relative overflow-hidden">
                <div className="text-4xl mb-2">🥉</div>
                <div className="font-black text-2xl mb-1 text-white">{top3[2].teamCode}</div>
                <div className="text-white font-bold">{top3[2].titlePercent?.toFixed(1) || 0}% Title</div>
                <div className="text-muted text-xs mt-1">{top3[2].playoffPercent?.toFixed(1) || 0}% Playoff</div>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#0066FF] to-transparent mt-4 opacity-50" />
              </div>
              <div className="w-full h-20 md:h-24 bg-gradient-to-b from-[#111111] to-black border-x border-[rgba(255,255,255,0.02)]" />
            </motion.div>
          </div>
        )}

        {/* 📊 TEAM REPORT CARDS SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl font-black mb-8 tracking-widest uppercase text-center">Squad Report Cards</h2>
          
          <div className="flex overflow-x-auto custom-scroll gap-4 pb-6 snap-x justify-start md:justify-center">
            {data.predictions.map((p: any) => (
              <button 
                key={p.teamCode}
                onClick={() => setActiveTeam(p.teamCode)}
                className={`shrink-0 snap-center px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all ${activeTeam === p.teamCode ? 'bg-[#0066FF] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]' : 'bg-[#111111] text-muted border border-[rgba(255,255,255,0.05)] hover:text-white hover:border-[#0066FF]/50'}`}
              >
                {p.teamCode}
              </button>
            ))}
          </div>

          {activeTeamReport && activeTeamStrength && (
            <motion.div 
              key={activeTeam}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0A0A0A] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 md:p-10 shadow-2xl mt-4"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                  <h2 className="text-4xl font-black tracking-tight text-white mb-2">{activeTeam}</h2>
                  <div className="text-muted text-sm font-bold uppercase tracking-widest">
                    Owner: <span className="text-white">{activeTeamReport.ownerName || "Unknown"}</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-xs uppercase tracking-widest font-black text-muted mb-1">Role Coverage Summary</div>
                  <div className="text-lg font-bold text-[#0066FF] mb-2">Data-Driven</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Metrics */}
                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-widest font-black text-muted mb-6">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Batting', val: activeTeamReport?.components?.batting, max: 20 },
                      { label: 'Bowling', val: activeTeamReport?.components?.bowling, max: 20 },
                      { label: 'All Round', val: activeTeamReport?.components?.allRound, max: 15 },
                      { label: 'Current Form', val: activeTeamReport?.components?.form, max: 15 },
                      { label: 'IPL Perf', val: activeTeamReport?.components?.ipl, max: 10 },
                      { label: 'Overall T20', val: activeTeamReport?.components?.t20, max: 10 },
                      { label: 'Captaincy', val: activeTeamReport?.components?.captaincy, max: 5 },
                      { label: 'Team Balance', val: activeTeamReport?.components?.balance, max: 5 },
                    ].map((comp: any) => (
                      <div key={comp.label} className="bg-[#111111] border border-[rgba(255,255,255,0.05)] rounded-lg p-3">
                        <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">{comp.label}</div>
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-lg font-black text-white">{comp.val !== undefined ? comp.val.toFixed(1) : "No Data"}</span>
                          <span className="text-xs text-muted font-bold">/{comp.max}</span>
                        </div>
                        <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${((comp.val || 0) / comp.max) * 100}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-[#0066FF]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)] flex justify-between items-center bg-[#111111] p-5 rounded-xl">
                    <span className="font-black text-muted uppercase tracking-widest text-xs">Overall Rating</span>
                    <span className="text-3xl font-black text-[#0066FF]">{activeTeamReport?.overallRating !== undefined ? activeTeamReport.overallRating.toFixed(1) : "No Data"}<span className="text-sm text-muted">/100</span></span>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="space-y-8">
                  <h3 className="text-xs uppercase tracking-widest font-black text-muted mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    AI Squad Analysis
                  </h3>

                  {activeTeamReport.isInvalid && activeTeamReport.errors?.length > 0 && (
                    <div className="mb-8 p-4 bg-red-950/30 border border-red-500/50 rounded-xl">
                      <h4 className="text-red-500 font-black uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Invalid Squad Composition
                      </h4>
                      <ul className="space-y-2">
                        {activeTeamReport.errors.map((err: string, i: number) => (
                          <li key={i} className="text-sm text-white/90 bg-red-500/10 border-l-2 border-red-500 pl-3 py-1 font-medium">
                            {err}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mb-8">
                    <h4 className="text-[#0066FF] font-black uppercase tracking-widest text-xs mb-3">Role Coverage</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeTeamReport?.roleCoverage ? Object.entries(activeTeamReport.roleCoverage).map(([role, count]: any) => (
                        <span key={role} className="text-xs bg-[#111111] text-white/80 border border-[rgba(255,255,255,0.1)] px-2 py-1 rounded-md">{role}: {count}</span>
                      )) : <span className="text-muted">No Data</span>}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-status-success font-black uppercase tracking-widest text-xs mb-3">Strengths</h4>
                    <ul className="space-y-3">
                      {activeTeamReport.strengths.map((s: string, i: number) => (
                        <li key={i} className="text-sm text-white/90 bg-[rgba(34,197,94,0.05)] border-l-2 border-status-success pl-3 py-1 font-medium">
                          {s}
                        </li>
                      ))}
                      {activeTeamReport.strengths.length === 0 && <li className="text-sm text-muted">No major strengths detected.</li>}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-status-warning font-black uppercase tracking-widest text-xs mb-3">Vulnerabilities</h4>
                    <ul className="space-y-3">
                      {activeTeamReport.weaknesses.map((w: string, i: number) => (
                        <li key={i} className="text-sm text-white/90 bg-[rgba(226,67,61,0.05)] border-l-2 border-status-warning pl-3 py-1 font-medium">
                          {w}
                        </li>
                      ))}
                      {activeTeamReport.weaknesses.length === 0 && <li className="text-sm text-muted">No major weaknesses detected.</li>}
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
