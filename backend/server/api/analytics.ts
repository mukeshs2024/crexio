import { Express } from "express";
import { RoomActor } from "../room-actor";
import { analyticsService } from "../../services/analytics.service";
import { simulationService } from "../../services/simulation.service";
import { evaluateTeam } from "../../services/team.evaluator";

// In-memory cache for analysis results
const analysisCache = new Map<string, { status: "running" | "completed" | "error"; result?: any; error?: string }>();

export function setupAnalyticsRoutes(app: Express, rooms: Map<string, RoomActor>) {
  
  app.post("/api/analysis/:roomCode/start", async (req, res) => {
    const roomCode = req.params.roomCode.toUpperCase();
    const actor = rooms.get(roomCode);
    if (!actor) {
      res.status(404).json({ error: "Room not found" });
      return;
    }

    const totalTeams = Object.keys(actor.state.teams).length;
    if (actor.state.lockedTeams.length < 2) {
      res.status(400).json({ error: "Waiting for at least 2 teams to lock Playing XII." });
      return;
    }

    if (analysisCache.has(roomCode) && analysisCache.get(roomCode)!.status === "running") {
      res.json({ status: "running" });
      return;
    }

    actor.enqueue(async () => {
      actor.state = { ...actor.state, status: "analysing" };
      actor.emitToRoom("analytics_started", {});
      await actor.save();
    });

    analysisCache.set(roomCode, { status: "running" });
    
    // Run asynchronously
    setTimeout(async () => {
      try {
        const teamsList = Object.values(actor.state.teams);
        const allTeamsAnalytics: any[] = [];
        
        for (const team of teamsList) {
          const playingXII = actor.state.playingXIIs[team.code];
          if (!playingXII) continue;
          
          actor.emitToRoom("analytics_progress", { teamCode: team.code });
          
          const buildPlayers = [];
          for (const squadPlayer of team.squad) {
            if (squadPlayer?.name) {
              const inPlayingXI = playingXII.playingXI.find(p => p.playerId === squadPlayer.id);
              const isImpact = playingXII.impactPlayerId === squadPlayer.id;

              buildPlayers.push({
                name: squadPlayer.name,
                role: squadPlayer.role,
                isCaptain: inPlayingXI?.captain || false,
                isViceCaptain: inPlayingXI?.viceCaptain || false,
                isWicketKeeper: inPlayingXI?.wicketkeeper || false,
                isPlayingXI: !!inPlayingXI,
                isImpact: isImpact
              });
            }
          }
          
          const playersAnalytics = await analyticsService.getPlayingXIAnalytics(buildPlayers);
          
          const teamScore = playersAnalytics.reduce((sum, p) => sum + p.finalScore, 0);
          
          allTeamsAnalytics.push({
            teamCode: team.code,
            players: playersAnalytics,
            teamScore: teamScore
          });
        }
        
        const simulationResult = simulationService.runSeasonSimulation(allTeamsAnalytics);
        
        // Format result like legacy AnalyticsResult
        const result = {
          reportCards: {} as Record<string, any>,
          teamStrengths: {} as Record<string, any>,
          predictions: simulationResult.standings,
          probabilities: {},
          logs: simulationResult.logs
        };
        
        for (const ta of allTeamsAnalytics) {
          const teamStats = evaluateTeam(ta.players);
          
          const team = teamsList.find(t => t.code === ta.teamCode);
          result.reportCards[ta.teamCode] = { 
            ...teamStats, 
            players: ta.players,
            ownerName: team?.ownerName || "Auto",
            squadSize: team?.squad.length || 0
          };
          result.teamStrengths[ta.teamCode] = teamStats;
        }
        
        analysisCache.set(roomCode, { status: "completed", result });
        actor.emitToRoom("analytics_completed", {});
      } catch (err: any) {
        console.error("Analysis Error:", err);
        analysisCache.set(roomCode, { status: "error", error: err.message });
        actor.emitToRoom("analytics_completed", { error: err.message });
      }
    }, 100);

    res.json({ status: "started" });
  });

  app.get("/api/analysis/:roomCode/status", (req, res) => {
    const roomCode = req.params.roomCode.toUpperCase();
    const state = analysisCache.get(roomCode);
    if (!state) {
      res.json({ status: "not_started" });
      return;
    }
    res.json({ status: state.status, error: state.error });
  });

  app.get("/api/analysis/:roomCode/results", (req, res) => {
    const roomCode = req.params.roomCode.toUpperCase();
    const state = analysisCache.get(roomCode);
    if (!state || state.status !== "completed") {
      res.status(400).json({ error: "Results not available" });
      return;
    }
    res.json(state.result);
  });

  app.get("/api/analysis/:roomCode/team/:teamId", (req, res) => {
    const roomCode = req.params.roomCode.toUpperCase();
    const teamId = req.params.teamId.toUpperCase();
    const state = analysisCache.get(roomCode);
    if (!state || state.status !== "completed" || !state.result) {
      res.status(400).json({ error: "Results not available" });
      return;
    }
    const reportCard = state.result.reportCards[teamId];
    const strength = state.result.teamStrengths[teamId];
    if (!reportCard || !strength) {
      res.status(404).json({ error: "Team not found in results" });
      return;
    }
    res.json({ reportCard, strength });
  });

  app.get("/api/analysis/:roomCode/rankings", (req, res) => {
    const roomCode = req.params.roomCode.toUpperCase();
    const state = analysisCache.get(roomCode);
    if (!state || state.status !== "completed" || !state.result) {
      res.status(400).json({ error: "Results not available" });
      return;
    }
    res.json(state.result.predictions);
  });

  app.get("/api/analysis/:roomCode/probabilities", (req, res) => {
    const roomCode = req.params.roomCode.toUpperCase();
    const state = analysisCache.get(roomCode);
    if (!state || state.status !== "completed" || !state.result) {
      res.status(400).json({ error: "Results not available" });
      return;
    }
    res.json(state.result.probabilities);
  });
}
