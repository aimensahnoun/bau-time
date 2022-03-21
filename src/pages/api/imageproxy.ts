// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = decodeURIComponent(req.query.url);
  const result = await fetch(url);
  const body = await result.body;
  body.pipe(res);
}