import { supabase } from '../lib/supabase';

export class PlayerRepository {
  async getPlayerProfile(playerId: string) {
    const { data, error } = await supabase
      .from('player_profile')
      .select('*')
      .eq('player_id', playerId)
      .single();
    if (error) throw error;
    return data;
  }

  async getAuctionPlayer(name: string) {
    const { data, error } = await supabase
      .from('auction_players')
      .select('*')
      .eq('name', name)
      .single();
    if (error) throw error;
    return data;
  }

  async getAuctionPlayerById(id: string) {
    const { data, error } = await supabase
      .from('auction_players')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async getMappedPlayer(name: string) {
    const { data, error } = await supabase
      .from('auction_player_mapping')
      .select('*')
      .eq('auction_name', name)
      .single();
    if (error) throw error;
    return data;
  }

  async getPlayerByCricsheetName(cricsheetName: string) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('name', cricsheetName)
      .single();
    if (error) throw error;
    return data;
  }

  async searchPlayers(query: string) {
    const { data, error } = await supabase
      .from('auction_players')
      .select('*')
      .ilike('name', `%${query}%`);
    if (error) throw error;
    return data;
  }
}

export const playerRepository = new PlayerRepository();
