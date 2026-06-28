"use client";
import { Team, RoomState } from "@/types";

interface LockedTeamModalProps {
  teamCode: string;
  roomState: RoomState;
  onClose: () => void;
}

export default function LockedTeamModal({ teamCode, roomState, onClose }: LockedTeamModalProps) {
  const team = roomState.teams[teamCode];
  const selection = roomState.playingXIIs?.[teamCode] as any; // TeamSquadSelection

  if (!team || !selection || !selection.playingXI) return null;

  const getRoleBadge = (p: any) => {
    return (
      <>
        {p.captain && <span className="bg-[#F59E0B] text-black px-1.5 py-0.5 rounded text-[10px] font-bold">C</span>}
        {p.viceCaptain && <span className="bg-[#0066FF] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">VC</span>}
        {p.wicketkeeper && <span className="bg-[#22C55E] text-black px-1.5 py-0.5 rounded text-[10px] font-bold">WK</span>}
      </>
    );
  };

  const xi = [...selection.playingXI].sort((a, b) => a.battingOrder - b.battingOrder);
  const impactPlayerId = selection.impactPlayerId;
  const impactPlayerDetails = team.squad.find(p => p.id === impactPlayerId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-[#0A0A0A] border rounded-xl overflow-hidden shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col"
        style={{ borderColor: team.colorHex }}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-5 py-4 flex justify-between items-center" style={{ background: team.colorHex }}>
          <div>
            <h2 className="text-xl font-black text-white">{team.name}</h2>
            <div className="text-white/80 text-sm font-bold uppercase tracking-wider">Owner: {team.ownerName || "Unknown"}</div>
          </div>
          <button onClick={onClose} className="text-white hover:opacity-80 p-2">✕</button>
        </div>

        <div className="p-5 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#0066FF] mb-3">Playing XI</h3>
            <div className="space-y-2">
              {xi.map((player) => {
                const details = team.squad.find(p => p.id === player.playerId);
                return (
                  <div key={player.playerId} className="flex justify-between items-center bg-[#111111] border border-[rgba(255,255,255,0.05)] p-2.5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-muted text-[10px] w-4 text-right font-bold">{player.battingOrder}</span>
                      <span className="font-bold text-sm text-white">{details?.name || "Unknown"}</span>
                    </div>
                    <div className="flex gap-1">
                      {getRoleBadge(player)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {impactPlayerDetails && (
            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-[#22C55E] mb-3">Impact Player</h3>
              <div className="flex justify-between items-center bg-[#111111] border border-[rgba(34,197,94,0.3)] p-3 rounded-lg">
                <span className="font-bold text-sm text-[#22C55E]">{impactPlayerDetails.name}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
