import type { NextApiRequest, NextApiResponse } from 'next';

export default async function accessToken(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!process.env.PROXY_REDIRECT_URL) {
    throw new Error('PROXY_REDIRECT_URL env variable is not set');
  }

  if (!process.env.NOTION_TOKEN_URL) {
    throw new Error('NOTION_TOKEN_URL env variable is not set');
  }

  if (!process.env.CLIENT_ID) {
    throw new Error('CLIENT_ID env variable is not set');
  }

  if (!process.env.CLIENT_SECRET) {
    throw new Error('CLIENT_SECRET env variable is not set');
  }

  const AUTHORISATION_CREDENTIAL = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');

  const { body } = req;
  const code = body.code;
  const redirectUri = process.env.PROXY_REDIRECT_URL;

  const response = await fetch(`${process.env.NOTION_TOKEN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${AUTHORISATION_CREDENTIAL}`,
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  res.json(await response.json());
}
