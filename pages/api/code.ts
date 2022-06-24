import type { NextApiRequest, NextApiResponse } from 'next';

export default function code(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.CLIENT_REDIRECT_URL) {
    throw new Error('CLIENT_REDIRECT_URL env variable is not set');
  }

  const { query } = req;

  const [state, redirectUri] = query.state?.toString().split('|') ?? [undefined, undefined];

  const redirectUrl = redirectUri + '?' +
    new URLSearchParams({
      code: query.code?.toString(),
      state,
    });

  res.redirect(redirectUrl);
}
