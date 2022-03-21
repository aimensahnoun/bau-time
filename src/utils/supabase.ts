//Supabase import
import { createClient } from "@supabase/supabase-js";

const options = {
  schema: "public",
  headers: { "x-my-custom-header": "bau-time" },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  options
);

export const listenToData = async (props) => {
  const { setEmployees } = props;

  supabase
    .from("workers")
    .on("*", async (payload) => {
      const { data, error } = await supabase.from("workers").select();
      if (error) return;
      if (!data) return;
      setEmployees(data);
    })
    .subscribe();
};

export default supabase;
