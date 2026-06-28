import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY) as string
);

async function runValidation() {
  console.log('--- Player Rating Engine Validation ---\n');
  
  const { data: players, error } = await supabase
    .from('player_ratings')
    .select('*')
    .order('overall_score', { ascending: false });

  if (error) {
    console.error('Error fetching player ratings:', error);
    return;
  }

  console.log(`Total Players Evaluated: ${players.length}\n`);

  console.log('\n=== Top 50 Players (Overall) ===');
  players.slice(0, 50).forEach((p, i) => {
    let careerScore = 0;
    let recentScore = 0;
    if (p.role === 'Batsman' || p.role === 'Wicket-Keeper') {
      careerScore = p.career_batting_score;
      recentScore = p.recent_batting_score;
    } else if (p.role === 'Bowler') {
      careerScore = p.career_bowling_score;
      recentScore = p.recent_bowling_score;
    } else {
      careerScore = (p.career_batting_score + p.career_bowling_score) / 2;
      recentScore = (p.recent_batting_score + p.recent_bowling_score) / 2;
    }

    console.log(`${i+1}. ${p.auction_name}`);
    console.log(`   Role: ${p.role}`);
    console.log(`   Overall Score: ${p.overall_score}`);
    console.log(`   Grade: ${p.overall_grade}`);
    console.log(`   Confidence: ${p.rating_confidence}`);
    console.log(`   Career Score: ${careerScore}`);
    console.log(`   Recent Score: ${recentScore}\n`);
  });

  console.log('\n=== Anomaly Detection ===');
  let anomaliesFound = 0;
  players.forEach(p => {
    const isElite = p.overall_grade === 'Elite' || p.overall_score >= 90;
    const isUncapped = p.rating_confidence === 'Low' || p.rating_confidence === 'Very Low';
    const hasNaN = isNaN(p.overall_score) || isNaN(p.career_batting_score) || isNaN(p.career_bowling_score);
    const hasNegative = p.overall_score < 0;
    
    if (isElite && p.overall_score < 70) {
      console.log(`Anomaly: Elite grade but score < 70 -> ${p.auction_name} (${p.overall_score})`);
      anomaliesFound++;
    }
    if (isUncapped && p.overall_score > 90) {
      console.log(`Anomaly: Uncapped/Low Confidence player > 90 -> ${p.auction_name} (${p.overall_score})`);
      anomaliesFound++;
    }
    if (hasNaN) {
      console.log(`Anomaly: NaN detected -> ${p.auction_name} (Overall: ${p.overall_score})`);
      anomaliesFound++;
    }
    if (hasNegative) {
      console.log(`Anomaly: Negative score -> ${p.auction_name} (${p.overall_score})`);
      anomaliesFound++;
    }
    if (p.overall_score === null || p.overall_score === undefined) {
      console.log(`Anomaly: Missing data -> ${p.auction_name}`);
      anomaliesFound++;
    }
  });

  if (anomaliesFound === 0) console.log('No anomalies found.\n');
  else console.log(`\nTotal anomalies: ${anomaliesFound}\n`);
}

runValidation().catch(console.error);
