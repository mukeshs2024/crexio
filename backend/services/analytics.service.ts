import { analyticsRepository } from '../repositories/analytics.repository';
import { playerService } from './player.service';

export interface PlayerAnalytics {
  playerId: string;
  name: string;
  ratings: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  scoutingReport: string;
  finalScore: number;
  metadata: any;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isWicketKeeper?: boolean;
  isPlayingXI?: boolean;
  isImpact?: boolean;
}

export class AnalyticsService {
  async evaluatePlayer(auctionName: string): Promise<PlayerAnalytics | 'PLAYER_NOT_MAPPED'> {
    // 1. Load player rating from precomputed player_ratings table
    const ratingData = await analyticsRepository.getPlayerRating(auctionName);

    if (!ratingData) {
      return 'PLAYER_NOT_MAPPED';
    }

    // 2. Map to PlayerAnalytics structure
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (ratingData.career_batting_score > 75 || ratingData.recent_batting_score > 75) strengths.push('Elite Batsman');
    if (ratingData.career_bowling_score > 75 || ratingData.recent_bowling_score > 75) strengths.push('Elite Bowler');
    if (ratingData.powerplay_score > 70) strengths.push('Powerplay Specialist');
    if (ratingData.death_overs_score > 70) strengths.push('Death Overs Specialist');
    if (ratingData.consistency_score > 80) strengths.push('Highly Consistent');
    if (ratingData.experience_score > 80) strengths.push('Experienced Campaigner');

    if (ratingData.consistency_score < 40) weaknesses.push('Inconsistent Form');

    return {
      playerId: ratingData.player_id,
      name: ratingData.auction_name,
      ratings: {
        batting: ratingData.career_batting_score,
        bowling: ratingData.career_bowling_score,
        recent_batting: ratingData.recent_batting_score,
        recent_bowling: ratingData.recent_bowling_score,
        powerplay: ratingData.powerplay_score,
        middle_overs: ratingData.middle_overs_score,
        death_overs: ratingData.death_overs_score,
        experience: ratingData.experience_score,
        consistency: ratingData.consistency_score
      },
      strengths,
      weaknesses,
      scoutingReport: `Player ${auctionName} is graded as ${ratingData.overall_grade} with an overall score of ${ratingData.overall_score.toFixed(1)}.`,
      finalScore: ratingData.overall_score,
      metadata: ratingData // Pass the full rating payload for the evaluator
    };
  }

  async getPlayingXIAnalytics(players: {name: string, role?: string, isCaptain: boolean, isViceCaptain: boolean, isWicketKeeper: boolean, isPlayingXI: boolean, isImpact: boolean}[]): Promise<PlayerAnalytics[]> {
    const results: PlayerAnalytics[] = [];
    for (const p of players) {
      const result = await this.evaluatePlayer(p.name);
      if (result !== 'PLAYER_NOT_MAPPED') {
        result.isCaptain = p.isCaptain;
        result.isViceCaptain = p.isViceCaptain;
        result.isWicketKeeper = p.isWicketKeeper;
        result.isPlayingXI = p.isPlayingXI;
        result.isImpact = p.isImpact;
        
        // Normalize role
        if (!result.metadata) result.metadata = {};
        let role = p.role || result.metadata.role || result.metadata.Role || 'Unknown';
        if (role.toLowerCase().includes('keep')) role = 'Wicket-Keeper';
        else if (role.toLowerCase().includes('bat')) role = 'Batsman';
        else if (role.toLowerCase().includes('bowl')) role = 'Bowler';
        else if (role.toLowerCase().includes('all')) role = 'All-Rounder';
        result.metadata.role = role;
        
        results.push(result);
      }
    }
    return results;
  }
}

export const analyticsService = new AnalyticsService();
