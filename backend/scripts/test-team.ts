import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { analyticsService } from '../services/analytics.service';

async function run() {
    const team = [
        "Virat Kohli",
        "Phil Salt",
        "Rajat Patidar",
        "Liam Livingstone",
        "Jitesh Sharma",
        "Krunal Pandya",
        "Bhuvneshwar Kumar",
        "Josh Hazlewood",
        "Yash Dayal",
        "Suyash Sharma",
        "Rasikh Salam",
        "Tim David"
    ];
    
    console.log("Evaluating Team...");
    const payload = team.map((name, i) => ({
        name,
        isCaptain: i === 0,
        isViceCaptain: i === 1,
        isWicketKeeper: i === 2,
        isPlayingXI: i < 11,
        isImpact: i === 11
    }));
    const results = await analyticsService.getPlayingXIAnalytics(payload);
    
    const { evaluateTeam } = require('../services/team.evaluator');
    const teamStats = evaluateTeam(results);
    
    console.log("\n--- ACTUAL ---");
    console.log(JSON.stringify(teamStats, null, 2));
}

run().catch(console.error);

