import { PlayerAnalytics } from './analytics.service';

export interface TeamAnalytics {
  components: {
    batting: number;
    bowling: number;
    allRound: number;
    form: number;
    ipl: number;
    t20: number;
    captaincy: number;
    balance: number;
  };
  overallRating: number;
  roleCoverage: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  isInvalid: boolean;
  errors: string[];
  squadSize?: number;
}

export function evaluateTeam(players: PlayerAnalytics[]): TeamAnalytics {
  const getTopNAverage = (arr: number[], n: number) => {
    const sorted = [...arr].sort((a, b) => b - a);
    const topN = sorted.slice(0, n);
    if (topN.length === 0) return 0;
    return topN.reduce((sum, val) => sum + val, 0) / topN.length;
  };

  const playingXI = players.filter(p => p.isPlayingXI !== false);

  const battingScores = playingXI.map(p => p.ratings.batting || 0);
  const bowlingScores = playingXI.map(p => p.ratings.bowling || 0);

  // Components mapping:
  const batting = (getTopNAverage(battingScores, 7) || 0) * 0.2; // Max 20
  const bowling = (getTopNAverage(bowlingScores, 5) || 0) * 0.2; // Max 20
  
  // All Round based on both
  const allRound = Math.min(15, (batting * 0.4 + bowling * 0.4) * 0.75); // Max 15
  
  // Recent form
  const recentFormScores = playingXI.map(p => Math.max(p.ratings.recent_batting || 0, p.ratings.recent_bowling || 0));
  const form = (getTopNAverage(recentFormScores, 11) || 0) * 0.15; // Max 15
  
  // IPL Experience
  const iplScores = playingXI.map(p => p.ratings.experience || 0);
  const ipl = (getTopNAverage(iplScores, 11) || 0) * 0.10; // Max 10
  
  // Consistency (T20)
  const consistencyScores = playingXI.map(p => p.ratings.consistency || 0);
  const t20 = (getTopNAverage(consistencyScores, 11) || 0) * 0.10; // Max 10
  
  // Captaincy
  const captain = playingXI.find(p => p.isCaptain);
  const captaincyScore = captain ? (captain.ratings.experience || 50) : 0;
  const captaincy = (captaincyScore / 100) * 5; // Max 5
  
  const wks = playingXI.filter(p => p.isWicketKeeper).length;
  const balance = (wks >= 1) ? 5 : 3; // Max 5

  const overallRating = batting + bowling + allRound + form + ipl + t20 + captaincy + balance;

  const roleCoverage: Record<string, number> = {
    Batsman: 0,
    Bowler: 0,
    'All-Rounder': 0,
    'Wicket-Keeper': 0
  };
  
  players.forEach(p => {
    const role = p.metadata?.role || 'Unknown';
    if (roleCoverage[role] !== undefined) {
      roleCoverage[role]++;
    }
  });

  const errors: string[] = [];
  if (playingXI.length !== 11) errors.push(`Playing XI has ${playingXI.length} players instead of 11.`);
  if (!playingXI.some(p => p.isWicketKeeper)) errors.push('No designated Wicket-Keeper in Playing XI.');
  if (roleCoverage['Bowler'] + roleCoverage['All-Rounder'] < 3) errors.push('Not enough frontline bowlers.');

  const strengths = [];
  const weaknesses = [];
  if (batting > 16) strengths.push('Elite Top Order Batting');
  if (bowling > 16) strengths.push('World Class Bowling Attack');
  if (allRound > 12) strengths.push('Excellent Depth and All-rounders');
  if (captaincy >= 4) strengths.push('Experienced Leadership');
  if (batting < 10) weaknesses.push('Fragile Batting Lineup');
  if (bowling < 10) weaknesses.push('Weak Bowling Attack');
  if (balance < 4) weaknesses.push('Poor Squad Balance');

  return {
    components: {
      batting: Number((batting || 0).toFixed(1)),
      bowling: Number((bowling || 0).toFixed(1)),
      allRound: Number((allRound || 0).toFixed(1)),
      form: Number((form || 0).toFixed(1)),
      ipl: Number((ipl || 0).toFixed(1)),
      t20: Number((t20 || 0).toFixed(1)),
      captaincy: Number((captaincy || 0).toFixed(1)),
      balance: Number((balance || 0).toFixed(1))
    },
    overallRating: Number((overallRating || 0).toFixed(1)),
    roleCoverage,
    strengths,
    weaknesses,
    isInvalid: errors.length > 0,
    errors,
    squadSize: players.length
  };
}
