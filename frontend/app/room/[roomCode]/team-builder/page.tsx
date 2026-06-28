"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuctionSocket } from "@/lib/use-auction-socket";
import { Player } from "@/types";

export default function TeamBuilderPage({ params }: { params: { roomCode: string } }) {
  const { roomCode } = params;
  const router = useRouter();
  
  const {
    roomState,
    myTeamCode,
    isHost,
    submitPlayingXII,
    unlockPlayingXII,
  } = useAuctionSocket(roomCode);

  const [selectedTeamCode, setSelectedTeamCode] = useState<string | null>(null);
  const activeTeamCode = selectedTeamCode || myTeamCode;

  const [playingXIPlayerIds, setPlayingXIPlayerIds] = useState<string[]>([]);
  const [impactPlayerId, setImpactPlayerId] = useState<string | null>(null);
  const [captainId, setCaptainId] = useState<string | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<string | null>(null);
  const [wkId, setWicketkeeperId] = useState<string | null>(null);

  const [hasInitialized, setHasInitialized] = useState(false);

  const team = activeTeamCode && roomState ? roomState.teams[activeTeamCode] : null;
  const squad = team?.squad || [];
  const isTeamLocked = activeTeamCode && roomState ? roomState.lockedTeams?.includes(activeTeamCode) : false;

  // Initialize from saved playing XII
  useEffect(() => {
    if (!hasInitialized && activeTeamCode && roomState?.playingXIIs?.[activeTeamCode] && squad.length > 0) {
      const savedSelection = roomState.playingXIIs[activeTeamCode] as any;
      if (savedSelection && savedSelection.playingXI) {
        const pXI = savedSelection.playingXI.map((s: any) => s.playerId);
        setPlayingXIPlayerIds(pXI);
        setImpactPlayerId(savedSelection.impactPlayerId || null);
        
        const c = savedSelection.playingXI.find((s: any) => s.captain)?.playerId;
        const vc = savedSelection.playingXI.find((s: any) => s.viceCaptain)?.playerId;
        const wk = savedSelection.playingXI.find((s: any) => s.wicketkeeper)?.playerId || 
                   (savedSelection.impactPlayerId && savedSelection.impactPlayerId === wkId ? savedSelection.impactPlayerId : null);
                   
        if (c) setCaptainId(c);
        if (vc) setViceCaptainId(vc);
        if (wk) setWicketkeeperId(wk);

        setHasInitialized(true);
      }
    }
  }, [roomState?.playingXIIs, activeTeamCode, squad, hasInitialized]);

  if (!roomState) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="w-12 h-12 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const handlePlayingXIToggle = (playerId: string) => {
    if (isTeamLocked) return;
    const isXI = playingXIPlayerIds.includes(playerId);
    
    if (isXI) {
      // Remove from Playing XI
      setPlayingXIPlayerIds(prev => prev.filter(id => id !== playerId));
      if (captainId === playerId) setCaptainId(null);
      if (viceCaptainId === playerId) setViceCaptainId(null);
      if (wkId === playerId) setWicketkeeperId(null);
    } else {
      // Add to Playing XI
      if (playingXIPlayerIds.length < 11) {
        setPlayingXIPlayerIds(prev => [...prev, playerId]);
        // If they were impact, remove them from impact
        if (impactPlayerId === playerId) {
          setImpactPlayerId(null);
        }
      }
    }
  };

  const handleImpactToggle = (playerId: string) => {
    if (isTeamLocked) return;
    const isImpact = impactPlayerId === playerId;
    
    if (isImpact) {
      // Remove Impact
      setImpactPlayerId(null);
      if (wkId === playerId) setWicketkeeperId(null);
    } else {
      // Assign Impact (automatically replaces any existing Impact)
      setImpactPlayerId(playerId);
      // If they were in Playing XI, remove them from Playing XI
      if (playingXIPlayerIds.includes(playerId)) {
        setPlayingXIPlayerIds(prev => prev.filter(id => id !== playerId));
        if (captainId === playerId) setCaptainId(null);
        if (viceCaptainId === playerId) setViceCaptainId(null);
      }
    }
  };

  const handleRoleToggle = (playerId: string, role: "C" | "VC" | "WK") => {
    if (isTeamLocked) return;
    if (role === "C") setCaptainId(prev => prev === playerId ? null : playerId);
    if (role === "VC") setViceCaptainId(prev => prev === playerId ? null : playerId);
    if (role === "WK") setWicketkeeperId(prev => prev === playerId ? null : playerId);
  };

  const isSquadValid = 
    playingXIPlayerIds.length === 11 && 
    impactPlayerId !== null && 
    captainId !== null && 
    viceCaptainId !== null && 
    wkId !== null;

  const handleLockSquad = () => {
    if (!isSquadValid) return;

    const payload = {
      playingXI: playingXIPlayerIds.map((id, index) => ({
        playerId: id,
        battingOrder: index + 1,
        captain: captainId === id,
        viceCaptain: viceCaptainId === id,
        wicketkeeper: wkId === id
      })),
      impactPlayerId: impactPlayerId
    };

    submitPlayingXII(payload, activeTeamCode!);
    alert("Team Saved & Locked!");
    if (roomState?.status === "ended") {
      router.push(`/room/${roomCode}/summary`);
    } else {
      router.push(`/room/${roomCode}/live`);
    }
  };

  const handleUnlockSquad = () => {
    unlockPlayingXII();
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.05)]">
          <button 
            onClick={() => {
              if (roomState?.status === "ended") {
                router.push(`/room/${roomCode}/summary`);
              } else {
                router.push(`/room/${roomCode}/live`);
              }
            }}
            className="flex items-center gap-2 text-muted hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="font-bold tracking-widest uppercase text-sm">
              {roomState?.status === "ended" ? "Back To Summary" : "Back To Auction"}
            </span>
          </button>
          <h1 className="font-display font-black text-xl tracking-widest uppercase">Team Builder</h1>
        </div>

        {!activeTeamCode ? (
          <div className="text-center p-12 bg-[#0A0A0A] rounded-xl border border-[rgba(255,255,255,0.05)]">
            <h2 className="text-xl font-bold mb-2">Select a Team</h2>
            <p className="text-muted mb-6">Choose a team below to build their playing XI.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {Object.values(roomState.teams).map(t => (
                <button
                  key={t.code}
                  onClick={() => setSelectedTeamCode(t.code)}
                  className="px-6 py-3 rounded-lg border hover:opacity-80 font-bold transition-opacity"
                  style={{ borderColor: t.colorHex, color: t.colorHex, backgroundColor: `${t.colorHex}15` }}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Player Cards (Col 1-8) */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              
              {isHost && (
                <div className="bg-[#0A0A0A] rounded-xl border border-[rgba(255,255,255,0.05)] p-4 flex items-center gap-4">
                  <label className="text-[10px] uppercase font-bold text-muted tracking-widest whitespace-nowrap">Override Team (Host)</label>
                  <select 
                    className="flex-1 bg-[#111] border border-[rgba(255,255,255,0.1)] rounded p-2 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                    value={activeTeamCode}
                    onChange={(e) => {
                      setSelectedTeamCode(e.target.value);
                      setHasInitialized(false);
                      setPlayingXIPlayerIds([]);
                      setImpactPlayerId(null);
                      setCaptainId(null);
                      setViceCaptainId(null);
                      setWicketkeeperId(null);
                    }}
                  >
                    {Object.values(roomState.teams).map(t => (
                      <option key={t.code} value={t.code}>{t.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <h3 className="font-bold uppercase tracking-widest text-xs mb-2 text-[#0066FF]">
                {team?.name} Squad ({squad.length} Players)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {squad.map((player) => {
                  const isXI = playingXIPlayerIds.includes(player.id);
                  const isImpact = impactPlayerId === player.id;
                  const isSelected = isXI || isImpact;
                  const disableXI = !isXI && playingXIPlayerIds.length >= 11;

                  return (
                    <div 
                      key={player.id} 
                      className={`bg-[#0A0A0A] border rounded-xl p-4 flex flex-col gap-4 transition-all ${
                        isXI ? 'border-[#0066FF] bg-[rgba(0,102,255,0.05)]' : 
                        isImpact ? 'border-[#22C55E] bg-[rgba(34,197,94,0.05)]' : 
                        'border-[rgba(255,255,255,0.05)]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-lg">{player.name}</div>
                          <div className="text-xs text-muted mt-1 uppercase tracking-widest">{player.role}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePlayingXIToggle(player.id)}
                          disabled={disableXI}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                            isXI 
                              ? 'bg-[#0066FF] text-white' 
                              : 'bg-[#111111] text-muted hover:bg-[#222222] border border-[rgba(255,255,255,0.1)]'
                          } ${disableXI ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                          Playing XI
                        </button>
                        <button
                          onClick={() => handleImpactToggle(player.id)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                            isImpact 
                              ? 'bg-[#22C55E] text-black' 
                              : 'bg-[#111111] text-muted hover:bg-[#222222] border border-[rgba(255,255,255,0.1)]'
                          }`}
                        >
                          Impact
                        </button>
                      </div>

                      {isXI && (
                        <div className="flex gap-2 pt-2 border-t border-[rgba(255,255,255,0.05)] mt-1">
                          <button 
                            onClick={() => handleRoleToggle(player.id, "C")} 
                            className={`flex-1 py-1 rounded text-[10px] font-bold ${captainId === player.id ? 'bg-[#F59E0B] text-black' : 'bg-[#222] text-muted hover:bg-[#333]'}`}
                          >C</button>
                          <button 
                            onClick={() => handleRoleToggle(player.id, "VC")} 
                            className={`flex-1 py-1 rounded text-[10px] font-bold ${viceCaptainId === player.id ? 'bg-[#0066FF] text-white' : 'bg-[#222] text-muted hover:bg-[#333]'}`}
                          >VC</button>
                          <button 
                            onClick={() => handleRoleToggle(player.id, "WK")} 
                            className={`flex-1 py-1 rounded text-[10px] font-bold ${wkId === player.id ? 'bg-[#22C55E] text-black' : 'bg-[#222] text-muted hover:bg-[#333]'}`}
                          >WK</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Validation & Lock (Col 9-12) */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              
              <div className="bg-[#0A0A0A] rounded-xl border border-[rgba(255,255,255,0.05)] p-6 sticky top-8">
                <h3 className="font-bold uppercase tracking-widest text-xs mb-6">Squad Validation</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    {playingXIPlayerIds.length === 11 ? <span className="text-[#22C55E]">✔</span> : <span className="text-[#EF4444]">✖</span>}
                    <span className="font-bold text-sm">Playing XI ({playingXIPlayerIds.length}/11)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {impactPlayerId ? <span className="text-[#22C55E]">✔</span> : <span className="text-[#EF4444]">✖</span>}
                    <span className="font-bold text-sm">Impact ({impactPlayerId ? '1' : '0'}/1)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {captainId ? <span className="text-[#22C55E]">✔</span> : <span className="text-[#EF4444]">✖</span>}
                    <span className="font-bold text-sm">{captainId ? 'Captain' : 'Captain Missing'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {viceCaptainId ? <span className="text-[#22C55E]">✔</span> : <span className="text-[#EF4444]">✖</span>}
                    <span className="font-bold text-sm">{viceCaptainId ? 'Vice Captain' : 'Vice Captain Missing'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {wkId ? <span className="text-[#22C55E]">✔</span> : <span className="text-[#EF4444]">✖</span>}
                    <span className="font-bold text-sm">{wkId ? 'Wicketkeeper' : 'Wicketkeeper Missing'}</span>
                  </div>
                </div>

                {isTeamLocked ? (
                  <button 
                    onClick={handleUnlockSquad} 
                    className="w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all bg-[#F59E0B] hover:bg-[#D97706] text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  >
                    Edit Squad
                  </button>
                ) : (
                  <button 
                    onClick={handleLockSquad} 
                    disabled={!isSquadValid}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${
                      isSquadValid 
                        ? 'bg-[#0066FF] hover:bg-[#0055DD] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]' 
                        : 'bg-[#111111] text-muted cursor-not-allowed border border-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    Lock Squad
                  </button>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}
