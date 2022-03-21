// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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
  process.env.SUPABASE_SERVICE_ROLE,
  options
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body;

  const { data: user, error } = await supabase.auth.api.createUser({
    email,
    password,
    data: { name },
  });

  if (error) {
    res.status(500).json({ error: error.message });
  }

  res.status(200).json({ user });
}
