import type { NextPage, PageConfig } from "next";
import Container from "../components/Container";
import A from "../components/A";
import Link from "next/link";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

const Home: NextPage = () => {
  return (
    <Container className="px-6 py-20 leading-relaxed antialiased md:py-44">
      <main>
        <h1 className="text-3xl font-semibold">Hannes Bornö</h1>
        <p className="mt-6 text-neutral-400">
          Frontend developer from Sweden. Building stuff for the web, sometimes
          it ends up on my <A href="https://github.com/hanneslund">GitHub</A>.
          Into TypeScript, Next.js and Tailwind.
        </p>
        <p className="mt-6 text-neutral-400">
          Currently experimenting with{" "}
          <A href="https://emergentcss.vercel.app/">Rust</A>.
        </p>
        <div className="mt-11 flex gap-4 text-neutral-400">
          <Link href="/piano">
            <a aria-label="Check out my piano">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-colors duration-300 hover:text-neutral-200"
              >
                <rect x="6" y="1" width="4" height="13" fill="currentColor" />
                <rect x="13" y="1" width="4" height="13" fill="currentColor" />
                <path d="M8 14V23" stroke="currentColor" />
                <path d="M15 14V23" stroke="currentColor" />
                <path
                  d="M1 1V23H22V1H1Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </a>
          </Link>

          <a
            aria-label="Visit my GitHub page"
            href="https://github.com/hanneslund"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              shapeRendering="geometricPrecision"
              className="transition-colors duration-300 hover:text-neutral-200"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
          </a>

          <a aria-label="Send me an email" href="mailto:borno.hannes@gmail.com">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              shapeRendering="geometricPrecision"
              className="transition-colors duration-300 hover:text-neutral-200"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
          </a>
        </div>
      </main>
    </Container>
  );
};

export default Home;
