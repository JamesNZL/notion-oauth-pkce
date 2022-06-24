import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    redirect: {
      destination: 'https://github.com/JamesNZL',
      permanent: false,
    }
  };
}

export default Home;
