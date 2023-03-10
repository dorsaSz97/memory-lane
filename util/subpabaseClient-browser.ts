import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

const supabase = createBrowserSupabaseClient<Database>();

export default supabase;
