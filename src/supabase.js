import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nzfawbfsxkuahixdetpf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56ZmF3YmZzeGt1YWhpeGRldHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzNjIzOTUsImV4cCI6MjA0NDkzODM5NX0.yD1Hbht1nKEcD93k3LY1ESg_SHjOOWPDM64urw0uW5c';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
