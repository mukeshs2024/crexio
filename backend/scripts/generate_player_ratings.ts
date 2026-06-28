import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

import { playerRatingsRepository } from '../repositories/playerRatings.repository';
import { playerRatingEngine } from '../services/playerRatingEngine';

async function generateRatings() {
  console.log("Starting Player Rating Engine...\n");
  const startTime = Date.now();

  try {
    const auctionPlayers = await playerRatingsRepository.getAllAuctionPlayers();
    const mappings = await playerRatingsRepository.getAllMappings();
    
    console.log(`Fetched ${auctionPlayers.length} auction players.`);
    
    const ratings = [];
    let mappedCount = 0;
    let unmappedCount = 0;
    let failedCount = 0;
    
    const targetValidations = ["Virat Kohli", "Jasprit Bumrah", "Hardik Pandya", "Rashid Khan", "KL Rahul", "Shubman Gill"];

    for (const ap of auctionPlayers) {
      console.log(`Processing: ${ap.Player_Name}`);
      try {
        const mapping = mappings.find(m => m.auction_name === ap.Player_Name);
        
        let profile = null;
        let recentForm = null;
        let powerplay = null;
        let middleOvers = null;
        let deathOvers = null;
        
        if (mapping) {
          profile = await playerRatingsRepository.getPlayerProfile(mapping.player_id);
          if (profile) {
            mappedCount++;
            const cricsheetName = mapping.cricsheet_name;
            const res = await Promise.allSettled([
              playerRatingsRepository.getRecentForm(cricsheetName),
              playerRatingsRepository.getPowerplayStats(cricsheetName),
              playerRatingsRepository.getMiddleOversStats(cricsheetName),
              playerRatingsRepository.getDeathOversStats(cricsheetName)
            ]);
            recentForm = res[0].status === 'fulfilled' ? res[0].value : null;
            powerplay = res[1].status === 'fulfilled' ? res[1].value : null;
            middleOvers = res[2].status === 'fulfilled' ? res[2].value : null;
            deathOvers = res[3].status === 'fulfilled' ? res[3].value : null;
          } else {
            unmappedCount++;
          }
        } else {
          unmappedCount++;
        }
        
        const rating = playerRatingEngine.generateRating(ap, mapping, profile, recentForm, powerplay, middleOvers, deathOvers);
        ratings.push(rating);
        
        if (targetValidations.includes(ap.Player_Name)) {
          console.log(`\n--- Validation: ${ap.Player_Name} ---`);
          console.log(`Overall: ${rating.overall_score}`);
          console.log(`------------------------------\n`);
        }
        
      } catch (err) {
        console.error(`Failed to process ${ap.Player_Name}:`, err);
        failedCount++;
      }
      
      if (ratings.length > 0 && ratings.length % 50 === 0) {
        console.log(`Processed ${ratings.length} / ${auctionPlayers.length} players... Upserting batch...`);
        const batch = ratings.slice(-50);
        const uniqueBatch = Array.from(new Map(batch.map(r => [r.player_id, r])).values());
        await playerRatingsRepository.upsertPlayerRatings(uniqueBatch);
      }
      
      // Delay to prevent Supabase 429 rate limit retries from hanging
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    
    // Final batch
    if (ratings.length % 50 !== 0) {
      console.log(`Upserting final batch...`);
      const finalBatch = ratings.slice(-(ratings.length % 50));
      const uniqueFinal = Array.from(new Map(finalBatch.map(r => [r.player_id, r])).values());
      await playerRatingsRepository.upsertPlayerRatings(uniqueFinal);
    }
    
    const executionTime = (Date.now() - startTime) / 1000;
    
    console.log("\n====== LOGGING ======");
    console.log(`Total Auction Players: ${auctionPlayers.length}`);
    console.log(`Mapped Players: ${mappedCount}`);
    console.log(`Unmapped Players: ${unmappedCount}`);
    console.log(`Ratings Generated: ${ratings.length}`);
    console.log(`Execution Time: ${executionTime}s`);
    console.log(`Failed Players: ${failedCount}`);
    console.log("=====================\n");
    
    process.exit(0);
  } catch (error) {
    console.error("Critical error in generation:", error);
    process.exit(1);
  }
}

generateRatings();
