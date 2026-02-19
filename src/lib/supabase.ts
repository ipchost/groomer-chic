import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Если ключи потерялись, код об этом прокричит
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ SUPABASE_ERROR: Ключи не найдены в import.meta.env!");
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseKey || ''
);