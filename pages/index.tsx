import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: "center" }}>
        <h1>
          Notion PKCE proxy built with Next.js by{" "}
          <a href="https://reboot.studio">Reboot Studio</a>
        </h1>
      </main>
    </div>
  );
};

export default Home;
