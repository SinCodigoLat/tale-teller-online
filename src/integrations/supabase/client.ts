// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://grbqqexeelktrfvussnq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyYnFxZXhlZWxrdHJmdnVzc25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMDI1MjcsImV4cCI6MjA2MTg3ODUyN30.VMXZ-dnntNRIG0T8AISgKqAdJaoWnKRMuzo_WAKyjTk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);