import dotenv from "dotenv";

dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketServer, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { RoomActor, createInitialRoomState } from "./room-actor";
import {
  loadAllRoomSnapshots,
  saveRoomSummary,
} from "./db";
import {
  CreateRoomPayload,
  JoinRoomPayload,
  ClaimTeamPayload,
  BidPayload,
  HostActionPayload,
  HostExtendTimerPayload,
  HostKickPayload,
  HostReassignTeamPayload,
  HostEditPursePayload,
  HostSetTimerPayload,
  SubmitPlayingXIIPayload,
  UnlockPlayingXIIPayload,
} from "../types";
import { playerService } from "../services/player.service";
import { setupAnalyticsRoutes } from "./api/analytics";


const PORT = Number(process.env.PORT) || 3001;
const UPLOADS_DIR = path.join(process.cwd(), "data", "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ============================================================
// Express + Socket.io setup
// ============================================================
const app = express();
const httpServer = http.createServer(app);

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));

const io = new SocketServer(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// ============================================================
// Room registry: roomCode → RoomActor
// ============================================================
const rooms = new Map<string, RoomActor>();

function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// ============================================================
// Preload CSV Data
// ============================================================
import { Player } from "../types";
let cachedPlayers: Player[] = [];
let cachedSets: string[] = [];

async function preloadPlayersFromDB() {
  try {
    const { supabase } = require("../lib/supabase");
    // We assume 'auction_players' contains all players for the auction.
    const { data, error } = await supabase.from('auction_players').select('*');
    if (error) throw error;

    // Helper to parse base price correctly into Lakhs
    const parseBasePrice = (raw: any): number => {
      if (typeof raw === "number") return raw;
      if (!raw) return 20;
      const s = raw.toString().trim().toLowerCase();
      const crMatch = s.match(/^([\d.]+)\s*cr$/i);
      if (crMatch) return Math.round(parseFloat(crMatch[1]) * 100);
      const lMatch = s.match(/^([\d.]+)\s*l$/i);
      if (lMatch) return Math.round(parseFloat(lMatch[1]));
      const val = parseFloat(s);
      return isNaN(val) ? 20 : val;
    };
    
    // Map database columns to the Player interface
    cachedPlayers = (data || []).map((row: any) => ({
      id: row.auction_player_id || row.id,
      name: row.name || row.player_name || row.Player_Name,
      role: row.role || row.Role,
      country: row.country || row.Country || (row.overseas === 'Yes' || row.Overseas === 'Yes' ? 'International' : 'India'),
      isOverseas: row.is_overseas || row.overseas === 'Yes' || row.Overseas === 'Yes',
      isMarquee: row.is_marquee || (row.auction_set || row.Auction_Set || row.set || '').toLowerCase().includes('marquee'),
      basePrice: parseBasePrice(row.base_price || row.Base_Price),
      set: row.auction_set || row.Auction_Set || row.set,
      status: "upcoming"
    }));
    
    // (Removed temporary mock player injection)

    cachedSets = Array.from(new Set(cachedPlayers.map(p => p.set))).filter(Boolean);
    console.log(`[Server] Loaded from Supabase: ${cachedPlayers.length} players, ${cachedSets.length} sets`);
  } catch (err) {
    console.error("[Server] Failed to load players from Supabase:", err);
  }
}
preloadPlayersFromDB();

// ============================================================
// Restore rooms from DB on startup
// ============================================================
async function restoreRooms() {
  try {
    const snapshots = await loadAllRoomSnapshots();
    let restored = 0;
    for (const snap of snapshots) {
      if (!rooms.has(snap.roomCode)) {
        const actor = new RoomActor(io, snap.state, snap.hostToken);
        // If auction was live when server died, resume with fresh timer
        if (snap.state.status === "live") {
          actor.state = {
            ...actor.state,
            timerEndsAt: Date.now() + snap.state.timerDurationSeconds * 1000,
          };
          // Restart the timer loop via a resume action
          (actor as any).startTimer();
        }
        rooms.set(snap.roomCode, actor);
        restored++;
      }
    }
    if (restored > 0) {
      console.log(`[Server] Restored ${restored} room(s) from DB`);
    }
  } catch (err) {
    console.error("[Server] Failed to restore rooms:", err);
  }
}

// ============================================================
// REST: create room
// ============================================================
app.get("/", (_, res) => {
  res.json({
    status: "ok",
    service: "ipl-mock-auction"
  });
});

app.get("/health", (_, res) => {
  res.json({
    status: "healthy"
  });
});

app.post("/api/create-room", (req, res) => {
  const body = req.body as CreateRoomPayload;

  if (cachedPlayers.length === 0) {
    res.status(500).json({ error: "Server error: No valid players loaded" });
    return;
  }

  let roomCode = generateRoomCode();
  while (rooms.has(roomCode)) {
    roomCode = generateRoomCode();
  }

  const hostToken = body.hostToken || uuidv4();

  const initialState = createInitialRoomState(
    roomCode,
    body.hostSessionId,
    body.hostName,
    cachedPlayers.map(p => ({ ...p })),
    [...cachedSets],
    body.pursePerTeam,
    body.timerDurationSeconds,
    body.reunsoldPhaseEnabled,
    body.isPublic || false
  );

  const actor = new RoomActor(io, initialState, hostToken);
  rooms.set(roomCode, actor);

  console.log(`[Server] Room created: ${roomCode} (${cachedPlayers.length} players, ${cachedSets.length} sets)`);
  res.json({ roomCode, hostToken });

  // Save to DB in the background
  actor.enqueue(async () => {
    await (actor as any).save();
  });
});

// Analytics routes
setupAnalyticsRoutes(app, rooms);

// REST: get room state
app.get("/api/room/:roomCode", (req, res) => {
  const actor = rooms.get(req.params.roomCode.toUpperCase());
  if (!actor) { res.status(404).json({ error: "Room not found" }); return; }
  res.json(actor.state);
});

// REST: check room exists
app.get("/api/room/:roomCode/exists", (req, res) => {
  const exists = rooms.has(req.params.roomCode.toUpperCase());
  res.json({ exists });
});

// REST: get public rooms
app.get("/api/public-rooms", (req, res) => {
  const publicRooms: any[] = [];
  rooms.forEach((actor) => {
    const s = actor.state;
    if (s.isPublic && (s.status === "lobby" || s.status === "live")) {
      const playersJoined = Object.values(s.teams).filter(t => t.ownerSessionId).length;
      publicRooms.push({
        roomCode: s.roomCode,
        hostName: s.hostName,
        status: s.status,
        playersJoined,
      });
    }
  });
  // Sort by live first, then most players
  publicRooms.sort((a, b) => {
    if (a.status !== b.status) return a.status === "live" ? -1 : 1;
    return b.playersJoined - a.playersJoined;
  });
  res.json({ rooms: publicRooms });
});

// REST: submit feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { message, roomCode } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }
    const { supabase } = require("../lib/supabase");
    const { error } = await supabase.from('feedback').insert([{ message, room_code: roomCode }]);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error("[Server] Failed to save feedback:", err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// ============================================================
// Socket.io connection handler
// ============================================================
io.on("connection", (socket: Socket) => {
  console.log(`[Socket] Connected: ${socket.id}`);

  socket.on("join_room", ({ roomCode, displayName, sessionId }: JoinRoomPayload) => {
    const upper = roomCode.toUpperCase();
    const actor = rooms.get(upper);
    if (!actor) {
      socket.emit("room_not_found", { roomCode: upper });
      return;
    }
    socket.data.sessionId = sessionId;
    socket.data.roomCode = upper;
    socket.data.displayName = displayName;

    actor.handleConnect(socket, sessionId);

    const ownedTeam = Object.values(actor.state.teams).find(
      (t) => t.ownerSessionId === sessionId
    );
    if (!ownedTeam) {
      actor.enqueue(async () => {
        (actor as any).log("joined", `${displayName} joined the room`);
        (actor as any).broadcast();
      });
    }
  });

  socket.on("claim_team", ({ roomCode, teamCode, sessionId }: ClaimTeamPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) { socket.emit("room_not_found", { roomCode }); return; }
    actor.handleClaimTeam(socket, sessionId, socket.data.displayName || "Unknown", teamCode);
  });

  socket.on("release_team", ({ roomCode, teamCode, sessionId }: { roomCode: string; teamCode: string; sessionId: string }) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    actor.enqueue(async () => {
      const team = actor.state.teams[teamCode];
      if (!team || team.ownerSessionId !== sessionId) return;
      actor.state = {
        ...actor.state,
        teams: {
          ...actor.state.teams,
          [teamCode]: { ...team, ownerSessionId: null, ownerName: null, isConnected: false },
        },
      };
      (actor as any).log("team_released", `${team.ownerName} released ${team.name}`, teamCode);
      await (actor as any).save();
    });
  });

  socket.on("bid", ({ roomCode, teamCode, sessionId, amount }: BidPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) { socket.emit("room_not_found", { roomCode }); return; }
    actor.handleBid(socket, sessionId, teamCode, amount ?? 0);
  });

  socket.on("host_action", ({ roomCode, hostToken, action }: HostActionPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    switch (action) {
      case "start_auction":   actor.handleStartAuction(socket, hostToken); break;
      case "pause_auction":   actor.handlePauseAuction(socket, hostToken); break;
      case "resume_auction":  actor.handleResumeAuction(socket, hostToken); break;
      case "skip_player":     actor.handleSkipPlayer(socket, hostToken); break;
      case "sell_player":
        if (process.env.NODE_ENV === "production") {
          return;
        }
        actor.enqueue(async () => {
          if (actor.hostToken !== hostToken) return;
          actor.state = { ...actor.state, timerEndsAt: 1 };
        });
        break;
      case "end_auction":
        actor.enqueue(async () => {
          if (actor.hostToken !== hostToken) return;
          actor.state = { ...actor.state, status: "ended", timerEndsAt: null };
          (actor as any).stopTimer();
          (actor as any).log("host_action", "🏁 Auction ended by host");
          await (actor as any).save();
          try { await saveRoomSummary(actor.state.roomCode, actor.state); } catch {}
        });
        break;
    }
  });

  socket.on("extend_timer", ({ roomCode, hostToken, extraSeconds }: HostExtendTimerPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    actor.handleExtendTimer(socket, hostToken, extraSeconds);
  });

  socket.on("set_timer_duration", ({ roomCode, hostToken, timerDurationSeconds }: HostSetTimerPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    actor.handleSetTimerDuration(socket, hostToken, timerDurationSeconds);
  });

  socket.on("kick_user", ({ roomCode, hostToken, sessionId }: HostKickPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    actor.handleKickUser(socket, hostToken, sessionId);
  });

  socket.on("reassign_team", ({ roomCode, hostToken, teamCode, newSessionId, newOwnerName }: HostReassignTeamPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    actor.handleReassignTeam(socket, hostToken, teamCode, newSessionId, newOwnerName);
  });

  socket.on("edit_purse", ({ roomCode, hostToken, teamCode, newPurse }: HostEditPursePayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    actor.handleEditPurse(socket, hostToken, teamCode, newPurse);
  });

  socket.on("chat", ({ roomCode, sessionId, message }: import("../types").ChatPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    
    actor.enqueue(async () => {
      // Find team code to colorize if user owns a team
      const team = Object.values(actor.state.teams).find(t => t.ownerSessionId === sessionId);
      const teamCode = team?.code;
      const displayName = socket.data.displayName || "Unknown";
      
      // Use actor's private log method
      (actor as any).log("chat", `${displayName}: ${message}`, teamCode);
      await (actor as any).save();
    });
  });

  socket.on("submit_playing_xii", ({ roomCode, teamCode, sessionId, playingXI, impactPlayerId }: SubmitPlayingXIIPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    actor.handleSubmitPlayingXII(socket, sessionId, teamCode, playingXI, impactPlayerId);
  });

  socket.on("unlock_playing_xii", ({ roomCode, teamCode, sessionId }: UnlockPlayingXIIPayload) => {
    const actor = rooms.get(roomCode.toUpperCase());
    if (!actor) return;
    actor.handleUnlockPlayingXII(socket, sessionId, teamCode);
  });

  socket.on("disconnect", () => {
    const { sessionId, roomCode } = socket.data;
    if (roomCode && sessionId) {
      const actor = rooms.get(roomCode);
      if (actor) actor.handleDisconnect(sessionId);
    }
  });
});

// ============================================================
// Start server
// ============================================================
restoreRooms().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

process.on("SIGTERM", () => {
  rooms.forEach((actor) => actor.destroy());
  httpServer.close(() => process.exit(0));
});
