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
  console.log("SQL Query used: SELECT * FROM auction_players");
  const { data: players, error } = await supabase.from('auction_players').select('*');
  if (error) throw error;
  
  console.log(`Total players returned: ${players.length}`);
  
  const getRole = (p: any) => p.Role || p.role;
  const getName = (p: any) => p.Player_Name || p.name;

  const wks = players.filter((p: any) => getRole(p) === 'Wicket-Keeper' || getRole(p) === 'Wicketkeeper');
  const bats = players.filter((p: any) => getRole(p) === 'Batsman' || getRole(p) === 'Batter');
  const ars = players.filter((p: any) => getRole(p) === 'All-Rounder');
  const bowls = players.filter((p: any) => getRole(p) === 'Bowler');
  
  const teams = ['CSK', 'MI', 'RCB', 'KKR', 'RR', 'SRH', 'DC', 'GT', 'PBKS', 'LSG'];
  
  const report: any = {};
  const allTeamsAnalytics = [];
  
  console.log("Algorithm: Popping 1 WK, 5 Batsmen, 2 All-Rounders, 4 Bowlers for each team sequentially.");
  
  for (const t of teams) {
      const squad = [];
      
      const wk = wks.pop(); if (wk) squad.push(getName(wk));
      for (let i = 0; i < 5; i++) { const b = bats.pop(); if (b) squad.push(getName(b)); }
      for (let i = 0; i < 2; i++) { const a = ars.pop(); if (a) squad.push(getName(a)); }
      for (let i = 0; i < 4; i++) { const b = bowls.pop(); if (b) squad.push(getName(b)); }
      
      if (squad.length !== 12) {
          throw new Error(`Team ${t} has ${squad.length} players! Cannot evaluate incomplete squad.`);
      }

      console.log(`Team ${t}: Total Selected = ${squad.length}. WKs=1, Bats=5, ARs=2, Bowlers=4.`);
      console.log(`Players: ${squad.join(', ')}`);
      
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
          TeamBalance: "N/A (Not calculated)",
          TacticalStyle: "N/A (Not calculated)",
          Strengths: "N/A (Not calculated)",
          Weaknesses: "N/A (Not calculated)",
          SuggestedImprovements: "N/A (Not calculated)",
          PlayoffProbability: "N/A (Not calculated)",
          ChampionshipProbability: "N/A (Not calculated)"
      };
  }
  
  const simResult = simulationService.runSeasonSimulation(allTeamsAnalytics);
  
  for (const t of teams) {
    const standing = simResult.standings.find((s: any) => s.teamCode === t);
    const rank = standing ? simResult.standings.indexOf(standing) + 1 : "Unknown";
    report[t].PredictedFinish = rank;
  }

  const fs = require('fs');
  fs.writeFileSync('report3.json', JSON.stringify(report, null, 2), 'utf-8');
  console.log("Report generated at report3.json");
}

run().catch(console.error);
