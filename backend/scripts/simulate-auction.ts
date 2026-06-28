import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3001";
const TOTAL_TEAMS = 10;
const PLAYERS_PER_TEAM = 12;

interface Player {
  id: string;
  name: string;
  role: "Batter" | "Bowler" | "All-Rounder" | "Wicketkeeper";
  basePrice: number;
  status: string;
  set: string;
}

interface TeamSquadSelection {
  playingXI: { playerId: string; battingOrder: number; captain: boolean; viceCaptain: boolean; wicketkeeper: boolean }[];
  impactPlayerId: string;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSimulation() {
  console.log("Starting IPL Mock Auction Simulation...");

  // 1. Create Host Socket and Room
  const createRes = await fetch(`${SERVER_URL}/api/create-room`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hostName: "SimulationHost", pursePerTeam: 12000, timerDurationSeconds: 15, isPublic: false })
  });
  const createData: any = await createRes.json();
  const roomCode = createData.roomCode;
  const hostToken = createData.hostToken;

  const hostSocket = io(SERVER_URL);
  
  let roomState: any = null;
  hostSocket.onAny((event, ...args) => {
    console.log(`[Socket] received ${event}`);
  });
  hostSocket.on("room_state", (state) => {
    roomState = state;
    console.log(`[Socket] roomState received, teams count: ${Object.keys(state.teams).length}`);
  });

  await new Promise<void>((resolve) => {
    const join = () => {
      hostSocket.emit("join_room", { roomCode, sessionId: "host_session", displayName: "SimulationHost" });
      resolve();
    };
    if (hostSocket.connected) {
      join();
    } else {
      hostSocket.on("connect", join);
    }
  });
  
  console.log(`Room created: ${roomCode}`);

  // 2. Connect 10 Franchise Sockets
  const teamSockets: { code: string; socket: Socket; squad: Player[] }[] = [];
  
  while (!roomState) {
    console.log("Waiting for roomState from hostSocket...");
    await sleep(500);
  }

  const teamCodes = Object.keys(roomState.teams);
  for (let i = 0; i < TOTAL_TEAMS; i++) {
    const code = teamCodes[i];
    const ts = io(SERVER_URL);
    await new Promise<void>((resolve) => {
      const joinTeam = () => {
        ts.emit("join_room", { roomCode, sessionId: `sim_session_${code}`, displayName: `Owner_${code}` });
        ts.emit("claim_team", { roomCode, teamCode: code, sessionId: `sim_session_${code}` });
      };
      if (ts.connected) {
        joinTeam();
      } else {
        ts.on("connect", joinTeam);
      }
      ts.on("team_confirmed", () => {
        resolve();
      });
    });
    
    teamSockets.push({ code, socket: ts, squad: [] });
  }

  console.log("All 10 franchises connected and claimed their teams.");
  await sleep(1000);

  // 3. Start Auction
  hostSocket.emit("host_action", { roomCode, action: "start_auction", hostToken: hostToken });
  console.log("Auction Started!");
  
  await sleep(1000); // Wait for first player

  // 4. Bidding Logic
  let playersBought = 0;
  const targetPlayers = TOTAL_TEAMS * PLAYERS_PER_TEAM;

  let lastPlayerId = "";
  while (true) {
    if (!roomState || roomState.status === "ended") {
      console.log("Auction ended by server.");
      break;
    }
    if (!roomState.currentPlayer || roomState.status !== "live") {
      await sleep(100);
      continue;
    }

    const player: Player = roomState.currentPlayer;
    
    // Prevent bidding on same player multiple times if loop is too fast
    if (player.id === lastPlayerId) {
      await sleep(50);
      continue;
    }
    lastPlayerId = player.id;
    
    // Find a team that needs a player
    let selectedTeam = teamSockets.find(t => t.squad.length < PLAYERS_PER_TEAM);
    
    // Attempt to satisfy role requirements roughly (WK first)
    const teamsNeedingWk = teamSockets.filter(t => t.squad.length < PLAYERS_PER_TEAM && !t.squad.some(p => p.role === "Wicketkeeper"));
    if (player.role === "Wicketkeeper" && teamsNeedingWk.length > 0) {
      selectedTeam = teamsNeedingWk[0];
    }
    
    if (!selectedTeam) {
      // Very unlikely unless algorithm breaks or unsold logic happens. 
      // If we skip, just wait for next player? We can't skip easily without host_action "unsold".
      console.log(`Skipping player ${player.name} (All teams full)`);
      break;
    }

    // Submit bid
    selectedTeam.socket.emit("bid", { roomCode, teamCode: selectedTeam.code, sessionId: `sim_session_${selectedTeam.code}`, amount: player.basePrice });
    
    // Wait slightly for bid to register
    await sleep(50);

    // Host forces sell immediately
    hostSocket.emit("host_action", { roomCode, action: "sell_player", hostToken: hostToken });
    
    selectedTeam.squad.push(player);
    playersBought++;
    console.log(`[${playersBought}/${targetPlayers}] Sold ${player.name} to ${selectedTeam.code} for ${player.basePrice}L`);

    // Wait until the current player changes in roomState
    while (roomState?.currentPlayer?.id === player.id && roomState?.status !== "ended") {
      await sleep(100);
    }
  }

  console.log("Auction completed. Building squads...");

  // 5. Build and submit squads
  for (const team of teamSockets) {
    const squad = team.squad;
    
    // Simple logic: first 11 are playing XI, 12th is impact
    const playingXIPlayers = squad.slice(0, 11);
    const impactPlayer = squad[11];
    
    // Find a WK for wicketkeeper role
    const wk = playingXIPlayers.find(p => p.role === "Wicketkeeper") || playingXIPlayers[0];
    
    // Assign random C and VC
    const captain = playingXIPlayers.find(p => p.id !== wk.id) || playingXIPlayers[1] || playingXIPlayers[0];
    const viceCaptain = playingXIPlayers.find(p => p.id !== wk.id && p.id !== captain.id) || playingXIPlayers[2] || playingXIPlayers[0];

    const playingXI = playingXIPlayers.map((p, index) => ({
      playerId: p.id,
      battingOrder: index + 1,
      captain: p.id === captain.id,
      viceCaptain: p.id === viceCaptain.id,
      wicketkeeper: p.id === wk.id
    }));

    team.socket.emit("submit_playing_xii", {
      roomCode,
      teamCode: team.code,
      sessionId: `sim_session_${team.code}`,
      playingXI,
      impactPlayerId: impactPlayer.id
    });
    
    console.log(`Submitted Playing XII for ${team.code}`);
  }

  await sleep(2000); // Wait for submissions to register

  // 6. Run Analytics
  console.log("Running Analytics...");
  try {
    const res = await fetch(`http://localhost:3001/api/analysis/${roomCode}/start`, { method: "POST" });
    const data = await res.json();
    console.log("Analytics Response:", data);
  } catch (err: any) {
    console.error("Analytics failed:", err.message);
  }

  console.log("Simulation complete!");
  process.exit(0);
}

runSimulation().catch(console.error);
