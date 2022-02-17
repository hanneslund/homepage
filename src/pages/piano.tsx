import type { NextPage } from "next";
import Piano from "../components/Piano";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="prefetch" as="fetch" href="/2C3.mp3" />
        <link rel="prefetch" as="fetch" href="/2C4.mp3" />
        <link rel="prefetch" as="fetch" href="/2C5.mp3" />
      </Head>
      <main className="flex min-h-screen items-center justify-center">
        <Piano />
      </main>
    </>
  );
};

export default Home;
