import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const dummyPlayers = [];
  for (let i = 1; i <= 45; i++) {
    dummyPlayers.push({
      name: `Dummy Player ${i}`,
      role: i % 4 === 0 ? "Wicketkeeper" : i % 3 === 0 ? "All-Rounder" : i % 2 === 0 ? "Batter" : "Bowler",
      base_price: 200,
      set_name: "Set Dummy",
      status: "upcoming"
    });
  }

  console.log(`Inserting ${dummyPlayers.length} dummy players...`);
  const { data, error } = await supabase.from("auction_players").insert(dummyPlayers);
  if (error) {
    console.error("Error inserting:", error);
  } else {
    console.log("Success!");
  }
}

run();
