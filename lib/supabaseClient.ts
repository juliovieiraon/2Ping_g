
import { createClient } from '@supabase/supabase-js';

// ATENÇÃO: Substitua estas strings pelas credenciais do seu projeto Supabase
// Você encontra elas em: Project Settings > API
const supabaseUrl = 'https://pamkolkhoayyichfecxt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbWtvbGtob2F5eWljaGZlY3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTE1NjksImV4cCI6MjA3OTA4NzU2OX0.9sOqk4389dVNE7K3LkSpV-IqoybUYNI2ymyPk_BZa2A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
