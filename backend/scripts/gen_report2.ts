import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { analyticsService } from '../services/analytics.service';
import { simulationService } from '../services/simulation.service';
const { evaluateTeam } = require('../services/team.evaluator');

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function run() {
  const { data: players, error } = await supabase.from('auction_players').select('*');
  if (error) throw error;
  
  const getRole = (p: any) => p.Role || p.role;
  const getName = (p: any) => p.Player_Name || p.name;

  const wks = players.filter((p: any) => getRole(p) === 'Wicketkeeper');
  const bats = players.filter((p: any) => getRole(p) === 'Batter');
  const ars = players.filter((p: any) => getRole(p) === 'All-Rounder');
  const bowls = players.filter((p: any) => getRole(p) === 'Bowler');
  
  const teams = ['CSK', 'MI', 'RCB', 'KKR', 'RR', 'SRH', 'DC', 'GT', 'PBKS', 'LSG'];
  
  const report: any = {};
  const allTeamsAnalytics = [];
  
  for (const t of teams) {
      const squad = [];
      
      const wk = wks.pop(); if (wk) squad.push(getName(wk));
      for (let i = 0; i < 5; i++) { const b = bats.pop(); if (b) squad.push(getName(b)); }
      for (let i = 0; i < 2; i++) { const a = ars.pop(); if (a) squad.push(getName(a)); }
      for (let i = 0; i < 4; i++) { const b = bowls.pop(); if (b) squad.push(getName(b)); }
      
      const playingXI = squad.slice(0, 11);
      const impactPlayer = squad[11];
      const captain = squad[1]; // First batter
      const viceCaptain = squad[2]; // Second batter
      const wicketkeeper = squad[0]; // WK
      
      const playersAnalytics = await analyticsService.getPlayingXIAnalytics(playingXI);
      const teamScore = playersAnalytics.reduce((sum: number, p: any) => sum + p.finalScore, 0);
      
      allTeamsAnalytics.push({ teamCode: t, players: playersAnalytics, teamScore });
      
      const teamStats = evaluateTeam(playersAnalytics);
      
      report[t] = {
          CompleteSquad: squad,
          PlayingXI: playingXI,
          ImpactPlayer: impactPlayer,
          Captain: captain,
          ViceCaptain: viceCaptain,
          Wicketkeeper: wicketkeeper,
          ...teamStats,
          TeamBalance: "N/A (Not produced by backend)",
          TacticalStyle: "N/A (Not produced by backend)",
          Strengths: "N/A (Not produced by backend)",
          Weaknesses: "N/A (Not produced by backend)",
          SuggestedImprovements: "N/A (Not produced by backend)",
          PlayoffProbability: "N/A (Not produced by backend)",
          ChampionshipProbability: "N/A (Not produced by backend)"
      };
  }
  
  const simResult = simulationService.runSeasonSimulation(allTeamsAnalytics);
  
  for (const t of teams) {
    const standing = simResult.standings.find((s: any) => s.teamCode === t);
    const rank = standing ? simResult.standings.indexOf(standing) + 1 : "Unknown";
    report[t].PredictedFinish = rank;
  }

  const fs = require('fs');
  fs.writeFileSync('report2.json', JSON.stringify(report, null, 2), 'utf-8');
}

run().catch(console.error);
