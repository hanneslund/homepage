import "tailwindcss/tailwind.css";
import "../styles/chrome-bug.css";

import Head from "next/head";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
        }
      `}</style>
      <Head>
        <title>Hannes Bornö</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
