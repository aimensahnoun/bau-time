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
  const { setEmployees , setUnits , setTimesheets } = props;

  const wrokersResult = await supabase.from("workers").select();
  if (!wrokersResult.error) setEmployees(wrokersResult.data);

  const unitResult = await supabase.from("units").select();
  if (!unitResult.error) setUnits(unitResult.data);

  const timeSheetResult = await supabase.from("timesheets").select();
  if (!timeSheetResult.error) setTimesheets(timeSheetResult.data);
};

export const listenToData = async (props) => {
  const { setEmployees , setUnits , setTimesheets } = props;

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

  supabase
    .from("timesheets")
    .on("*", async (payload) => {
      const { data, error } = await supabase.from("timesheets").select();
      console.log(error);
      if (error) return;
      if (!data) return;

      setTimesheets(data);
    })
    .subscribe();
};

export default supabase;


export function getDaysInMonth(month: number, year: number): number[] {
  month--; // lets fix the month once, here and be done with it
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    // Exclude weekends
    var tmpDate = new Date(date);
    var weekDay = tmpDate.getDay(); // week day
    var day = tmpDate.getDate(); // day

    if (weekDay % 6) {
      // exclude 0=Sunday and 6=Saturday
      days.push(day);
    }

    date.setDate(date.getDate() + 1);
  }

  return days;
}