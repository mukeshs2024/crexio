"use client";
import { useState } from "react";
import { RoomState } from "@/types";

interface HostPanelProps {
  state: RoomState;
  onHostAction: (action: string) => void;
  onExtendTimer: (extra: number) => void;
  onSetTimerDuration: (secs: number) => void;
  onKickUser: (sessionId: string) => void;
  onReassignTeam: (teamCode: string, newSessionId: string, newOwnerName: string) => void;
  onEditPurse: (teamCode: string, newPurse: number) => void;
  onRunAnalytics?: () => void;
  isAnalyticsRunning?: boolean;
}

export default function HostPanel({
  state,
  onHostAction,
  onExtendTimer,
  onSetTimerDuration,
  onRunAnalytics,
  isAnalyticsRunning
}: HostPanelProps) {
  const [newTimerSecs, setNewTimerSecs] = useState(state.timerDurationSeconds);
  const [isOpen, setIsOpen] = useState(false);

  const lockedCount = state.lockedTeams?.length || 0;
  const anyTeamLocked = lockedCount > 0;

  return (
    <div
      className="w-full rounded-xl overflow-hidden shadow-xl"
      style={{
        background: "#0A0A0A",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Collapsible Panel header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-[#111111] transition-colors"
        style={{ borderBottom: isOpen ? "1px solid rgba(255,255,255,0.05)" : "none" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-xs tracking-widest uppercase">HOST CONTROLS</span>
          <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider"
            style={{ background: state.status === "live" ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)", color: state.status === "live" ? "#22C55E" : "#FFFFFF" }}>
            {state.status}
          </span>
        </div>
        <div className="text-muted">
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          ) : (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 space-y-6">
          {/* ── TIMER CONTROLS ── */}
          <div className="space-y-3">
            <p className="text-muted text-[10px] uppercase font-bold tracking-widest">Adjust Timer</p>
            <div className="flex gap-2">
              {[5, 10, 15, 30].map((s) => (
                <button key={s} onClick={() => onExtendTimer(s)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all bg-[#111111] border border-[rgba(255,255,255,0.05)] text-white hover:border-[#0066FF] hover:text-[#0066FF]">
                  +{s}s
                </button>
              ))}
            </div>
            <div className="flex gap-2 items-center mt-3">
              <input
                type="number"
                value={newTimerSecs}
                min={5}
                max={120}
                onChange={(e) => setNewTimerSecs(Number(e.target.value))}
                className="bg-[#050505] text-white border border-[rgba(255,255,255,0.1)] rounded-lg py-2 px-3 text-sm w-20 focus:outline-none focus:border-[#0066FF]"
              />
              <button
                onClick={() => onSetTimerDuration(newTimerSecs)}
                className="bg-[#111111] text-white py-2 px-4 rounded-lg flex-1 text-sm font-bold border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,102,255,0.1)] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
              >
                Set Base Timer
              </button>
            </div>
          </div>

          {/* ── ANALYTICS & LOCKS TAB ── */}
          <div className="space-y-3 mt-6 border-t border-[rgba(255,255,255,0.05)] pt-5">
            <p className="text-muted text-[10px] uppercase font-bold tracking-widest">Team Locks & Analytics</p>
            
            <div className="bg-[#050505] p-3 rounded-lg border border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between mb-3 border-b border-[rgba(255,255,255,0.05)] pb-2">
                <span className="text-sm font-bold text-white">Teams Locked:</span>
                <span className={`text-sm font-bold ${anyTeamLocked ? 'text-status-success' : 'text-status-warning'}`}>
                  {lockedCount}/10
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(state.teams).map(team => {
                  const isLocked = state.lockedTeams?.includes(team.code);
                  return (
                    <div key={team.code} className="flex justify-between items-center text-[10px] bg-[#111111] p-1.5 rounded">
                      <span className="text-white truncate max-w-[80px]" style={{ color: team.colorHex }}>{team.code}</span>
                      {isLocked ? (
                        <span className="text-status-success font-bold flex items-center gap-1">🔒 <span className="hidden sm:inline">Locked</span></span>
                      ) : (
                        <span className="text-muted">Unlocked</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <button
              onClick={onRunAnalytics}
              disabled={lockedCount < 2 || isAnalyticsRunning}
              className="w-full py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,102,255,0.2)]"
              style={{ background: "#0066FF", color: "white" }}
            >
              {isAnalyticsRunning ? "Running Analysis..." : "Run Analytics"}
            </button>
            {lockedCount < 2 && (
              <p className="text-xs text-center text-muted">
                Waiting for at least 2 teams to lock their Playing XII
              </p>
            )}

            {/* ── END AUCTION ── */}
            <div className="mt-6 border-t border-[rgba(255,255,255,0.05)] pt-5">
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to end the auction? This cannot be undone.")) {
                    onHostAction("end_auction");
                  }
                }}
                className="w-full py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }}
              >
                End Auction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
