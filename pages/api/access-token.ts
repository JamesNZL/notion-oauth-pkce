import type { NextApiRequest, NextApiResponse } from "next";

if (!process.env.PROXY_REDIRECT_URL) {
  throw new Error("PROXY_REDIRECT_URL env variable is not set");
}

if (!process.env.NOTION_TOKEN_URL) {
  throw new Error("NOTION_TOKEN_URL env variable is not set");
}

if (!process.env.AUTH_TOKEN) {
  throw new Error("AUTH_TOKEN env variable is not set");
}

export default async function accessToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const grant = body.grant_type;
  const code = body.code;
  const redirectUri = process.env.PROXY_REDIRECT_URL;

  const response = await fetch(`${process.env.NOTION_TOKEN_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: grant,
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();
  res.json(data);
}
