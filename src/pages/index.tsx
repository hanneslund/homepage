import type { NextPage, PageConfig } from "next";
import Link from "next/link";
import A from "../components/A";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-[700px] px-8 pt-16 leading-relaxed antialiased md:pt-44">
      <main>
        <h1 className="text-2xl font-semibold text-neutral-50">Hannes Bornö</h1>
        <p className="mt-6">
          Software engineer from Sweden. Building stuff for the web, sometimes
          it ends up on my <A href="https://github.com/hanneslund">GitHub</A>.
          Into TypeScript, Next.js and Tailwind. Currently enjoying Rust.
        </p>
        <p className="mt-6">
          Feel free to shoot me an{" "}
          <A href="mailto:borno.hannes@gmail.com">email</A>.
        </p>
        <h2 className="mt-14 font-semibold text-neutral-200">
          Latest Projects
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 sm:gap-12">
          <div>
            <Link href="/piano">
              <a className="inline-block border-b border-transparent pb-px font-medium text-neutral-300 transition duration-300 hover:border-neutral-300 hover:text-neutral-200">
                <h3>Sampled Piano</h3>
              </a>
            </Link>
            <p className="mt-1 sm:mt-2">
              A sampled piano using Web Audio and Web MIDI.
            </p>
          </div>
          <div>
            <a
              href="https://emergentcss.vercel.app/"
              className="inline-block border-b border-transparent pb-px font-medium text-neutral-300 transition duration-300 hover:border-neutral-300 hover:text-neutral-200"
            >
              <h3>emergentcss</h3>
            </a>
            <p className="mt-1 sm:mt-2">
              A compiler that generates CSS. Inspired by Tailwind.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
