"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuctionSocket } from "@/lib/use-auction-socket";
import { useAuctionHistory } from "@/lib/use-auction-history";
import { Player } from "@/types";
import PlayerSpotlight from "@/components/live/PlayerSpotlight";
import BidButton from "@/components/live/BidButton";
import TeamPurseGrid from "@/components/live/TeamPurseGrid";
import ActivityFeed from "@/components/live/ActivityFeed";
import PlayerRails from "@/components/live/PlayerRails";
import HostPanel from "@/components/live/HostPanel";

export default function LivePage({ params }: { params: { roomCode: string } }) {
  const { roomCode } = params;
  const router = useRouter();

  const { updateHistory } = useAuctionHistory();

  const {
    roomState,
    isConnected,
    sessionId,
    isHost,
    myTeamCode,
    lastRejection,
    bid,
    claimTeam,
    hostAction,
    extendTimer,
    setTimerDuration,
    kickUser,
    reassignTeam,
    editPurse,
    clearRejection,
    sendChat,
    submitPlayingXII,
    unlockPlayingXII,
  } = useAuctionSocket(roomCode);

  const [activeTab, setActiveTab] = useState<"activity" | "players" | "teams" | "controls">("activity");
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isAnalyticsRunning, setIsAnalyticsRunning] = useState(false);

  useEffect(() => {
    if (roomState?.status === "ended") {
      router.push(`/room/${roomCode}/summary`);
    }
  }, [roomState?.status, roomCode, router]);

  const handleRunAnalytics = async () => {
    setIsAnalyticsRunning(true);
    try {
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
      const res = await fetch(`${apiUrl}/api/analysis/${roomCode}/start`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to start analysis");
      }
      router.push(`/results/${roomCode}`);
    } catch (err: any) {
      alert(err.message);
      setIsAnalyticsRunning(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("ipl_sound_enabled");
    if (saved !== null) setIsSoundEnabled(saved === "true");
  }, []);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("ipl_sound_enabled", String(next));
      return next;
    });
  };

  // Track previous player for SOLD animation
  const [soldAnimation, setSoldAnimation] = useState(false);
  const [lastSoldPlayer, setLastSoldPlayer] = useState<Player | null>(null);
  const prevSoldCountRef = useRef(0);

  // Detect when a player gets sold (soldPlayers count increases)
  useEffect(() => {
    if (!roomState) return;
    const newSoldCount = roomState.soldPlayers.length;
    if (newSoldCount > prevSoldCountRef.current) {
      const justSold = roomState.soldPlayers[newSoldCount - 1];
      setLastSoldPlayer(justSold);
      setSoldAnimation(true);
      const t = setTimeout(() => setSoldAnimation(false), 2500);
      prevSoldCountRef.current = newSoldCount;
      return () => clearTimeout(t);
    }
    prevSoldCountRef.current = newSoldCount;
  }, [roomState?.soldPlayers.length]);

  // Update local history
  useEffect(() => {
    if (roomState?.status && roomCode) {
      updateHistory({
        roomCode,
        teamCode: myTeamCode,
        status: roomState.status,
      });
    }
  }, [roomState?.status, roomCode, myTeamCode, updateHistory]);

  // Redirect to lobby if in lobby state, summary if ended
  useEffect(() => {
    if (roomState?.status === "lobby") {
      router.push(`/room/${roomCode}/lobby`);
    }
    if (roomState?.status === "ended") {
      router.push(`/room/${roomCode}/summary`);
    }
  }, [roomState?.status, roomCode, router]);

  // If host tab is selected but user is no longer host, revert to activity
  useEffect(() => {
    if (activeTab === "controls" && !isHost) {
      setActiveTab("activity");
    }
  }, [isHost, activeTab]);

  if (!roomState) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-subtle">Connecting to premium auction engine...</p>
          {!isConnected && <p className="text-[#EF4444] text-sm mt-2 font-bold">Reconnecting...</p>}
        </div>
      </main>
    );
  }

  const isPaused = roomState.status === "paused";
  const isLive = roomState.status === "live";

  return (
    <main className="min-h-screen flex flex-col bg-[#000000] overflow-x-hidden">
      {/* ── Top status bar ── */}
      <div className="shrink-0 px-4 py-2 flex items-center justify-between sticky top-0 z-[100]"
        style={{ background: "#000000", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}>
        
        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={() => window.location.href = "/"} className="text-white hover:text-accent-blue transition-colors p-1" title="Home">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </button>
          <button onClick={() => {
            const url = `${window.location.origin}/join?code=${roomCode}`;
            navigator.clipboard.writeText(url);
            alert("Invite link copied!");
          }} className="text-white hover:text-accent-blue transition-colors p-1" title="Invite">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </button>
          
          <button onClick={() => {
            if (!myTeamCode) {
              alert("You must claim a team before building your squad.");
              return;
            }
            router.push(`/room/${roomCode}/team-builder`);
          }} className="flex items-center gap-1 px-2 py-1 ml-1 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors bg-[#0066FF] text-white hover:bg-[#0052CC] border border-transparent" title="Build Team">
            <span className="hidden sm:inline">BUILD TEAM</span>
            <span className="sm:hidden">TEAM</span>
          </button>

          {isHost && (
            <div className="flex items-center gap-1">
              <button 
                onClick={() => hostAction(isPaused ? "resume_auction" : "pause_auction")}
                className={`flex items-center gap-1 px-2 py-1 ml-1 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors ${isPaused ? 'bg-[rgba(34,197,94,0.15)] text-[#22C55E] hover:bg-[rgba(34,197,94,0.25)] border border-[#22C55E]' : 'bg-[rgba(245,158,11,0.15)] text-[#F59E0B] hover:bg-[rgba(245,158,11,0.25)] border border-[#F59E0B]'}`}
                title={isPaused ? "Resume Auction" : "Pause Auction"}
              >
                {isPaused ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="hidden sm:inline">Resume</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="hidden sm:inline">Pause</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={() => {
                  if (confirm("Are you sure you want to end the auction prematurely? This cannot be undone.")) {
                    hostAction("end_auction");
                  }
                }}
                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors bg-[rgba(239,68,68,0.15)] text-[#EF4444] hover:bg-[rgba(239,68,68,0.25)] border border-[#EF4444]"
                title="End Auction"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
                <span className="hidden sm:inline">End</span>
              </button>
            </div>
          )}
          
          <div className="h-4 w-[1px] bg-[rgba(255,255,255,0.1)] mx-1" />

          <div className={`status-dot ${isPaused ? "status-paused" : "status-live"}`} />
          <span className="font-display text-sm md:text-base font-bold tracking-widest uppercase text-white leading-none">
            {isPaused ? "PAUSED" : "LIVE"}
          </span>
          <span className="text-muted text-xs hidden md:block border-l border-[rgba(255,255,255,0.1)] pl-3 ml-1">Room <span className="font-mono text-accent-blue font-bold">{roomCode}</span></span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Progress */}
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-[#0A0A0A] px-2 md:px-3 py-1.5 rounded-md">
            <span className="text-status-success">{roomState.soldPlayersCount}</span>
            <span className="text-muted">/</span>
            <span className="text-white">{roomState.totalPlayersCount}</span>
            <span className="text-muted ml-0.5 hidden sm:inline">Sold</span>
          </div>
          {/* Set indicator */}
          <div className="text-[10px] text-muted hidden lg:flex items-center gap-2 font-bold uppercase tracking-widest bg-[#0A0A0A] px-3 py-1.5 rounded-md">
            Set {roomState.currentSetIndex + 1}/{roomState.sets.length}:
            <span className="text-accent-blue max-w-[120px] truncate">{roomState.sets[roomState.currentSetIndex]}</span>
          </div>
          {/* Connection indicator */}
          <div className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${isConnected ? "text-status-success" : "text-status-danger"}`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-status-success" : "bg-status-danger animate-pulse"}`} />
            <span className="hidden sm:inline">{isConnected ? "Live" : "Reconnecting"}</span>
          </div>
          <button onClick={toggleSound} className="text-base md:text-xl ml-1 md:ml-2 hover:scale-110 transition-transform" title={isSoundEnabled ? "Mute Timer" : "Unmute Timer"}>
             {isSoundEnabled ? "🔊" : "🔇"}
          </button>
        </div>
      </div>

      {/* ── Main layout (Single Column Mobile-First) ── */}
      <div className="flex-1 flex flex-col w-full max-w-lg mx-auto pb-4 relative z-10 pt-4">
        


        {/* ── CENTER STAGE (Bid Process) ── */}
        <div className="w-full flex flex-col items-center justify-start px-4 mb-2">
          
          <div className="w-full relative">
            <PlayerSpotlight
              player={roomState.currentPlayer}
              currentBid={roomState.currentBid}
              currentBidderTeam={roomState.currentBidderTeam}
              teams={roomState.teams}
              soldAnimation={soldAnimation}
              lastSoldPlayer={lastSoldPlayer}
              timerEndsAt={roomState.timerEndsAt}
              timerDurationSeconds={roomState.timerDurationSeconds}
              isPaused={isPaused}
              isSoundEnabled={isSoundEnabled}
            />
          </div>

          <div className="w-full">
            <BidButton
              myTeamCode={myTeamCode}
              teams={roomState.teams}
              currentBid={roomState.currentBid}
              nextBidAmount={roomState.nextBidAmount}
              currentBidderTeam={roomState.currentBidderTeam}
              currentPlayer={roomState.currentPlayer}
              roomStatus={roomState.status}
              onBid={bid}
              lastRejection={lastRejection}
              onClearRejection={clearRejection}
              onClaimTeam={claimTeam}
            />
          </div>

          {/* Paused overlay notice */}
          <AnimatePresence>
            {isPaused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 text-center py-3 px-6 rounded-xl w-full"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}
              >
                <span className="text-status-warning font-bold text-sm uppercase tracking-widest">⏸ Auction Paused by Host</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── TABS NAVIGATION (Premium Pills) ── */}
        <div className="flex items-center justify-center gap-1 mx-4 mt-6 mb-4 z-[90]">
          <div className="bg-[#0A0A0A] p-1 rounded-full flex gap-1 w-full max-w-[500px]">
            {[
              { id: "activity", label: "Activity" },
              { id: "teams", label: "Teams" },
              { id: "players", label: "Players" },
              ...(isHost ? [{ id: "controls", label: "Controls" }] : []),
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-full ${activeTab === tab.id ? "bg-[#1A1A1A] text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]" : "text-muted hover:text-white"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="flex-1 w-full px-4 pb-6 relative z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {activeTab === "activity" && (
                <div className="rounded-xl overflow-hidden h-[450px] flex flex-col bg-[#0A0A0A] relative">
                   <ActivityFeed entries={roomState.activityLog} onSendChat={sendChat} />
                </div>
              )}
              
              {activeTab === "teams" && (
                <div className="rounded-xl overflow-hidden flex flex-col">
                  <TeamPurseGrid
                    teams={roomState.teams}
                    currentBidderTeam={roomState.currentBidderTeam}
                    myTeamCode={myTeamCode}
                    isHost={isHost}
                    onKickUser={kickUser}
                  />
                </div>
              )}
              
              {activeTab === "players" && (
                <div className="p-4 rounded-xl bg-[#0A0A0A] relative">
                  <PlayerRails state={roomState} />
                </div>
              )}

            {activeTab === "controls" && isHost && (
                <div className="w-full bg-[#0A0A0A] rounded-xl overflow-hidden">
                  <HostPanel
                    state={roomState}
                    onHostAction={hostAction}
                    onExtendTimer={extendTimer}
                    onSetTimerDuration={setTimerDuration}
                    onKickUser={kickUser}
                    onReassignTeam={reassignTeam}
                    onEditPurse={editPurse}
                    onRunAnalytics={handleRunAnalytics}
                    isAnalyticsRunning={isAnalyticsRunning}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </main>
  );
}
