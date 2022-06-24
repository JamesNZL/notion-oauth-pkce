import type { NextApiRequest, NextApiResponse } from 'next';

if (!process.env.PROXY_REDIRECT_URL) {
  throw new Error('PROXY_REDIRECT_URL env variable is not set');
}

if (!process.env.NOTION_AUTHORIZE_URL) {
  throw new Error('NOTION_AUTHORIZE_URL env variable is not set');
}

export default function authorize(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  const state = query.state;
  const owner = query.owner;
  const clientId = query.client_id;
  const responseType = query.response_type;
  const selfRedirect = process.env.PROXY_REDIRECT_URL;

  const url = `${process.env.NOTION_AUTHORIZE_URL}?owner=${owner}&client_id=${clientId}&redirect_uri=${selfRedirect}&response_type=${responseType}&state=${state}`;

  res.redirect(url);
}
