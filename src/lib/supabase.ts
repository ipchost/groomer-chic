import { createClient } from '@supabase/supabase-js';

// Vercel сам подставит эти значения из настроек, которые ты сделал выше
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);