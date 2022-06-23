import type { NextApiRequest, NextApiResponse } from "next";

if (!process.env.CLIENT_REDIRECT_URL) {
  throw new Error("CLIENT_REDIRECT_URL env variable is not set");
}

export default function code(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  const url = `${process.env.CLIENT_REDIRECT_URL}&code=${query.code}&state=${query.state}`;

  res.redirect(url);
}
