import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: './.env' });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function levenshtein(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, 
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function normalize(name: string): string {
    return name.toLowerCase().replace(/[^a-z]/g, '');
}

function getInitialsForm(name: string): string {
    const parts = name.split(' ').filter(p => p.trim() !== '');
    if (parts.length <= 1) return name;
    const initials = parts.slice(0, -1).map(p => p[0]).join('');
    return `${initials} ${parts[parts.length - 1]}`;
}

async function run() {
    console.log("Fetching data from Supabase...");
    
    // Fetch all auction players
    const { data: auctionData, error: auctionError } = await supabase.from('auction_players').select('*');
    if (auctionError) throw auctionError;
    
    // Fetch all players
    const { data: playersData, error: playersError } = await supabase.from('players').select('*');
    if (playersError) throw playersError;

    // We'll clear existing mappings
    await supabase.from('auction_player_mapping').delete().neq('auction_name', 'xxx_dummy'); 

    let mappedCount = 0;
    let failedCount = 0;
    let lowConfidenceCount = 0;
    const mappingsToInsert = [];
    const reportLines = [
        "# Auction Player Mapping Report",
        "",
        `**Total Auction Players:** ${auctionData.length}`,
        `**Total DB Players:** ${playersData.length}`,
        ""
    ];

    const lowConfidencePlayers = [];
    const failedPlayers = [];

    for (const ap of auctionData) {
        const name = ap.Player_Name.trim();
        let match = null;
        let confidence = 0;
        let matchedBy = '';

        // 1. Exact full-name match
        match = playersData.find(p => (p.player_full_name || '').toLowerCase() === name.toLowerCase() || (p.player_name || '').toLowerCase() === name.toLowerCase());
        if (match) {
            confidence = 100;
            matchedBy = 'Exact Match';
        }

        // 2. Token match (handles middle names like Aiden Kyle Markram vs Aiden Markram)
        if (!match) {
            const auctionTokens = name.toLowerCase().split(' ').filter((p: string) => p !== '');
            match = playersData.find(p => {
                if (!p.player_full_name) return false;
                const dbTokens = p.player_full_name.toLowerCase().split(' ').filter((p: string) => p !== '');
                // All auction tokens must be present in DB full name in order
                let i = 0, j = 0;
                while (i < auctionTokens.length && j < dbTokens.length) {
                    if (auctionTokens[i] === dbTokens[j] || dbTokens[j].startsWith(auctionTokens[i]) || auctionTokens[i].startsWith(dbTokens[j])) {
                        i++;
                    }
                    j++;
                }
                return i === auctionTokens.length;
            });
            if (match) {
                confidence = 98;
                matchedBy = 'Token Match (Middle Name omitted or Prefix match)';
            }
        }

        // 3. Initials match (e.g. Virat Kohli -> V Kohli)
        if (!match) {
            const initialsName = getInitialsForm(name).toLowerCase();
            match = playersData.find(p => (p.player_name || '').toLowerCase() === initialsName);
            if (!match) {
                // Check if auction name is "V Kohli" and DB is "Virat Kohli"
                match = playersData.find(p => getInitialsForm(p.player_full_name || '').toLowerCase() === name.toLowerCase());
            }
            if (!match) {
                // Check if initials matches initials
                match = playersData.find(p => {
                    const dbInitials = getInitialsForm(p.player_full_name || '').toLowerCase();
                    const dbInitials2 = (p.player_name || '').toLowerCase();
                    return dbInitials === initialsName || dbInitials2 === initialsName;
                });
            }
            if (match) {
                confidence = 95;
                matchedBy = 'Initials Match';
            }
        }

        // 4. Normalized names
        if (!match) {
            const normName = normalize(name);
            match = playersData.find(p => normalize(p.player_full_name || '') === normName || normalize(p.player_name || '') === normName);
            if (match) {
                confidence = 90;
                matchedBy = 'Normalized Match';
            }
        }

        // 5. Fuzzy match
        if (!match) {
            let bestScore = Infinity;
            let bestMatch = null;
            const normAuct = normalize(name);
            for (const p of playersData) {
                const normP = normalize(p.player_full_name || '');
                const normP2 = normalize(p.player_name || '');
                const dist1 = normP ? levenshtein(normAuct, normP) : Infinity;
                const dist2 = normP2 ? levenshtein(normAuct, normP2) : Infinity;
                const minDist = Math.min(dist1, dist2);
                if (minDist < bestScore) {
                    bestScore = minDist;
                    bestMatch = p;
                }
            }
            // If distance is less than 5 (allowing some typos or missing parts)
            if (bestScore <= 5 && bestMatch) {
                match = bestMatch;
                confidence = Math.max(0, 85 - bestScore * 5); // 80, 75, 70...
                matchedBy = `Fuzzy Match (Dist: ${bestScore})`;
            }
        }

        if (match) {
            mappedCount++;
            if (confidence < 90) lowConfidenceCount++;
            
            mappingsToInsert.push({
                auction_name: name,
                player_id: match.player_id,
                cricsheet_name: match.player_name,
                mapping_confidence: confidence,
                latest_team: null
            });

            if (confidence < 90) {
                lowConfidencePlayers.push(`- **${name}** -> ${match.player_name} (${match.player_full_name}) [${confidence}%] - *${matchedBy}*`);
            }
        } else {
            failedCount++;
            failedPlayers.push(`- **${name}**`);
        }
    }

    console.log(`Inserting ${mappingsToInsert.length} mappings...`);
    
    // Batch insert
    const chunkSize = 100;
    for (let i = 0; i < mappingsToInsert.length; i += chunkSize) {
        const chunk = mappingsToInsert.slice(i, i + chunkSize);
        const { error } = await supabase.from('auction_player_mapping').upsert(chunk, { onConflict: 'auction_name' });
        if (error) {
            console.error("Insert error:", error);
        }
    }

    reportLines.push("## Mapping Summary");
    reportLines.push(`- **Successfully Mapped:** ${mappedCount}`);
    reportLines.push(`- **Failed Mappings:** ${failedCount}`);
    reportLines.push(`- **Low Confidence (<90%):** ${lowConfidenceCount}`);
    reportLines.push("");

    if (failedPlayers.length > 0) {
        reportLines.push("## Failed Mappings");
        reportLines.push(...failedPlayers);
        reportLines.push("");
    }

    if (lowConfidencePlayers.length > 0) {
        reportLines.push("## Low Confidence Mappings / Requires Review");
        reportLines.push(...lowConfidencePlayers);
        reportLines.push("");
    }

    const reportContent = reportLines.join('\n');
    fs.writeFileSync('C:/Users/vprlk/.gemini/antigravity-ide/brain/9073ebcd-cc3c-48aa-82bd-58405ecd7c7b/mapping_report.md', reportContent);
    
    console.log("Mapping completed!");
    console.log(`Successfully mapped: ${mappedCount}`);
    console.log(`Failed: ${failedCount}`);
    console.log("Report generated at mapping_report.md");
}

run().catch(console.error);
