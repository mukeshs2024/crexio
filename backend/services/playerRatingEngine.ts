import { PlayerRating } from '../repositories/playerRatings.repository';

export class PlayerRatingEngine {
  private normalize(value: number, min: number, max: number): number {
    if (value <= min) return 0;
    if (value >= max) return 100;
    return ((value - min) / (max - min)) * 100;
  }

  private normalizeInverse(value: number, worst: number, best: number): number {
    if (value >= worst) return 0;
    if (value <= best) return 100;
    return ((worst - value) / (worst - best)) * 100;
  }

  calculateBattingScore(profile: any): number {
    const avg = profile.batting_average || 0;
    const sr = profile.batting_strike_rate || 0;
    if (avg === 0 && sr === 0) return 0;
    const score = (avg * 1.4) + (sr * 0.35);
    return this.normalize(score, 45, 120);
  }

  calculateRecentBattingScore(recentForm: any): number {
    if (!recentForm) return 0;
    const avg = recentForm.matches ? (recentForm.runs / (recentForm.matches * 0.8)) : 0; // estimate
    const sr = recentForm.strike_rate || 0;
    if (avg === 0 && sr === 0) return 0;
    const score = (avg * 1.4) + (sr * 0.35);
    return this.normalize(score, 45, 120);
  }

  calculateBowlingScore(profile: any): number {
    const econ = profile.economy || 10.5;
    const avg = profile.bowling_average || 40;
    const sr = profile.bowling_strike_rate || 28;
    if (profile.wickets === 0) return 0;
    
    const econScore = this.normalizeInverse(econ, 11.0, 7.5);
    const avgScore = this.normalizeInverse(avg, 45.0, 22.0);
    const srScore = this.normalizeInverse(sr, 35.0, 17.0);
    
    return (econScore * 0.45) + (avgScore * 0.35) + (srScore * 0.20);
  }

  calculateRecentBowlingScore(recentForm: any): number {
    // If recent form has bowling stats, we would use them.
    // For now, if missing, return 0 or default.
    if (!recentForm || recentForm.wickets === undefined) return 0;
    const econ = recentForm.economy || 10.5;
    const avg = recentForm.bowling_average || 40;
    const sr = recentForm.strike_rate || 28; // T20 bowling SR
    
    const econScore = this.normalizeInverse(econ, 11.0, 7.5);
    const avgScore = this.normalizeInverse(avg, 45.0, 22.0);
    const srScore = this.normalizeInverse(sr, 35.0, 17.0);
    
    return (econScore * 0.45) + (avgScore * 0.35) + (srScore * 0.20);
  }

  calculatePhaseScore(phaseStats: any): number {
    if (!phaseStats) return 0;
    // Basic phase scoring based on strike rate
    return this.normalize(phaseStats.strike_rate || 0, 100, 180);
  }

  calculateExperience(profile: any): number {
    const matches = (profile.batting_matches || 0) + (profile.bowling_matches || 0);
    return this.normalize(matches, 5, 100);
  }

  calculateConsistency(profile: any, recentForm: any): number {
    const careerAvg = profile.batting_average || (profile.wickets > 0 ? (40 - profile.bowling_average) : 0);
    const recentAvg = recentForm ? (recentForm.runs / (recentForm.matches || 1)) : 0;
    
    // Higher score if variation is low and average is high
    const variation = Math.abs(careerAvg - recentAvg);
    const consistencyScore = 100 - (variation * 2);
    return this.normalize(consistencyScore, 0, 100);
  }

