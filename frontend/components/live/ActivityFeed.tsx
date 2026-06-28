"use client";
import { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityLogEntry } from "@/types";

interface ActivityFeedProps {
  entries: ActivityLogEntry[];
  onSendChat?: (msg: string) => void;
}

const TYPE_COLORS: Record<string, string> = {
  bid: "#0066FF",
  sold: "#22C55E",
  unsold: "#EF4444",
  team_claimed: "#0066FF",
  team_released: "#6B7280",
  team_reassigned: "#3B82F6",
  host_action: "#B8C0D4",
  joined: "#0066FF",
  left: "#6B7280",
  kicked: "#EF4444",
  auction_started: "#22C55E",
  auction_paused: "#F59E0B",
  auction_resumed: "#22C55E",
  set_started: "#3B82F6",
  set_ended: "#6B7280",
  chat: "#0066FF",
};

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function ActivityFeedComponent({ entries, onSendChat }: ActivityFeedProps) {
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [hasNewActivity, setHasNewActivity] = useState(false);
  const lastEntryId = useRef<string | null>(null);

  // The backend prepends new items (newest at index 0).
  // We want old at TOP, new at BOTTOM, so we reverse the array.
  const displayEntries = [...entries].reverse();

  const handleScroll = () => {
    if (!feedContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = feedContainerRef.current;
    
    // Consider it "at bottom" if within 40px
    const atBottom = scrollHeight - scrollTop - clientHeight < 40;
    setIsScrolledUp(!atBottom);
    if (atBottom) {
      setHasNewActivity(false);
    }
  };

  const scrollToBottom = () => {
    if (feedContainerRef.current) {
      feedContainerRef.current.scrollTop = feedContainerRef.current.scrollHeight;
    }
    setIsScrolledUp(false);
    setHasNewActivity(false);
  };

  useEffect(() => {
    if (displayEntries.length === 0) return;
    const newestEntry = displayEntries[displayEntries.length - 1];
    
    if (newestEntry.id !== lastEntryId.current) {
      lastEntryId.current = newestEntry.id;
      
      // Auto-scroll logic: only if user is already at the bottom
      if (!isScrolledUp) {
        // Use a small timeout to allow DOM to render the new item before scrolling
        setTimeout(() => {
          if (feedContainerRef.current) {
            feedContainerRef.current.scrollTop = feedContainerRef.current.scrollHeight;
          }
        }, 10);
      } else {
        setHasNewActivity(true);
      }
    }
  }, [displayEntries, isScrolledUp]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !onSendChat) return;
    onSendChat(chatMessage.trim());
    setChatMessage("");
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="bg-[#111111] py-2 px-4 shrink-0 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest">
          Live Feed
        </h3>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
        </span>
      </div>
      <div 
        ref={feedContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto custom-scroll p-4 space-y-4 relative"
      >
        {displayEntries.length === 0 && (
          <p className="text-muted text-xs text-center py-8">No activity yet</p>
        )}
        <AnimatePresence initial={false}>
          {displayEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 w-full"
            >
              {/* Timeline dot */}
              <div className="shrink-0 w-2 h-2 rounded-full mt-1.5" style={{ background: TYPE_COLORS[entry.type] || "#3B82F6", boxShadow: `0 0 10px ${TYPE_COLORS[entry.type] || "#3B82F6"}` }} />
              
              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-muted text-[10px] font-bold uppercase tracking-widest">
                    {formatTime(entry.timestamp)}
                  </span>
                </div>
                <div 
                  className="inline-block px-4 py-2 rounded-2xl rounded-tl-sm text-sm font-medium leading-relaxed"
                  style={{ background: entry.type === 'chat' ? "rgba(0,102,255,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${entry.type === 'chat' ? "rgba(0,102,255,0.3)" : "rgba(255,255,255,0.05)"}`, color: "#FFFFFF" }}
                >
                  {entry.message}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasNewActivity && isScrolledUp && (
        <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 z-10">
          <button 
            onClick={scrollToBottom} 
            className="bg-[#0066FF] text-[#FFFFFF] text-xs font-bold px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,102,255,0.4)] flex items-center gap-2 hover:bg-[#3B82F6] transition-colors"
          >
            New Activity ↓
          </button>
        </div>
      )}

      {/* Chat Input */}
      {onSendChat && (
        <form onSubmit={handleSend} className="shrink-0 flex gap-2 p-3 bg-[#111111] border-t border-[rgba(255,255,255,0.05)]">
          <input
            type="text"
            placeholder="Type a message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            className="flex-1 bg-[#050505] text-white border border-[rgba(255,255,255,0.1)] rounded-full py-2 px-4 text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
          />
          <button type="submit" disabled={!chatMessage.trim()} className="bg-[#0066FF] text-white rounded-full p-2 w-10 h-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3B82F6] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.4)]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      )}
    </div>
  );
}

export default memo(ActivityFeedComponent);
