import "tailwindcss/tailwind.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        a {
          color: rgb(163, 163, 163);
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