  getGrade(score: number): string {
    if (score >= 90) return 'Elite';
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 50) return 'Average';
    return 'Developing';
  }

  getConfidence(matches: number): string {
    if (matches > 50) return 'High';
    if (matches > 20) return 'Medium';
    if (matches > 5) return 'Low';
    return 'Very Low';
  }

  generateRating(
    auctionPlayer: any, 
    mapping: any, 
    profile: any, 
    recentForm: any, 
    powerplay: any, 
    middleOvers: any, 
    deathOvers: any
  ): PlayerRating {
    
    // Fallback for unmapped players
    if (!profile) {
      let baseScore = 50;
      if (auctionPlayer.Role === 'Batter' || auctionPlayer.Role === 'All-Rounder') baseScore = 55;
      
      return {
        player_id: `unmapped_${auctionPlayer.Player_Name.replace(/\s+/g, '_')}`,
        auction_name: auctionPlayer.Player_Name,
        cricsheet_name: null,
        role: auctionPlayer.Role || 'Unknown',
        latest_team: null,
        career_batting_score: baseScore,
        career_bowling_score: baseScore,
        recent_batting_score: baseScore,
        recent_bowling_score: baseScore,
        powerplay_score: baseScore,
        middle_overs_score: baseScore,
        death_overs_score: baseScore,
        experience_score: 30,
        consistency_score: 50,
        overall_score: baseScore,
        rating_confidence: 'Low',
        matches_considered: 0,
        overall_grade: 'Developing',
      };
    }

    const role = auctionPlayer.Role || 'Unknown';
    const careerBatting = this.calculateBattingScore(profile);
    const recentBatting = this.calculateRecentBattingScore(recentForm);
    const careerBowling = this.calculateBowlingScore(profile);
    const recentBowling = this.calculateRecentBowlingScore(recentForm);
    
    const pp = this.calculatePhaseScore(powerplay);
    const mo = this.calculatePhaseScore(middleOvers);
    const death = this.calculatePhaseScore(deathOvers);
    
    const experience = this.calculateExperience(profile);
    const consistency = this.calculateConsistency(profile, recentForm);
    
    let overallScore = 0;
    
    // Weighting based on role
    if (role === 'Batsman' || role === 'Batter' || role === 'Wicket-Keeper' || role === 'Wicketkeeper') {
      let batWeight = 0.50;
      let recBatWeight = 0.35;
      if (recentBatting === 0) {
        batWeight += 0.35;
        recBatWeight = 0;
      }
      overallScore = (careerBatting * batWeight) + (recentBatting * recBatWeight) + (experience * 0.10) + (consistency * 0.05);
    } else if (role === 'Bowler') {
      let bowlWeight = 0.50;
      let recBowlWeight = 0.35;
      if (recentBowling === 0) {
        bowlWeight += 0.35;
        recBowlWeight = 0;
      }
      overallScore = (careerBowling * bowlWeight) + (recentBowling * recBowlWeight) + (experience * 0.10) + (consistency * 0.05);
    } else {
      // All-Rounder
      let batW = 0.20, recBatW = 0.20;
      let bowlW = 0.20, recBowlW = 0.20;
      if (recentBatting === 0) {
        batW += 0.20;
        recBatW = 0;
      }
      if (recentBowling === 0) {
        bowlW += 0.20;
        recBowlW = 0;
      }
      overallScore = (careerBatting * batW) + (recentBatting * recBatW) + 
                     (careerBowling * bowlW) + (recentBowling * recBowlW) + 
                     (experience * 0.10) + (consistency * 0.10);
      
      // All-rounder utility boost
      overallScore *= 1.15;
    }
    
    overallScore = Math.max(0, Math.min(100, overallScore));

    return {
      player_id: profile.player_id.toString(),
      auction_name: auctionPlayer.Player_Name,
      cricsheet_name: mapping?.cricsheet_name || null,
      role: role,
      latest_team: null, // Would require another join, left null for now
      career_batting_score: Math.round(careerBatting),
      career_bowling_score: Math.round(careerBowling),
      recent_batting_score: Math.round(recentBatting),
      recent_bowling_score: Math.round(recentBowling),
      powerplay_score: Math.round(pp),
      middle_overs_score: Math.round(mo),
      death_overs_score: Math.round(death),
      experience_score: Math.round(experience),
      consistency_score: Math.round(consistency),
      overall_score: Math.round(overallScore * 10) / 10,
      rating_confidence: this.getConfidence(profile.batting_matches || 0),
      matches_considered: profile.batting_matches || 0,
      overall_grade: this.getGrade(overallScore)
    };
  }
}

export const playerRatingEngine = new PlayerRatingEngine();
