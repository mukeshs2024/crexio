import { supabase } from '../lib/supabase';

export class AnalyticsRepository {
  async getPlayerRating(auctionName: string) {
    const { data, error } = await supabase
      .from('player_ratings')
      .select('*')
      .eq('auction_name', auctionName)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw error;
    }
    return data;
  }
}

export const analyticsRepository = new AnalyticsRepository();
