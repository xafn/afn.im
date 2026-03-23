import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const supabaseUrl = (
	env.PUBLIC_SUPABASE_URL || String(import.meta.env.PUBLIC_SUPABASE_URL || '')
).trim();
const supabaseAnonKey = (
	env.PUBLIC_SUPABASE_ANON_KEY || String(import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '')
).trim();
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
	? createClient(supabaseUrl as string, supabaseAnonKey as string)
	: null;
