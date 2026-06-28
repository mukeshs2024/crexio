import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase URL or Key is missing. Analytics requires Supabase configuration.");
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
