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
  
  if (!players || players.length === 0) {
      console.log("No players found in auction_players");
      return;
  }
  
  // Use Player_Name or name, Role or role
  const getRole = (p: any) => p.Role || p.role;
  const getName = (p: any) => p.Player_Name || p.name;

  const wks = players.filter((p: any) => getRole(p) === 'Wicketkeeper');
  const bats = players.filter((p: any) => getRole(p) === 'Batter');
  const ars = players.filter((p: any) => getRole(p) === 'All-Rounder');
  const bowls = players.filter((p: any) => getRole(p) === 'Bowler');
  
  const teams = ['CSK', 'MI', 'RCB', 'KKR', 'RR', 'SRH', 'DC', 'GT', 'PBKS', 'LSG'];
  const squads: Record<string, string[]> = {};
  
  for (const t of teams) {
      squads[t] = [];
      const wk = wks.pop(); if (wk) squads[t].push(getName(wk));
      for (let i = 0; i < 4; i++) { const b = bats.pop(); if (b) squads[t].push(getName(b)); }
      for (let i = 0; i < 3; i++) { const a = ars.pop(); if (a) squads[t].push(getName(a)); }
      for (let i = 0; i < 4; i++) { const b = bowls.pop(); if (b) squads[t].push(getName(b)); }
  }
  
  const allTeamsAnalytics = [];
  const report: any = {};
  
  for (const teamCode of teams) {
      const names = squads[teamCode] || [];
      const payload = names.map((name: string, i: number) => ({
          name,
          isCaptain: i === 0,
          isViceCaptain: i === 1,
          isWicketKeeper: i === 2, // arbitrary designation for tests
          isPlayingXI: i < 11,
          isImpact: i === 11
      }));
      const playersAnalytics = await analyticsService.getPlayingXIAnalytics(payload);
      const teamScore = playersAnalytics.reduce((sum: number, p: any) => sum + p.finalScore, 0);
      
      allTeamsAnalytics.push({
          teamCode,
          players: playersAnalytics,
          teamScore
      });
      
      const teamStats = evaluateTeam(playersAnalytics);
      report[teamCode] = {
          squad: names,
          teamStats
      };
  }
  
  const simResult = simulationService.runSeasonSimulation(allTeamsAnalytics);
  
  console.log(JSON.stringify({ report, simResult }, null, 2));
}

run().catch(console.error);
