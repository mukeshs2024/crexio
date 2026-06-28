import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // MUST happen before importing services

import { analyticsService } from '../services/analytics.service';
import { playerService } from '../services/player.service';
import { analyticsRepository } from '../repositories/analytics.repository';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function tracePlayer(auctionName: string) {
    console.log(`\n===========================================`);
    console.log(`TRACING PLAYER: ${auctionName}`);
    console.log(`===========================================`);

    // 1. Check auction_players
    const { data: ap, error: apErr } = await supabase.from('auction_players').select('*').eq('Player_Name', auctionName).single();
    console.log(`1. auction_players:`, apErr ? `ERROR: ${apErr.message}` : ap);
    if (!ap) return;

    // 2. Check auction_player_mapping
    const mapping = await playerService.getMappedPlayer(auctionName);
    console.log(`2. auction_player_mapping:`, mapping);
    if (mapping === 'PLAYER_NOT_MAPPED') {
        console.log(`>>> STOPPING: Player not mapped.`);
        return;
    }
    const playerId = (mapping as any).player_id;

    // 3. Check players
    const { data: p, error: pErr } = await supabase.from('players').select('*').eq('player_id', playerId).single();
    console.log(`3. players:`, pErr ? `ERROR: ${pErr.message}` : p);
    if (!p) return;

    // 4. Check statistics tables via repository
    try {
        const rawData = await analyticsRepository.getPlayerAnalyticsData(playerId);
        console.log(`4. getPlayerAnalyticsData():`, JSON.stringify(rawData, null, 2));
    } catch (e: any) {
        console.log(`4. getPlayerAnalyticsData() ERROR:`, e.message || e);
    }

    // 5. Check analytics service response
    try {
        const result = await analyticsService.evaluatePlayer(auctionName);
        console.log(`5. analyticsService.evaluatePlayer():`);
        console.log(JSON.stringify(result, null, 2));
    } catch (e: any) {
        console.log(`5. analyticsService.evaluatePlayer() ERROR:`, e.message || e);
    }
}

async function run() {
    const players = [
        'Virat Kohli',
        'Jasprit Bumrah',
        'Hardik Pandya',
        'Rashid Khan'
    ];
    for (const p of players) {
        await tracePlayer(p);
    }
}

run().catch(console.error);
