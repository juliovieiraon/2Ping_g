
import { createClient } from '@supabase/supabase-js';

// Safe access to environment variables (handles environments where import.meta.env is undefined)
const getEnv = (key: string) => {
  try {
    // @ts-ignore
    return (import.meta as any).env?.[key];
  } catch {
    return undefined;
  }
};

// Prioritize Environment Variables (Set in Vercel)
// If not found, falls back to the hardcoded keys for local testing
const supabaseUrl = getEnv('VITE_SUPABASE_URL') || 'https://pamkolkhoayyichfecxt.supabase.co';
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbWtvbGtob2F5eWljaGZlY3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTE1NjksImV4cCI6MjA3OTA4NzU2OX0.9sOqk4389dVNE7K3LkSpV-IqoybUYNI2ymyPk_BZa2A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
