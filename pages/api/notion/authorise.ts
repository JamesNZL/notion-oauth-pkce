import type { NextApiRequest, NextApiResponse } from 'next';

export default function authorise(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.PROXY_REDIRECT_URL) {
    throw new Error('PROXY_REDIRECT_URL env variable is not set');
  }

  if (!process.env.NOTION_AUTHORISE_URL) {
    throw new Error('NOTION_AUTHORISE_URL env variable is not set');
  }

  if (!process.env.CLIENT_ID) {
    throw new Error('CLIENT_ID env variable is not set');
  }

  if (!process.env.REDIRECT_URIS) {
    throw new Error('REDIRECT_URIS env variable is not set');
  }

  const { query } = req;

  const ALLOWED_REDIRECT_URIS = process.env.REDIRECT_URIS.split(', ');

  const proxyRedirectUri = (typeof query.redirect_uri === 'string' && ALLOWED_REDIRECT_URIS.includes(query.redirect_uri.toString()))
    ? process.env.PROXY_REDIRECT_URL
    : 'null';

  const state = `${query.state}|${query.redirect_uri}`;

  const authorisationUrl = process.env.NOTION_AUTHORISE_URL + '?' +
    new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      redirect_uri: proxyRedirectUri,
      response_type: 'code',
      owner: 'user',
      state,
    });

  res.redirect(authorisationUrl);
}
