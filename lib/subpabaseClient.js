import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mxnwsaviwndgdcirtndd.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14bndzYXZpd25kZ2RjaXJ0bmRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzNDkwNjksImV4cCI6MTk5MDkyNTA2OX0.H5aisIsTeotBWBagbxU14dQ6qPjg05zclJ6Tx5gh8aM';
export const supabase = createClient(supabaseUrl, supabaseKey);
