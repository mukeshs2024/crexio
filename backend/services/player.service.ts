import { playerRepository } from '../repositories/player.repository';

export class PlayerService {
  async getPlayerProfile(playerId: string) {
    return await playerRepository.getPlayerProfile(playerId);
  }

  async getAuctionPlayer(name: string) {
    return await playerRepository.getAuctionPlayer(name);
  }

  async getAuctionPlayerById(id: string) {
    return await playerRepository.getAuctionPlayerById(id);
  }

  async getMappedPlayer(name: string) {
    try {
      const mapping = await playerRepository.getMappedPlayer(name);
      if (!mapping || !mapping.player_id) {
        return 'PLAYER_NOT_MAPPED';
      }
      return mapping;
    } catch (e) {
      // If single() throws due to no rows found, we return the specific string
      return 'PLAYER_NOT_MAPPED';
    }
  }

  async getPlayerByCricsheetName(cricsheetName: string) {
    return await playerRepository.getPlayerByCricsheetName(cricsheetName);
  }

  async searchPlayers(query: string) {
    return await playerRepository.searchPlayers(query);
  }
}

export const playerService = new PlayerService();
