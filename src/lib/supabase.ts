import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ruzzcgoyrpmlwagmuvcf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1enpjZ295cnBtbHdhZ211dmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1Nzk4NzksImV4cCI6MjA0NzE1NTg3OX0.H2j6GmAIicbLsRogaPZg9GTAAxagz6xrguQj489obws';

export const supabase = createClient(supabaseUrl, supabaseKey);