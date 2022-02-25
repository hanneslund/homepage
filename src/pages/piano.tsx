import type { NextPage } from "next";
import Piano from "../components/Piano";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="prefetch" as="fetch" href="/C2.mp3" />
        <link rel="prefetch" as="fetch" href="/C3.mp3" />
        <link rel="prefetch" as="fetch" href="/C4.mp3" />
        <link rel="prefetch" as="fetch" href="/C5.mp3" />
        <link rel="prefetch" as="fetch" href="/C6.mp3" />
        <link rel="prefetch" as="fetch" href="/irHall.ogg" />
      </Head>
      <main className="flex min-h-screen items-center justify-center px-8">
        <Piano />
      </main>
    </>
  );
};

export default Home;
