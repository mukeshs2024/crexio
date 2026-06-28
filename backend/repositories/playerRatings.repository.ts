import { supabase } from '../lib/supabase';

export interface PlayerRating {
  player_id: string;
  auction_name: string;
  cricsheet_name: string | null;
  role: string;
  latest_team: string | null;
  career_batting_score: number;
  career_bowling_score: number;
  recent_batting_score: number;
  recent_bowling_score: number;
  powerplay_score: number;
  middle_overs_score: number;
  death_overs_score: number;
  experience_score: number;
  consistency_score: number;
  overall_score: number;
  rating_confidence: string;
  matches_considered: number;
  overall_grade: string;
}

export class PlayerRatingsRepository {
  async getAllAuctionPlayers() {
    const { data, error } = await supabase.from('auction_players').select('*');
    if (error) throw error;
    return data || [];
  }

  async getAllMappings() {
    const { data, error } = await supabase.from('auction_player_mapping').select('*');
    if (error) throw error;
    return data || [];
  }

  async getPlayerProfile(playerId: string) {
    const { data, error } = await supabase.from('player_profile').select('*').eq('player_id', playerId).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getRecentForm(playerName: string) {
    const { data, error } = await supabase.from('recent_form').select('*').eq('player_name', playerName).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getPowerplayStats(playerName: string) {
    const { data, error } = await supabase.from('powerplay_stats').select('*').eq('player_name', playerName).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getMiddleOversStats(playerName: string) {
    const { data, error } = await supabase.from('middle_overs_stats').select('*').eq('player_name', playerName).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async getDeathOversStats(playerName: string) {
    const { data, error } = await supabase.from('death_overs_stats').select('*').eq('player_name', playerName).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async upsertPlayerRatings(ratings: PlayerRating[]) {
    // Upsert in batches of 50 to avoid payload size issues
    const batchSize = 50;
    for (let i = 0; i < ratings.length; i += batchSize) {
      const batch = ratings.slice(i, i + batchSize);
      const { error } = await supabase.from('player_ratings').upsert(batch, { onConflict: 'player_id' });
      if (error) throw error;
    }
  }
}

export const playerRatingsRepository = new PlayerRatingsRepository();
