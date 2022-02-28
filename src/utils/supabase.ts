//Supabase import
import { createClient } from "@supabase/supabase-js";


const options = {
    schema: "public",
    headers: { "x-my-custom-header": "Dystro" },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  };
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options
  );

  export default supabase;