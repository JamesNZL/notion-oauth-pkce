## Notion OAuth PKCE Proxy

This is a Notion OAuth PKCE proxy build with [Next.js](https://nextjs.org).

We have built this for [Hypersonic Raycast App](https://hypersonic.run), a Notion to-do app for Raycast.  Currently Notion API does not support PKCE entirely, so the only solution to use oAuth with your app is using a proxy like this.

The proxy server has been tested with our own app but it may need some tweaks to adapt it to your use case so use it as an starting point.

## Configuration

Create an .env.local file using the environment variables from the .env.template and fill the values with your own ones.

Here is an example using [Raycast](https://www.raycast.com) as the client:

```
CLIENT_ID=Notion OAuth Client ID
CLIENT_SECRET=Notion OAuth Client Secret
CLIENT_REDIRECT_URL=https://www.raycast.com/redirect?packageName=Extension
PROXY_REDIRECT_URL=https://your-proxy-domain/api/code
NOTION_AUTHORIZE_URL=https://api.notion.com/v1/oauth/authorize
NOTION_TOKEN_URL=https://api.notion.com/v1/oauth/token
```

## Run locally

To run the proxy locally start the project with the following commands:

```bash
npm run dev
# or
yarn dev
```

After that you may want to expose your localhost using [Ngrok](https://ngrok.com) or a similar service to test your integration.

## Deploy on Vercel

The easiest way to deploy the proxy is using [Vercel](https://vercel.com) from the creators of Next.js.

![github-banner](https://user-images.githubusercontent.com/42417619/167178913-14d05f08-7364-4440-8423-792ff5ab838d.png)

