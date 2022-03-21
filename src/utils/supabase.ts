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

export const fetchInitialData = async (props) => {
  const { setEmployees , setUnits } = props;

  const wrokersResult = await supabase.from("workers").select();
  if (!wrokersResult.error) setEmployees(wrokersResult.data);

  const unitResult = await supabase.from("units").select();
  if (!unitResult.error) setUnits(unitResult.data);
};

export const listenToData = async (props) => {
  const { setEmployees , setUnits } = props;

  supabase
    .from("workers")
    .on("*", async (payload) => {
      const { data, error } = await supabase.from("workers").select();
      console.log(error);
      if (error) return;
      if (!data) return;

      setEmployees(data);
    })
    .subscribe();

  supabase
    .from("units")
    .on("*", async (payload) => {
      const { data, error } = await supabase.from("units").select();
      console.log(error);
      if (error) return;
      if (!data) return;

      setUnits(data);
    })
    .subscribe();
};

export default supabase;
