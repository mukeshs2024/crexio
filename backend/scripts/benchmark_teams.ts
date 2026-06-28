import dotenv from 'dotenv';
dotenv.config();
import { supabase } from '../lib/supabase';
import { evaluateTeam } from '../services/team.evaluator';
import { analyticsService } from '../services/analytics.service';

async function runBenchmark() {
  console.log('Running Analytics Benchmark...');
  
  const { data: allRatings, error } = await supabase.from('player_ratings').select('*');
  if (error) {
    console.error('Error fetching ratings:', error);
    return;
  }
  
  if (!allRatings || allRatings.length === 0) {
    console.log('No ratings found!');
    return;
  }
  
  allRatings.sort((a, b) => b.overall_score - a.overall_score);
  
  const elite = [];
  const average = [];
  
  for (const player of allRatings) {
    if (elite.length < 12) {
      elite.push(player);
    }
  }
  
  const validBottom = allRatings.filter(p => p.overall_score > 30).slice(-12);
  
  for (const player of validBottom) {
    average.push(player);
  }
  
  const buildPayload = (squadPlayers: any[]) => {
    return squadPlayers.map((p, index) => {
      const isXI = index < 11;
      return {
        name: p.cricsheet_name,
        role: p.role,
        isCaptain: isXI && index === 0,
        isViceCaptain: isXI && index === 1,
        isWicketKeeper: isXI && (index === 2 || p.role === 'Wicket-Keeper'),
        isPlayingXI: isXI,
        isImpact: !isXI
      };
    });
  };
  
  const teamA_analytics = await analyticsService.getPlayingXIAnalytics(buildPayload(elite));
  const teamB_analytics = await analyticsService.getPlayingXIAnalytics(buildPayload(average));

  console.log('\n--- Evaluating Team A (Elite) ---');
  const resultA = evaluateTeam(teamA_analytics);
  console.log(`Overall Rating: ${resultA.overallRating}`);
  console.log(`Batting: ${resultA.components.batting}`);
  console.log(`Bowling: ${resultA.components.bowling}`);
  console.log('Strengths:', resultA.strengths);
  console.log('Weaknesses:', resultA.weaknesses);
  
  console.log('\n--- Evaluating Team B (Average) ---');
  const resultB = evaluateTeam(teamB_analytics);
  console.log(`Overall Rating: ${resultB.overallRating}`);
  console.log(`Batting: ${resultB.components.batting}`);
  console.log(`Bowling: ${resultB.components.bowling}`);
  console.log('Strengths:', resultB.strengths);
  console.log('Weaknesses:', resultB.weaknesses);

  if (resultA.overallRating > resultB.overallRating) {
    console.log('\n✅ PASS: Team A outranks Team B');
  } else {
    console.log('\n❌ FAIL: Team B outranks Team A! Check your logic.');
  }
}

runBenchmark().catch(console.error);
